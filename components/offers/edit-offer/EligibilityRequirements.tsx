import { Dropdown } from '@/components/core/Dropdown'
import { InputText } from '@/components/core/InputText'
import { Body2 } from '@/components/core/Typography'
import { SelectOption } from '@/components/hooks/useDropdownLogic'
import { ChangeEvent, useState } from 'react'
import styled from 'styled-components'
import { RoleRequirement } from './RoleRequirement'
import { Button } from '@/components/core/Button'
import Icon from '@/components/core/Icon'
import {
  ProfileRoleConstraint,
  ProfileRoleLevelType,
  ProfileRoleType,
} from '@/generated/graphql'
import { allRoles } from '@/utils/roles'

interface EligibilityRequirementsProps {
  profileRoleConstraints?: ProfileRoleConstraint[]
  onRoleConstraintsChange?: (
    profileRoleConstraints: ProfileRoleConstraint[]
  ) => void
  citizenshipRequired?: boolean
  onCitizenshipRequiredChange?: (checked: boolean) => void
  minimumCabinBalance?: number | null
  onMinimumCabinBalanceChange?: (value: number | null) => void
}

export interface RoleConstraintInput {
  profileRole: ProfileRoleType | undefined
  levels: ProfileRoleLevelType[]
}

const citizenshipOptions = [
  { label: 'Required', value: true },
  { label: 'Not required', value: false },
]

export const EligibilityRequirements = ({
  profileRoleConstraints = [],
  onRoleConstraintsChange,
  citizenshipRequired = false,
  onCitizenshipRequiredChange,
  minimumCabinBalance,
  onMinimumCabinBalanceChange,
}: EligibilityRequirementsProps) => {
  const [citizenshipSelectedOption, setCitizenshipSelectedOption] = useState<
    SelectOption | undefined
  >(citizenshipRequired ? citizenshipOptions[0] : citizenshipOptions[1])
  const [currentMinimumCabinBalance, setCurrentMinimumCabinBalance] = useState<
    number | null
  >(minimumCabinBalance || null)

  const groupedConstraints = () => {
    const constraints = profileRoleConstraints.reduce((acc, constraint) => {
      const existingConstraint = acc.find(
        (c) => c.profileRole === constraint.profileRole
      )
      if (existingConstraint) {
        existingConstraint.levels.push(constraint.level)
      } else {
        acc.push({
          profileRole: constraint.profileRole,
          levels: [constraint.level],
        })
      }
      return acc
    }, [] as RoleConstraintInput[])

    return constraints
  }

  const constraints =
    profileRoleConstraints.length > 0
      ? groupedConstraints()
      : [
          {
            profileRole: undefined,
            levels: [],
          },
        ]

  const [constraintList, setConstraintList] =
    useState<RoleConstraintInput[]>(constraints)

  const handleCabinTokenBalanceChange = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    let parsedValue = 0

    if (e.target.value !== '') {
      parsedValue = parseInt(e.target.value)
      if (isNaN(parsedValue)) {
        return
      }
    }
    setCurrentMinimumCabinBalance(parsedValue)
    if (onMinimumCabinBalanceChange) {
      onMinimumCabinBalanceChange(parsedValue)
    }
  }

  const handleCitizenshipChange = (option: SelectOption) => {
    setCitizenshipSelectedOption(option)
    if (onCitizenshipRequiredChange) {
      onCitizenshipRequiredChange(option.value as boolean)
    }
  }

  const handleRoleChange = (
    roleConstraintInput: RoleConstraintInput,
    index: number
  ) => {
    const newConstraintList = [...constraintList]
    newConstraintList[index] = roleConstraintInput

    if (!roleConstraintInput.profileRole) {
      newConstraintList.splice(index, 1)
    }

    setConstraintList(newConstraintList)

    if (onRoleConstraintsChange) {
      const flattenedConstraints = newConstraintList.reduce(
        (acc, constraint) => {
          constraint.levels.forEach((level) => {
            if (!constraint.profileRole || constraint.levels.length === 0) {
              return
            }

            acc.push({
              profileRole: constraint.profileRole,
              level,
            })
          })
          return acc
        },
        [] as ProfileRoleConstraint[]
      )
      onRoleConstraintsChange(flattenedConstraints)
    }
  }

  const availableRoles = allRoles.filter(
    (role) => !constraints.find((c) => c.profileRole === role.roleType)
  )

  const addRoleConstraint = () => {
    const newConstraint = {
      profileRole: undefined,
      levels: [],
    }
    setConstraintList([...constraintList, newConstraint])
  }

  return (
    <Container>
      <div />
      <RequirementsContainer>
        <Requirement>
          <RequirementDescription>
            <OpaqueBody2>
              Applicants{' '}
              <strong>
                {'must meet at least one of the roles you list here. '}
              </strong>{' '}
              Leave the fields blank that you don’t wish to constrain.
            </OpaqueBody2>
          </RequirementDescription>
          <InputPair>
            <StyledDropdown
              label="Citizenship"
              placeholder="Select"
              options={citizenshipOptions}
              onSelect={handleCitizenshipChange}
              selectedOption={citizenshipSelectedOption}
            />
            <InputText
              label="₡ABIN holding minimum"
              placeholder="Value"
              onChange={handleCabinTokenBalanceChange}
              value={
                currentMinimumCabinBalance
                  ? currentMinimumCabinBalance.toString()
                  : ''
              }
            />
          </InputPair>
        </Requirement>
        <Requirement>
          <RequirementDescription>
            <OpaqueBody2>
              Applicants{' '}
              <strong>
                {'must meet at least one of the roles you list here. '}
              </strong>
              Leaving this section blank will allow any role apply.
            </OpaqueBody2>
          </RequirementDescription>
          <RoleRequirementList>
            {constraintList.map((role, index) => (
              <RoleRequirement
                index={index}
                availableRoles={availableRoles}
                key={`${role?.profileRole}${index}`}
                role={role?.profileRole}
                levels={role.levels}
                onChange={handleRoleChange}
              />
            ))}
          </RoleRequirementList>
          <EligibleRoleButton
            variant="tertiary"
            onClick={addRoleConstraint}
            startAdornment={<Icon name="plus" size={1} />}
          >
            Eligible Role
          </EligibleRoleButton>
        </Requirement>
      </RequirementsContainer>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  align-items: flex-start;
  justify-content: center;

  ${({ theme }) => theme.bp.md} {
    gap: 0;
    grid-template-columns: 1fr 1fr;
  }
`

const RequirementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
`

const Requirement = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    gap: 1.6rem;
  }
`

const EligibleRoleButton = styled(Button)`
  align-self: flex-start;
  width: 100%;
`

const RequirementDescription = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
`

const OpaqueBody2 = styled(Body2)`
  opacity: 0.75;
`

const InputPair = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  flex-direction: row;
  grid-gap: 2.4rem;
  width: 100%;
  align-items: center;

  ${({ theme }) => theme.bp.md} {
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.8rem;
  }
`

const StyledDropdown = styled(Dropdown)`
  width: 100%;
`

const RoleRequirementList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
`
