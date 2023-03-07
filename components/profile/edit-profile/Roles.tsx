import { CheckboxChip } from '@/components/core/CheckboxChip'
import { MeFragment, ProfileRole, ProfileRoleType } from '@/generated/graphql'
import { roleInfoFromType } from '@/utils/roles'
import { useState } from 'react'
import styled from 'styled-components'
import { UpdateSection } from './UpdateSection'

export interface RolesProps {
  onChange: (roles: ProfileRoleType[]) => void
  user: MeFragment
}

export const Roles = ({ user, onChange }: RolesProps) => {
  const roles = Object.keys(ProfileRoleType) as ProfileRoleType[]

  const allRoles = user?.roles ?? []
  const currentRoles = [] as ProfileRole[]
  const onChainRoles = [] as ProfileRole[]

  allRoles.forEach((role) =>
    role.hatId ? onChainRoles.push(role) : currentRoles.push(role)
  )

  const onChainRoleTypes = onChainRoles.map((cr) => cr.role)

  const [selectedRoles, setSelectedRoles] = useState<ProfileRoleType[]>(
    currentRoles.map((cr) => cr.role)
  )

  const handleSelectRole = (role: ProfileRoleType) => {
    if (onChainRoleTypes.includes(role)) return

    const newRoles = selectedRoles.includes(role)
      ? [...selectedRoles.filter((r) => r !== role)]
      : [...selectedRoles, role]
    setSelectedRoles(newRoles)
    onChange(newRoles)
  }

  return (
    <UpdateSection title="Roles">
      <RoleGroup>
        {roles.map((role) => {
          return (
            <CheckboxChip
              key={role}
              label={role}
              icon={roleInfoFromType(role).iconName}
              selected={
                selectedRoles.includes(role) || onChainRoleTypes.includes(role)
              }
              onSelect={() => handleSelectRole(role)}
              disabled={onChainRoleTypes.includes(role)}
            />
          )
        })}
      </RoleGroup>
    </UpdateSection>
  )
}

export const SetupStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 1.6rem;
`

const RoleGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  auto-flow: row;
  column-gap: 1.6rem;
  row-gap: 1.6rem;
  width: 100%;
`
