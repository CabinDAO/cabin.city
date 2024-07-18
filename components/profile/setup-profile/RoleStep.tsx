import { SetupStepForm } from './SetupStepForm'
import styled from 'styled-components'
import { Subline1 } from '@/components/core/Typography'
import { RoleChip } from '@/components/core/RoleChip'
import { useState } from 'react'
import { useProfile } from '@/components/auth/useProfile'
import { StepProps } from './step-configuration'
import { useBackend } from '@/components/hooks/useBackend'
import {
  ProfileEditResponse,
  RoleFragment,
  RoleType,
} from '@/utils/types/profile'

export const RoleStep = ({ stepName, onBack, onNext }: StepProps) => {
  const { user } = useProfile()
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

  const { useMutate } = useBackend()
  const { trigger: updateProfile } = useMutate<ProfileEditResponse>(
    user ? ['PROFILE', { externId: user.externId }] : null
  )

  const handleNext = async () => {
    await updateProfile({
      roleTypes: selectedRoles,
    })

    onNext()
  }

  const handleSelectRole = (role: RoleType) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role))
    } else {
      setSelectedRoles([...selectedRoles, role])
    }
  }

  return (
    <SetupStepForm stepName={stepName} onNext={handleNext} onBack={onBack}>
      <SetupStepContainer>
        <Subline1>Choose your interests</Subline1>
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
