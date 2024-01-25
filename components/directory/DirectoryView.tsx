import { allCitizenshipStatuses } from '@/utils/citizenship'
import { allLevels } from '@/utils/levels'
import { allRoles } from '@/utils/roles'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useDebounce } from 'use-debounce'
import styled from 'styled-components'
import { Button } from '../core/Button'
import { Filter, FilterContainer, FilterGroup } from '../core/Filter'
import Icon from '../core/Icon'
import { InputText } from '../core/InputText'
import { NoWrap } from '../core/NoWrap'
import { ProfileListItem } from '../core/ProfileListItem'
import { Sort, SortOption } from '../core/Sort'
import { TitleCard } from '../core/TitleCard'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { DIRECTORY_SORT_FIELDS } from './directory-sort'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ChevronButton } from '../core/ChevronButton'
import { useDeviceSize } from '../hooks/useDeviceSize'
import { FilterCount } from '../core/FilterCount'
import { ListEmptyState } from '../core/ListEmptyState'
import { useProfile } from '../auth/useProfile'
import { List } from '../core/List'
import { useAPIGet } from '@/utils/api/interface'
import {
  ProfileListParams,
  ProfileListResponse,
  ProfileSort,
  ProfileListFragment,
  RoleType,
  RoleLevel,
  CitizenshipStatus,
  PAGE_SIZE,
} from '@/utils/types/profile'

export const DirectoryView = () => {
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

  const [profiles, setProfiles] = useState<ProfileListFragment[]>([])
  const [totalProfiles, setTotalProfiles] = useState(0)
  const [page, setPage] = useState(1)

  const { deviceSize } = useDeviceSize()
  const { user } = useProfile({ redirectTo: '/' })

  const input = useMemo<ProfileListParams>(() => {
    // Only search if there are at least 2 characters
    const searchQuery = searchValue.length >= 2 ? searchValue : ''

    return {
      searchQuery,
      roleTypes,
      levelTypes,
      citizenshipStatuses,
      sort: profileSortType,
      page,
    }
  }, [
    searchValue,
    roleTypes,
    levelTypes,
    citizenshipStatuses,
    profileSortType,
    page,
  ])

  const { data } = useAPIGet<ProfileListResponse>('PROFILE_LIST', input)

  useEffect(() => {
    if (data) {
      if (page === 1) {
        // Reset profiles if first page
        setProfiles(data.profiles)
      } else {
        // Append profiles if not first page
        setProfiles([...profiles, ...data.profiles])
      }
      setTotalProfiles(data.count)
    }
  }, [data])

  const hasMore = data ? data.count > PAGE_SIZE * (page + 1) : false

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
    setPage(1)
  }

  const handleSelectedRoles = (selectedRoles: RoleType[]) => {
    setRoleTypes(selectedRoles)
    setPage(1)
  }

  const handleSelectedLevels = (selectedLevels: RoleLevel[]) => {
    setLevelTypes(selectedLevels)
    setPage(1)
  }

  const handleSelectedCitizenshipStatuses = (
    selectedCitizenshipStatuses: CitizenshipStatus[]
  ) => {
    setCitizenshipStatuses(selectedCitizenshipStatuses)
    setPage(1)
  }

  const handleClearFilters = () => {
    setSearchInput('')
    setRoleTypes([])
    setLevelTypes([])
    setCitizenshipStatuses([])
    setPage(1)
  }

  const handleSort = (option: SortOption<ProfileSort>) => {
    setProfileSortType(option.key)
    setPage(1)
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
    <SingleColumnLayout withFooter>
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
          hasMore={hasMore}
          dataLength={profiles.length}
          style={{ overflowX: 'hidden' }}
          next={() => {
            setPage(page + 1)
          }}
          loader="..."
        >
          {profiles.length === 0 ? (
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
