import { GetProfileByIdFragment } from '@/generated/graphql'
import { levelInfoFromType } from '@/utils/levels'
import { roleInfoFromType } from '@/utils/roles'
import styled from 'styled-components'
import { RoleCard } from '@/components/core/RoleCard'
import { H3 } from '@/components/core/Typography'
import { ProfileEmptyStateSection } from './ProfileEmptyStateSection'

interface ProfileRolesProps {
  profile: GetProfileByIdFragment
}

export const ProfileRolesSection = ({ profile }: ProfileRolesProps) => {
  if (profile.roles.length) {
    return (
      <Container>
        <H3>Roles</H3>
        <RolesList>
          {profile.roles.map((role) => (
            <RoleCard
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
  display: grid;
  grid-template-columns: repeat(3, auto);
  align-items: flex-start;
  column-gap: 2.4rem;
  row-gap: 2.4rem;
  width: 100%;
  justify-items: center;
`
