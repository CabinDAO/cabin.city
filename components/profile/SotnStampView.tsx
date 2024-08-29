import Head from 'next/head'
import { useProfile } from '@/components/auth/useProfile'
import { useBackend } from '@/components/hooks/useBackend'
import {
  MeFragment,
  ProfileFragment,
  ProfileGetResponse,
  ProfileSetupStateParams,
} from '@/utils/types/profile'
import styled from 'styled-components'
import { BaseLayout } from '@/components/core/BaseLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { Body1, Body2, Caption, H1, H2, H3 } from '@/components/core/Typography'
import { ContentCard } from '@/components/core/ContentCard'
import { AuthenticatedLink } from '@/components/core/AuthenticatedLink'
import { Button } from '@/components/core/Button'
import { ProfileAboutSection } from '@/components/profile/view-profile/ProfileAboutSection'
import { monthYearFormat } from '@/utils/display-utils'
import { formatShortAddress } from '@/lib/address'
import { Tags } from '@/components/profile/Tags'
import { ProfileContactList } from '@/components/profile/view-profile/ProfileContactList'
import Icon, { IconName } from '@/components/core/Icon'
import React, { useState } from 'react'
import theme from '@/styles/theme'
import { Avatar } from '@/components/core/Avatar'
import Link from 'next/link'
import analytics from '@/lib/googleAnalytics/analytics'
import { useRouter } from 'next/router'
import LoadingSpinner from '@/components/core/LoadingSpinner'
import Image from 'next/image'

export const SotnStampView = () => {
  const router = useRouter()
  const { user } = useProfile()

  const { useGet, post } = useBackend()
  const { data: data } = useGet<ProfileGetResponse>(
    user ? ['PROFILE', { externId: user.externId }] : null
  )

  const [loading, setLoading] = useState(false)

  const handleGetStamp = async () => {
    if (!user) return
    setLoading(true)
    analytics.onboardingActionEvent(user.externId, 'stamp_claimed')
    await post('SOTN', {})
    await router.push('/profile')
  }

  const profile = !data || 'error' in data ? null : data.profile

  const profileComplete =
    profile &&
    profile.avatarUrl &&
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
          title={`Cabin's State of the Network`}
          icon={'logo-cabin'}
          onIconClick={() => {
            router.push('/').then()
          }}
        />
        <StyledContentCard shape="notch" notchSize={1.6}>
          <Container>
            <H1>Thanks for joining our State of the Network call</H1>
            <Image
              src={'/images/stamps/47.png'}
              alt={'SotN stamp'}
              width={200}
              height={200}
            />
            <Body1>
              We had an absolute blast with you and the rest of the community.
            </Body1>

            {user && profile ? (
              <>
                {user.gotSotn2024Badge ? (
                  <Body1>
                    You already got this stamp. It's on your profile.
                  </Body1>
                ) : user.createdAt > '2024-08-29' ? (
                  <>
                    <Button onClick={handleGetStamp}>
                      {loading ? <LoadingSpinner /> : 'Stamp me!'}
                    </Button>
                  </>
                ) : (
                  <>
                    <Body1>
                      Before you get your stamp, check that your profile info is
                      complete and up-to-date.
                    </Body1>
                    <ProfileDataSection profile={profile} />
                    <Buttons>
                      <Link href={`/profile/${profile.externId}/edit`}>
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
            ) : (
              <AuthenticatedLink href="/sotn">
                <Button variant={'secondary'}>
                  Log in or sign up to get your stamp
                </Button>
              </AuthenticatedLink>
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
        {profile.avatarUrl ? (
          <Avatar size={7} src={profile.avatarUrl} />
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
