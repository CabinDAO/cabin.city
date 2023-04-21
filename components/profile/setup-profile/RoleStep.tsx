import { SetupStepForm } from './SetupStepForm'
import styled from 'styled-components'
import { Subline1 } from '@/components/core/Typography'
import { ProfileRole, ProfileRoleType } from '@/generated/graphql'
import { RoleChip } from '@/components/core/RoleChip'
import { useState } from 'react'
import { useUser } from '@/components/auth/useUser'
import { useUpdateProfile } from '@/components/profile/useUpdateProfile'
import { StepProps } from './step-configuration'

export const RoleStep = ({ name, onBack, onNext }: StepProps) => {
  const { user } = useUser()
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

  const { updateProfile } = useUpdateProfile(user?._id)

  const handleNext = async () => {
    await updateProfile({
      roleTypes: selectedRoles,
    })

    onNext()
  }

  const handleSelectRole = (role: ProfileRoleType) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role))
    } else {
      setSelectedRoles([...selectedRoles, role])
    }
  }

  return (
    <SetupStepForm name={name} onNext={handleNext} onBack={onBack}>
      <SetupStepContainer>
        <Subline1>Choose yor interests</Subline1>
        <RoleGroup>
          {roles.map((role) => {
            return (
              <RoleChip
                key={role}
                roleType={role}
                selected={
                  selectedRoles.includes(role) ||
                  onChainRoleTypes.includes(role)
                }
                onSelect={() => handleSelectRole(role)}
                disabled={onChainRoleTypes.includes(role)}
              />
            )
          })}
        </RoleGroup>
      </SetupStepContainer>
    </SetupStepForm>
  )
}

export const SetupStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1.6rem;

  ${Subline1} {
    align-self: flex-start;
  }
`

const RoleGroup = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  auto-flow: row;
  grid-gap: 1.6rem;

  ${({ theme }) => theme.bp.md} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`
