import { GetProfileByIdFragment } from '@/generated/graphql'
import { levelInfoFromType } from '@/utils/levels'
import { roleInfoFromType } from '@/utils/roles'
import styled from 'styled-components'
import { RoleCard } from '@/components/core/RoleCard'
import { H3 } from '@/components/core/Typography'
import { ProfileEmptyStateSection } from './ProfileEmptyStateSection'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'

interface ProfileRolesProps {
  profile: GetProfileByIdFragment
}

export const ProfileRolesSection = ({ profile }: ProfileRolesProps) => {
  const { deviceSize } = useDeviceSize()

  if (profile.roles.length) {
    return (
      <Container>
        <H3>Role Cards</H3>
        <RolesList>
          {profile.roles.map((role) => (
            <RoleCard
              variant={deviceSize === 'desktop' ? 'default' : 'horizontal'}
              key={role.role}
              roleInfo={roleInfoFromType(role.role)}
              levelInfo={levelInfoFromType(role.level)}
            />
          ))}
        </RolesList>
      </Container>
    )
  } else {
    return (
      <ProfileEmptyStateSection
        icon="card-heart"
        title="Choose your interests"
        description="Level them up over time"
        href="https://cabin.city"
      />
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
`

const RolesList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-items: center;
  gap: 1.6rem;

  ${({ theme }) => theme.bp.md} {
    grid-gap: 2.4rem;
  }

  ${({ theme }) => theme.bp.lg} {
    display: grid;
    grid-template-columns: repeat(3, auto);
  }
`
