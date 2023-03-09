import {
  CitizenshipStatus,
  ProfileFragment,
  ProfileRoleLevelType,
  ProfileRoleType,
  ProfileSortType,
  useGetProfileByAddressLazyQuery,
  useGetProfilesQuery,
} from '@/generated/graphql'
import { resolveAddressOrName } from '@/lib/ens'
import { allCitizenshipStatuses } from '@/utils/citizenship'
import { allLevels } from '@/utils/levels'
import { allRoles } from '@/utils/roles'
import { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../core/Button'
import { Filter } from '../core/Filter'
import Icon from '../core/Icon'
import { InputText } from '../core/InputText'
import { NoWrap } from '../core/NoWrap'
import { ProfileList } from '../core/ProfileList'
import { ProfileListItem } from '../core/ProfileListItem'
import { Sort, SortField, SortOption } from '../core/Sort'
import { TitleCard } from '../core/TitleCard'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { DIRECTORY_SORT_FIELDS } from './directory-sort'

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

  const { data } = useGetProfilesQuery({
    variables: {
      input: {
        roleTypes,
        levelTypes,
        citizenshipStatuses,
        sort: profileSortType,
      },
    },
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
      setTotalProfiles(data.profilesCount)
    }
  }, [data, addressMatchProfile])

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

  return (
    <SingleColumnLayout>
      <TitleCard title="Census" icon="members"></TitleCard>
      <FilterContainer>
        <InputText
          value={searchInput}
          placeholder="Search by eth address"
          onChange={handleSearchInputChange}
          endAdornment={<Icon name="search" size={1.4} />}
        />
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
      </FilterContainer>
      <ProfileList
        total={totalProfiles}
        sortComponent={
          <Sort
            fields={DIRECTORY_SORT_FIELDS}
            selectedOption={profileSortType}
            onSelectOption={handleSort}
          />
        }
      >
        {profiles.map((profile) => (
          <ProfileListItem key={profile._id} profile={profile} />
        ))}
      </ProfileList>
    </SingleColumnLayout>
  )
}

const FilterContainer = styled.div`
  margin: 2.4rem;
  display: flex;
  gap: 0.8rem;
  width: 100%;
`
