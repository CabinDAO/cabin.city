import { useState } from 'react'
import { MeFragment, RoleFragment, RoleType } from '@/utils/types/profile'
import { roleInfoFromType } from '@/utils/roles'
import styled from 'styled-components'
import { CheckboxChip } from '@/components/core/CheckboxChip'
import { UpdateSection } from '../EditProfileForm'

export const Roles = ({
  user,
  onChange,
}: {
  user: MeFragment
  onChange: (roles: RoleType[]) => void
}) => {
  const roles = Object.keys(RoleType) as RoleType[]

  const allRoles = user?.roles ?? []
  const currentRoles = [] as RoleFragment[]
  const onChainRoles = [] as RoleFragment[]

  allRoles.forEach((role) =>
    role.hatId ? onChainRoles.push(role) : currentRoles.push(role)
  )

  const onChainRoleTypes = onChainRoles.map((cr) => cr.type)

  const [selectedRoles, setSelectedRoles] = useState<RoleType[]>(
    currentRoles.map((cr) => cr.type)
  )

  const handleSelectRole = (role: RoleType) => {
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

const RoleGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.8rem;

  ${({ theme }) => theme.bp.md} {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    auto-flow: row;
    grid-gap: 1.6rem;
  }
`
