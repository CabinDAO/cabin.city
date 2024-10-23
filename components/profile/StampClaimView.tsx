import React, { useState } from 'react'
import { useLocalStorage } from 'react-use'
import { subDays } from 'date-fns'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from '@/components/hooks/useRouter'
import { useUser } from '@/components/auth/useUser'
import { useError } from '@/components/hooks/useError'
import { useBackend } from '@/components/hooks/useBackend'
import { ProfileFragment, ProfileGetResponse } from '@/utils/types/profile'
import {
  CURRENT_CLAIMABLE_STAMP,
  StampClaimParamsType,
  StampClaimResponse,
} from '@/utils/types/stamp'
import { formatShortAddress } from '@/lib/address'
import analytics from '@/lib/googleAnalytics/analytics'
import styled from 'styled-components'
import { Body1, Body2, H1, H3 } from '@/components/core/Typography'
import { BaseLayout } from '@/components/core/BaseLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { ContentCard } from '@/components/core/ContentCard'
import { AuthenticatedLink } from '@/components/core/AuthenticatedLink'
import { Button } from '@/components/core/Button'
import { Avatar } from '@/components/profile/Avatar'
import LoadingSpinner from '@/components/core/LoadingSpinner'
import { ProfileContactList } from '@/components/profile/view-profile/ProfileContactList'
import { Stamp } from '@/components/core/Stamp'

export const STAMP_REMINDER_KEY = 'tnsConf2024StampReminder'

export const StampClaimView = () => {
  const router = useRouter()
  const { user, isUserLoading } = useUser()
  const { showError } = useError()

  const { useGet, post } = useBackend()
  const {
    data,
    isLoading,
    mutate: refetchProfile,
  } = useGet<ProfileGetResponse>(
    user ? ['api_profile_externId', { externId: user.externId }] : null
  )

  const [loading, setLoading] = useState(false)

  const [, setReminder, removeReminder] =
    useLocalStorage<boolean>(STAMP_REMINDER_KEY)

  const stampId = CURRENT_CLAIMABLE_STAMP?.id

  const handleGetStamp = async () => {
    if (!user || !stampId) return

    setLoading(true)

    analytics.stampClaimClickEvent(user.externId, stampId)

    const res = await post<StampClaimResponse>('api_stamp_claim', {
      id: stampId,
    } satisfies StampClaimParamsType)

    if (!res || 'error' in res) {
      showError(!res ? 'Failed to claim stamp' : res.error)
      setLoading(false)
      return
    }

    removeReminder()

    await refetchProfile()

    await router.push(['profile_id', { id: user.externId }])
  }

  const profile = !data || 'error' in data ? null : data.profile

  const profileComplete =
    profile &&
    profile.avatarCfId &&
    profile.bio &&
    profile.address?.lat &&
    profile.contactFields.length >= 1

  return (
    <>
      <Head>
        <title>Get Your Stamp</title>
      </Head>
      <BaseLayout hideNavAndFooter>
        <TitleCard
          title={`Get Your Stamp`}
          icon={'logo-cabin'}
          onIconClick={() => {
            router.push('home').then()
          }}
        />
        <StyledContentCard shape="notch" notchSize={1.6}>
          <Container>
            <H1>You saw our talk at the Network State Conference!</H1>

            {CURRENT_CLAIMABLE_STAMP && (
              <>
                <Stamp
                  id={CURRENT_CLAIMABLE_STAMP.id}
                  name={CURRENT_CLAIMABLE_STAMP.name}
                />
                <Body1>
                  We made you this stamp to commemorate the occasion.
                </Body1>
              </>
            )}

            {user && profile ? (
              <>
                {!stampId ? (
                  <Body1>You cannot claim this stamp anymore.</Body1>
                ) : user.createdAt > subDays(new Date(), 7).toISOString() ? (
                  // don't wanna prompt twice in case they were sent to make a
                  // profile from this page and just came back to get the stamp
                  <Button onClick={handleGetStamp}>
                    {loading ? <LoadingSpinner /> : 'Stamp me!'}
                  </Button>
                ) : (
                  <>
                    <Body1>
                      Before you get your stamp, check that your profile info is
                      complete and up-to-date.
                    </Body1>
                    <ProfileDataSection profile={profile} />
                    <Buttons>
                      <Link
                        href={`/profile/${profile.externId}/edit`}
                        onClick={() => setReminder(true)}
                      >
                        <Button>
                          {profileComplete
                            ? 'Edit profile'
                            : 'Add missing info'}
                        </Button>
                      </Link>
                      {profileComplete && (
                        <Button variant={'secondary'} onClick={handleGetStamp}>
                          {loading ? (
                            <LoadingSpinner />
                          ) : (
                            'Looks good, stamp me!'
                          )}
                        </Button>
                      )}
                    </Buttons>
                  </>
                )}
              </>
            ) : isLoading || isUserLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <Body1>Log in or sign up to add it to your account.</Body1>
                <AuthenticatedLink
                  href={router.asPath}
                  onClick={() => setReminder(true)}
                >
                  <Button variant={'secondary'}>Log in or sign up</Button>
                </AuthenticatedLink>
              </>
            )}
          </Container>
        </StyledContentCard>
      </BaseLayout>
    </>
  )
}

const ProfileDataSection = ({ profile }: { profile: ProfileFragment }) => {
  return (
    <AboutSection>
      <AboutItem>
        <H3>Photo</H3>
        {profile.avatarCfId ? (
          <Avatar size={7} srcCfId={profile.avatarCfId} />
        ) : (
          <Body2>none</Body2>
        )}
      </AboutItem>
      <AboutItem>
        <H3>Location</H3>
        {profile.address ? (
          <Body1>{formatShortAddress(profile.address)}</Body1>
        ) : (
          <Body2>none</Body2>
        )}
      </AboutItem>
      <AboutItem>
        <H3>Bio</H3>
        {profile.bio ? <Body1>{profile.bio}</Body1> : <Body2>none</Body2>}
      </AboutItem>
      {/*<H3>Interests</H3>*/}
      {/*{profile.tags.length ? (*/}
      {/*  <Tags tags={profile.tags}></Tags>*/}
      {/*) : (*/}
      {/*  <Body2>none</Body2>*/}
      {/*)}*/}
      <AboutItem>
        <H3>Contact</H3>
        {profile.contactFields.length ? (
          <ProfileContactList contactFields={profile.contactFields} />
        ) : (
          <Body2>none</Body2>
        )}
      </AboutItem>
    </AboutSection>
  )
}

const StyledContentCard = styled(ContentCard)`
  padding: 2.4rem;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2.4rem;
`

const AboutSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.lg} {
    max-width: 60%;
    padding-bottom: 0;
  }
`

const AboutItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  > * {
    width: 100%;
  }
  button {
    width: 100%;
  }

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    > * {
      width: min-content;
    }
    button {
      width: min-content;
    }
  }
`
