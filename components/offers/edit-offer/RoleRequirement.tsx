import { Dropdown } from '@/components/core/Dropdown'
import IconButton from '@/components/core/IconButton'
import { MultipleDropdown } from '@/components/core/MultipleDropdown'
import { Subline1 } from '@/components/core/Typography'
import { SelectOption } from '@/components/hooks/useDropdownLogic'
import { ProfileRoleLevelType, ProfileRoleType } from '@/generated/graphql'
import { allLevels, levelInfoFromType } from '@/utils/levels'
import { RoleInfo, roleInfoFromType } from '@/utils/roles'
import { useState } from 'react'
import styled from 'styled-components'
import { RoleConstraintInput } from './EligibilityRequirements'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { HorizontalDivider } from '@/components/core/Divider'

const levelOptions = allLevels.map((level) => ({
  label: level.name,
  value: level.levelType,
}))

const options = [
  {
    label: 'Any',
    value: 'Any',
  },
  ...levelOptions,
]

interface RoleRequirementProps {
  index?: number
  availableRoles?: RoleInfo[]
  role?: ProfileRoleType | undefined
  levels?: ProfileRoleLevelType[]
  onChange?: (roleConstraintInput: RoleConstraintInput, index: number) => void
  onDelete?: (index: number) => void
}

export const RoleRequirement = ({
  index = 0,
  role,
  levels = [],
  availableRoles = [],
  onChange,
}: RoleRequirementProps) => {
  const roleOptions = availableRoles.map((role) => ({
    label: role.name,
    value: role.name,
  }))
  const [selectedRole, setSelectedRole] = useState<SelectOption | undefined>(
    role
      ? { label: roleInfoFromType(role).name, value: role as string }
      : undefined
  )
  const [selectedLevels, setSelectedLevels] = useState<SelectOption[]>(
    levels.map((level) => ({
      label: levelInfoFromType(level)?.name || 'Any',
      value: level || 'Any',
    }))
  )

  const handleSelectRole = (option: SelectOption) => {
    setSelectedRole(option)
    refresh(option, selectedLevels)
  }

  const handleSelectLevels = (option: SelectOption) => {
    const alreadySelectedIndex = selectedLevels.findIndex(
      (selectedOption) => selectedOption.value === option.value
    )

    let newSelectedLevels: SelectOption[] = []

    if (alreadySelectedIndex === -1) {
      if (
        option.value === 'Any' ||
        selectedLevels.some((option) => option.value === 'Any')
      ) {
        newSelectedLevels = [option]
        setSelectedLevels(newSelectedLevels)
        refresh(selectedRole, levelOptions)
        return
      }
      newSelectedLevels = [...selectedLevels, option]
      setSelectedLevels(newSelectedLevels)
    } else {
      newSelectedLevels = [...selectedLevels]
      newSelectedLevels.splice(alreadySelectedIndex, 1)
      setSelectedLevels(newSelectedLevels)
    }
    refresh(selectedRole, newSelectedLevels)
  }

  const refresh = (role?: SelectOption, levels?: SelectOption[]) => {
    if (!onChange) return

    onChange(
      {
        profileRole: role?.value as ProfileRoleType,
        levels:
          levels?.map((option) => option.value as ProfileRoleLevelType) ?? [],
      },
      index
    )
  }

  const removeConstraint = () => {
    if (!onChange) return

    onChange(
      {
        profileRole: undefined,
        levels: [],
      },
      index
    )
  }

  const { deviceSize } = useDeviceSize()
  const isMobile = deviceSize === 'mobile'

  return (
    <Container>
      <DropdownContainer>
        <RoleDropdown
          label="Role"
          options={roleOptions}
          placeholder="Select"
          onSelect={handleSelectRole}
          selectedOption={selectedRole}
        />
        {isMobile && <IconButton icon="trash" size={1.8} color="yellow200" />}
      </DropdownContainer>

      <Level>
        <Subline1>Level</Subline1>
        <DropdownContainer>
          <LevelDropdown
            options={options}
            onSelect={handleSelectLevels}
            selectedOptions={selectedLevels}
            placeholder="Select"
          />
          <IconButton icon="trash" size={1.8} onClick={removeConstraint} />
        </DropdownContainer>
      </Level>
      {isMobile && <HorizontalDivider />}
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2.4rem;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    grid-template-columns: 1fr 1fr;
  }
`

const DropdownContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`

const LevelDropdown = styled(MultipleDropdown)`
  width: 100%;
`

const RoleDropdown = styled(Dropdown)`
  width: 100%;
`

const Level = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`
