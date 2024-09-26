import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useUser } from '@/components/auth/useUser'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useBackend } from '@/components/hooks/useBackend'
import {
  ProfileListParamsType,
  ProfileListResponse,
  ProfileSort,
  ProfileListFragment,
  ProfileMappableResponse,
} from '@/utils/types/profile'
import styled from 'styled-components'
import Icon from '@/components/core/Icon'
import { EmptyState } from '@/components/core/EmptyState'
import { AuthenticatedLink } from '@/components/core/AuthenticatedLink'
import { Button } from '@/components/core/Button'
import { BaseLayout } from '@/components/core/BaseLayout'
import { Sort, SortOption } from '@/components/core/Sort'
import { List } from '@/components/core/List'
import { ListEmptyState } from '@/components/core/ListEmptyState'
import { InputText } from '@/components/core/InputText'
import { ProfileListItem } from '@/components/core/ProfileListItem'
import { TitleCard } from '@/components/core/TitleCard'
import { Map, MarkerData, onMoveParams } from '@/components/map/Map'
import { useRouter } from '@/components/hooks/useRouter'
import L from 'leaflet'
import { cloudflareImageUrl } from '@/lib/image'

export const CensusView = () => {
  const { user } = useUser()
  return user ? (
    <CensusAuthView />
  ) : (
    <BaseLayout>
      <TitleCard title="Census" icon="members" />
      <div style={{ width: '100%' }}>
        <EmptyState
          icon="alert"
          title="Cabin members only"
          description="You must log in to see the census. But hey, it's free and easy to make an account!"
          customCta={() => (
            <AuthenticatedLink href={'/census'}>
              <Button variant={'secondary'}>Login or sign up</Button>
            </AuthenticatedLink>
          )}
        />
      </div>
    </BaseLayout>
  )
}

export const CensusAuthView = () => {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState<string>('')
  const [searchValue] = useDebounce(searchInput, 500)
  const [sortType, setSortType] = useState<ProfileSort>(
    ProfileSort.CreatedAtDesc
  )

  const [map, setMap] = useState<L.Map | null>(null)
  useEffect(() => {
    if (map && router.query.center) {
      const [lat, lng] = (router.query.center as string).split(',').map(Number)
      map.setView([lat, lng], 8)
      router.replace(router.pathname, undefined, { shallow: true }).then()
    }
  }, [map, router, router.query])

  const { get, useGetPaginated } = useBackend()

  // only load map profiles once
  const [profilesForMap, setProfilesForMap] = useState<MarkerData[]>([])
  useEffect(() => {
    get<ProfileMappableResponse>('api_profile_mappable').then((res) => {
      if (!res || 'error' in res) return
      setProfilesForMap(
        res['profiles'].map((p) => {
          return {
            label: p.name,
            lat: p.lat,
            lng: p.lng,
            imgUrl: cloudflareImageUrl(p.avatarCfId, 'mapAvatar'),
            linkUrl: `/profile/${p.externId}`,
          }
        })
      )
    })
  }, [])

  const [latLngBounds, setLatLngBounds] = useState<
    onMoveParams['bounds'] | undefined
  >(undefined)

  const input = {
    // Only search if there are at least 2 characters
    searchQuery: searchValue.length >= 2 ? searchValue : '',
    sort: sortType,
    latLngBounds: latLngBounds
      ? `${latLngBounds.north},${latLngBounds.south},${latLngBounds.east},${latLngBounds.west}`
      : undefined,
  }

  const { data, next, rewind, noResults, hasMore } =
    useGetPaginated<ProfileListResponse>(
      'api_profile_list',
      input satisfies ProfileListParamsType
    )

  const profiles = data
    ? data.reduce(
        (acc: ProfileListFragment[], val) =>
          'error' in val ? acc : [...acc, ...val.profiles],
        []
      )
    : []
  const totalProfiles =
    data && data[0] && 'totalCount' in data[0] ? data[0].totalCount : 0

  const handleSearchInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
    await rewind()
  }

  const handleSortChange = async (option: SortOption<ProfileSort>) => {
    setSortType(option.key)
    await rewind()
  }

  return (
    <BaseLayout>
      <TitleCard title="Census" icon="members"></TitleCard>
      <Map
        height={`50vh`}
        mapRef={setMap}
        profiles={profilesForMap}
        onMove={(params) => {
          setLatLngBounds(
            params.zoom == params.minZoom ? undefined : params.bounds
          )
        }}
      />
      <SearchContainer>
        <InputText
          value={searchInput}
          placeholder="Search by name or eth address"
          onChange={handleSearchInputChange}
          endAdornment={<Icon name="search" size={1.4} />}
        />
      </SearchContainer>
      <List
        total={totalProfiles}
        sortComponent={
          <Sort
            fields={DIRECTORY_SORT_FIELDS}
            selectedOption={sortType}
            onSelectOption={handleSortChange}
          />
        }
      >
        <InfiniteScroll
          hasMore={hasMore}
          dataLength={profiles.length}
          style={{ overflowX: 'hidden' }}
          next={next}
          loader="..."
        >
          {noResults ? (
            <ListEmptyState iconName="profile2" />
          ) : (
            profiles.map((profile) => (
              <ProfileListItem key={profile.externId} profile={profile} />
            ))
          )}
        </InfiniteScroll>
      </List>
    </BaseLayout>
  )
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  justify-content: flex-start;
  width: 100%;

  button {
    width: 100%;
  }

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;

    button {
      width: auto;
    }
  }
`

const DIRECTORY_SORT_FIELDS = [
  {
    key: 'join_date',
    label: 'Join date',
    options: [
      {
        key: ProfileSort.CreatedAtDesc,
        label: 'Newest',
      },
      {
        key: ProfileSort.CreatedAtAsc,
        label: 'Oldest',
      },
    ],
  },
  {
    key: 'cabin_balance',
    label: '₡ABIN holdings',
    options: [
      {
        key: ProfileSort.CabinBalanceAsc,
        label: 'Least First',
      },
      {
        key: ProfileSort.CabinBalanceDesc,
        label: 'Most First',
      },
    ],
  },
  {
    key: 'stamp_amount',
    label: 'Stamp Amount',
    options: [
      {
        key: ProfileSort.StampCountAsc,
        label: 'Least First',
      },
      {
        key: ProfileSort.StampCountDesc,
        label: 'Most First',
      },
    ],
  },
]
