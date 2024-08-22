import { ChangeEvent, useMemo, useState } from 'react'
import { useDebounce } from 'use-debounce'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useBackend } from '@/components/hooks/useBackend'
import {
  ProfileListParamsType,
  ProfileListResponse,
  ProfileSort,
  ProfileListFragment,
  ProfileMappableResponse,
} from '@/utils/types/profile'
import { DIRECTORY_SORT_FIELDS } from './directory-sort'
import styled from 'styled-components'
import Icon from '@/components/core/Icon'
import { BaseLayout } from '@/components/core/BaseLayout'
import { Sort, SortOption } from '@/components/core/Sort'
import { FilterContainer } from '@/components/core/Filter'
import { List } from '@/components/core/List'
import { ListEmptyState } from '@/components/core/ListEmptyState'
import { InputText } from '@/components/core/InputText'
import { ProfileListItem } from '@/components/core/ProfileListItem'
import { TitleCard } from '@/components/core/TitleCard'
import { Map, onMoveParams } from '@/components/map/Map'

export const CensusView = () => {
  const [searchInput, setSearchInput] = useState<string>('')
  const [searchValue] = useDebounce(searchInput, 500)
  const [sortType, setSortType] = useState<ProfileSort>(
    ProfileSort.CreatedAtDesc
  )

  const { useGet, useGetPaginated } = useBackend()

  const { data: profilesForMapData } =
    useGet<ProfileMappableResponse>('PROFILE_MAPPABLE')
  const profilesForMap =
    !profilesForMapData || 'error' in profilesForMapData
      ? []
      : profilesForMapData['profiles'].map((p) => {
          return {
            label: p.name,
            lat: p.lat,
            lng: p.lng,
            linkUrl: `/profile/${p.externId}`,
          }
        })

  const [latLngBounds, setLatLngBounds] = useState<
    onMoveParams['bounds'] | undefined
  >(undefined)

  const input = useMemo<ProfileListParamsType>(() => {
    return {
      // Only search if there are at least 2 characters
      searchQuery: searchValue.length >= 2 ? searchValue : '',
      sort: sortType,
      latLngBounds: latLngBounds
        ? `${latLngBounds.north},${latLngBounds.south},${latLngBounds.east},${latLngBounds.west}`
        : undefined,
    }
  }, [searchValue, sortType, latLngBounds])

  const { data, next, rewind, noResults, hasMore } =
    useGetPaginated<ProfileListResponse>(
      'PROFILE_LIST',
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
        height="40rem"
        profiles={profilesForMap}
        onMove={(params) => {
          setLatLngBounds(
            params.zoom == params.minZoom ? undefined : params.bounds
          )
        }}
      />
      <FilterContainer>
        <SearchContainer>
          <InputText
            value={searchInput}
            placeholder="Search by name or eth address"
            onChange={handleSearchInputChange}
            endAdornment={<Icon name="search" size={1.4} />}
          />
        </SearchContainer>
      </FilterContainer>
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
