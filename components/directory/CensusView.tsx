import { ChangeEvent, useMemo, useState } from 'react'
import { useDebounce } from 'use-debounce'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { useProfile } from '../auth/useProfile'
import { useBackend } from '@/components/hooks/useBackend'
import {
  ProfileListParamsType,
  ProfileListResponse,
  ProfileSort,
  ProfileListFragment,
  RoleType,
  RoleLevel,
  CitizenshipStatus,
} from '@/utils/types/profile'
import { allCitizenshipStatuses } from '@/utils/citizenship'
import { allLevels } from '@/utils/levels'
import { allRoles } from '@/utils/roles'
import { DIRECTORY_SORT_FIELDS } from './directory-sort'
import styled from 'styled-components'
import { Button } from '@/components/core/Button'
import Icon from '@/components/core/Icon'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { Sort, SortOption } from '@/components/core/Sort'
import { Filter, FilterContainer, FilterGroup } from '@/components/core/Filter'
import { FilterCount } from '@/components/core/FilterCount'
import { List } from '@/components/core/List'
import { ListEmptyState } from '@/components/core/ListEmptyState'
import { InputText } from '@/components/core/InputText'
import { NoWrap } from '@/components/core/NoWrap'
import { ProfileListItem } from '@/components/core/ProfileListItem'
import { TitleCard } from '@/components/core/TitleCard'
import { ChevronButton } from '@/components/core/ChevronButton'

export const CensusView = () => {
  const [searchInput, setSearchInput] = useState<string>('')
  const [searchValue] = useDebounce(searchInput, 500)
  const [roleTypes, setRoleTypes] = useState<RoleType[]>([])
  const [levelTypes, setLevelTypes] = useState<RoleLevel[]>([])
  const [citizenshipStatuses, setCitizenshipStatuses] = useState<
    CitizenshipStatus[]
  >([])
  const [profileSortType, setProfileSortType] = useState<ProfileSort>(
    ProfileSort.CreatedAtDesc
  )

  const { deviceSize } = useDeviceSize()
  const { user } = useProfile({ redirectTo: '/' })
  const { useGetPaginated } = useBackend()

  const input = useMemo<ProfileListParamsType>(() => {
    // Only search if there are at least 2 characters
    const searchQuery = searchValue.length >= 2 ? searchValue : ''

    return {
      searchQuery,
      roleTypes,
      levelTypes,
      citizenshipStatuses,
      sort: profileSortType,
    }
  }, [searchValue, roleTypes, levelTypes, citizenshipStatuses, profileSortType])

  const { data, page, setPage, isEmpty, isLastPage } =
    useGetPaginated<ProfileListResponse>('PROFILE_LIST', input)

  const profiles = data
    ? data.reduce(
        (acc: ProfileListFragment[], val) =>
          'error' in val ? acc : [...acc, ...val.profiles],
        []
      )
    : []
  const totalProfiles =
    data && data[0] && 'totalCount' in data[0] ? data[0].totalCount : 0

  const roleOptions = allRoles.map((role) => ({
    label: role.name,
    value: role.roleType,
  }))

  const levelOptions = allLevels.map((level) => ({
    label: level.name,
    value: level.levelType,
  }))

  const citizenshipStatusOptions = allCitizenshipStatuses.map((status) => ({
    label: status.text,
    value: status.citizenshipStatus,
  }))

  const handleSearchInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
    await setPage(1)
  }

  const handleSelectedRoles = async (selectedRoles: RoleType[]) => {
    setRoleTypes(selectedRoles)
    await setPage(1)
  }

  const handleSelectedLevels = async (selectedLevels: RoleLevel[]) => {
    setLevelTypes(selectedLevels)
    await setPage(1)
  }

  const handleSelectedCitizenshipStatuses = async (
    selectedCitizenshipStatuses: CitizenshipStatus[]
  ) => {
    setCitizenshipStatuses(selectedCitizenshipStatuses)
    await setPage(1)
  }

  const handleClearFilters = async () => {
    setSearchInput('')
    setRoleTypes([])
    setLevelTypes([])
    setCitizenshipStatuses([])
    await setPage(1)
  }

  const handleSort = async (option: SortOption<ProfileSort>) => {
    setProfileSortType(option.key)
    await setPage(1)
  }

  const [open, setOpen] = useState(false)
  const displayFilters = deviceSize === 'desktop' || open
  const filterCount = useMemo(
    () =>
      roleTypes.length +
      levelTypes.length +
      citizenshipStatuses.length +
      (searchInput ? 1 : 0),
    [roleTypes, levelTypes, citizenshipStatuses, searchInput]
  )

  if (!user) return null

  return (
    <SingleColumnLayout>
      <TitleCard title="Census" icon="members"></TitleCard>
      <FilterContainer>
        <SearchContainer>
          <StyledInputText
            value={searchInput}
            placeholder="Search by name or eth address"
            onChange={handleSearchInputChange}
            endAdornment={<Icon name="search" size={1.4} />}
          />
          {deviceSize !== 'desktop' && (
            <Button
              variant="tertiary"
              isActive={filterCount > 0 || open}
              onClick={() => setOpen(!open)}
              endAdornment={
                <ChevronButton role="button" open={filterCount === 0 && open}>
                  {filterCount > 0 ? (
                    <FilterCount count={filterCount} />
                  ) : (
                    <Icon name="chevron-down" size={1.4} />
                  )}
                </ChevronButton>
              }
            >
              Filters
            </Button>
          )}
        </SearchContainer>
        {displayFilters && (
          <FilterGroup>
            <Filter
              label="Role"
              options={roleOptions}
              selections={roleTypes}
              onApply={handleSelectedRoles}
            />
            <Filter
              label="Level"
              options={levelOptions}
              selections={levelTypes}
              onApply={handleSelectedLevels}
            />
            <Filter
              label="Citizen"
              options={citizenshipStatusOptions}
              selections={citizenshipStatuses}
              onApply={handleSelectedCitizenshipStatuses}
            />
            <Button variant="link" onClick={handleClearFilters}>
              <NoWrap>Clear all</NoWrap>
            </Button>
          </FilterGroup>
        )}
      </FilterContainer>
      <List
        total={totalProfiles}
        sortComponent={
          <Sort
            fields={DIRECTORY_SORT_FIELDS}
            selectedOption={profileSortType}
            onSelectOption={handleSort}
          />
        }
      >
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
              <ProfileListItem key={profile.externId} profile={profile} />
            ))
          )}
        </InfiniteScroll>
      </List>
    </SingleColumnLayout>
  )
}

const StyledInputText = styled(InputText)`
  width: 100%;
`

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
