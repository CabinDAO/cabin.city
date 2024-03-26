import React, { useState } from 'react'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Error from 'next/error'
import styled from 'styled-components'
import { ContentCard } from '@/components/core/ContentCard'
import { profileFromApiCookies } from '@/utils/api/withAuth'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { Body1, H2 } from '@/components/core/Typography'
import { LocationAutocompleteInput } from '@/components/core/LocationAutocompleteInput'
import { isValidAddress } from '@/components/profile/validations'
import { REQUIRED_FIELD_ERROR } from '@/utils/validate'
import {
  ProfileEditResponse,
  ProfileListFragment,
  ProfileListParamsType,
  ProfileListResponse,
} from '@/utils/types/profile'
import { ErrorModal } from '@/components/ErrorModal'
import { useBackend } from '@/components/hooks/useBackend'
import { useModal } from '@/components/hooks/useModal'
import { AddressFragmentType } from '@/utils/types/location'
import { formatShortAddress } from '@/lib/address'
import { Button } from '@/components/core/Button'
import { List } from '@/components/core/List'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ListEmptyState } from '@/components/core/ListEmptyState'
import LoadingSpinner from '@/components/core/LoadingSpinner'
import theme from '@/styles/theme'

export default function Page({
  isAdmin,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { useGetPaginated } = useBackend()
  const { data, page, setPage, isEmpty, isLastPage, mutate } =
    useGetPaginated<ProfileListResponse>('PROFILE_LIST', {
      withLocation: 'true',
    } as ProfileListParamsType)

  const profiles = data
    ? data.reduce(
        (acc: ProfileListFragment[], val) =>
          'error' in val ? acc : [...acc, ...val.profiles],
        []
      )
    : []

  const totalProfiles =
    data && data[0] && 'totalCount' in data[0] ? data[0].totalCount : 0

  if (!isAdmin) {
    return <Error statusCode={404} />
  }

  return (
    <SingleColumnLayout>
      <TitleCard title="Admin" icon="peace-sign" />
      <StyledContentCard>
        <Button
          onClick={() => {
            mutate().then()
          }}
        >
          Refresh
        </Button>
        <List total={totalProfiles}>
          <InfiniteScroll
            hasMore={!isLastPage}
            dataLength={profiles.length}
            style={{ overflowX: 'hidden' }}
            next={async () => {
              await setPage(page + 1)
            }}
            loader="..."
          >
            {isEmpty ? (
              <ListEmptyState iconName="profile2" />
            ) : (
              profiles.map((profile) => (
                <Row key={profile.externId} profile={profile} />
              ))
            )}
          </InfiniteScroll>
        </List>
      </StyledContentCard>
    </SingleColumnLayout>
  )
}

export const getServerSideProps = (async (context) => {
  const profile = await profileFromApiCookies(context.req.cookies)

  return { props: { isAdmin: profile ? profile.isAdmin : false } }
}) satisfies GetServerSideProps<{ isAdmin: boolean }>

const StyledContentCard = styled(ContentCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  width: 100%;
`

const Row = ({ profile }: { profile: ProfileListFragment }) => {
  const { post } = useBackend()
  const { showModal } = useModal()

  const [address, setAddress] = useState<AddressFragmentType>({
    lat: null,
    lng: null,
    formattedAddress: formatShortAddress(profile.address),
    locality: profile.address?.locality || null,
    admininstrativeAreaLevel1Short:
      profile.address?.admininstrativeAreaLevel1Short || null,
    country: profile.address?.country || null,
    streetNumber: null,
    route: null,
    routeShort: null,
    admininstrativeAreaLevel1: null,
    countryShort: null,
    postalCode: null,
  })

  const [submitting, setSubmitting] = useState(false)
  const [canShowAddressError, setCanShowAddressError] = useState(false)

  const onAddressChange = (a: AddressFragmentType) => {
    setCanShowAddressError(false)
    setAddress(a)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setCanShowAddressError(true)

    try {
      const resp = await post<ProfileEditResponse>(
        ['PROFILE', { externId: profile.externId }],
        { data: { address } }
      )

      if ('error' in resp) {
        showModal(() => (
          <ErrorModal
            title="Profile Edit Error"
            description={resp.error ?? 'Error editing profile'}
          />
        ))
        return
      } else {
        setSubmitting(false)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const [isFlashing, setIsFlashing] = useState(false)
  const flashBg = () => {
    setIsFlashing(true)
    setTimeout(() => setIsFlashing(false), 500) // Adjust timeout to match CSS transition
  }

  return (
    <div>
      <H2>{profile.name}</H2>
      <Body1>
        Current location:{' '}
        <span
          style={{
            background: isFlashing ? theme.colors.yellow400 : 'initial',
            cursor: 'pointer',
            transition: 'background 0.5s ease-in-out',
            padding: '0.5rem',
            wordBreak: 'break-all',
          }}
          onClick={() => {
            flashBg()
            navigator.clipboard.writeText(profile.location).then()
          }}
        >
          {profile.location}
        </span>
      </Body1>
      <Body1>Current address: {formatShortAddress(profile.address)}</Body1>
      <LocationAutocompleteInput
        disabled={submitting}
        initialValue={address.admininstrativeAreaLevel1Short ? address : null}
        onLocationChange={onAddressChange}
        error={canShowAddressError && !isValidAddress(address)}
        errorMessage={REQUIRED_FIELD_ERROR}
      />
      <Button disabled={submitting} onClick={handleSubmit} variant="primary">
        {submitting && (
          <>
            <LoadingSpinner />
            &nbsp; {/* this keeps the button height from collapsing */}
          </>
        )}
        Save
      </Button>
    </div>
  )
}
