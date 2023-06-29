import {
  CitizenshipStatus,
  ProfileFragment,
  ProfileRoleLevelType,
  ProfileRoleType,
  ProfileSortType,
  useGetProfileByAddressLazyQuery,
  useGetProfilesCountQuery,
  useGetProfilesQuery,
} from '@/generated/graphql'
import { resolveAddressOrName } from '@/lib/ens'
import { allCitizenshipStatuses } from '@/utils/citizenship'
import { allLevels } from '@/utils/levels'
import { allRoles } from '@/utils/roles'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
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

export const DirectoryView = () => {
  const [searchInput, setSearchInput] = useState<string>('')
  const [roleTypes, setRoleTypes] = useState<ProfileRoleType[]>([])
  const [levelTypes, setLevelTypes] = useState<ProfileRoleLevelType[]>([])
  const [citizenshipStatuses, setCitizenshipStatuses] = useState<
    CitizenshipStatus[]
  >([])
  const [addressMatchProfile, setAddressMatchProfile] =
    useState<ProfileFragment | null>(null)
  const [profiles, setProfiles] = useState<ProfileFragment[]>([])
  const [totalProfiles, setTotalProfiles] = useState<number>(0)
  const [profileSortType, setProfileSortType] = useState<ProfileSortType>(
    ProfileSortType.CreatedAtDesc
  )
  const { deviceSize } = useDeviceSize()
  const { user } = useProfile({ redirectTo: '/' })

  const input = useMemo(() => {
    // Only search if there are at least 2 characters
    const searchQuery = searchInput.length >= 2 ? searchInput : ''

    return {
      roleTypes,
      levelTypes,
      citizenshipStatuses,
      sort: profileSortType,
      searchQuery,
    }
  }, [roleTypes, levelTypes, citizenshipStatuses, profileSortType, searchInput])

  const { data, fetchMore } = useGetProfilesQuery({
    variables: {
      input,
      size: 30,
    },
  })

  const { data: profilesCountData } = useGetProfilesCountQuery({
    variables: { input },
  })

  const [getProfileByAddress] = useGetProfileByAddressLazyQuery()

  useEffect(() => {
    ;(async () => {
      const resolvedAddress = await resolveAddressOrName(searchInput)
      if (resolvedAddress) {
        const result = await getProfileByAddress({
          variables: { address: resolvedAddress },
        })
        if (result.data?.accountByAddress?.profile) {
          setAddressMatchProfile(result.data.accountByAddress.profile)
        }
      } else {
        setAddressMatchProfile(null)
      }
    })()
  }, [searchInput, getProfileByAddress])

  useEffect(() => {
    if (addressMatchProfile) {
      // Special handling for address match
      setProfiles([addressMatchProfile])
      setTotalProfiles(1)
    } else if (data) {
      // Only set profiles if data is available (prevents flickering)
      setProfiles(
        data.getProfiles.data.filter((a): a is ProfileFragment => !!a) ?? []
      )
      setTotalProfiles(profilesCountData?.profilesCount ?? 0)
    }
  }, [data, addressMatchProfile, profilesCountData])

  const hasMore = !!data?.getProfiles?.after
  const dataLength = profiles.length

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
  }

  const handleSelectedRoles = (selectedRoles: ProfileRoleType[]) => {
    setRoleTypes(selectedRoles)
  }

  const handleSelectedLevels = (selectedLevels: ProfileRoleLevelType[]) => {
    setLevelTypes(selectedLevels)
  }

  const handleSelectedCitizenshipStatuses = (
    selectedCitizenshipStatuses: CitizenshipStatus[]
  ) => {
    setCitizenshipStatuses(selectedCitizenshipStatuses)
  }

  const handleClearFilters = () => {
    setSearchInput('')
    setRoleTypes([])
    setLevelTypes([])
    setCitizenshipStatuses([])
  }

  const handleSort = (option: SortOption<ProfileSortType>) => {
    setProfileSortType(option.key)
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
          hasMore={!!hasMore}
          dataLength={dataLength}
          style={{ overflowX: 'hidden' }}
          next={() => {
            return fetchMore({
              variables: {
                cursor: data?.getProfiles?.after,
              },
            })
          }}
          loader="..."
        >
          {profiles.length === 0 && data && profilesCountData ? (
            <ListEmptyState iconName="profile2" />
          ) : (
            profiles.map((profile) => (
              <ProfileListItem key={profile._id} profile={profile} />
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
