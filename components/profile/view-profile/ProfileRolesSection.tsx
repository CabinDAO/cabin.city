import { levelInfoFromType } from '@/utils/levels'
import { roleInfoFromType } from '@/utils/roles'
import styled from 'styled-components'
import { RoleCard } from '@/components/core/RoleCard'
import { H3 } from '@/components/core/Typography'
import { EmptyState } from '../../core/EmptyState'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { pxToRem } from '@/utils/display-utils'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { ProfileFragment } from '@/utils/types/profile'

interface ProfileRolesProps {
  profile: ProfileFragment
}

const ROLE_CARD_GAP = 24

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
              key={role.type}
              roleInfo={roleInfoFromType(role.type)}
              levelInfo={levelInfoFromType(role.level)}
            />
          ))}
        </RolesList>
      </Container>
    )
  } else {
    return (
      <Container>
        <H3>Role Cards</H3>
        <EmptyState
          backgroundVariant="gradient"
          icon="card-heart"
          title="Choose your interests"
          description="Level them up over time"
          href={EXTERNAL_LINKS.ROLES}
        />
      </Container>
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
  justify-items: flex-start;
  gap: 1.6rem;

  ${({ theme }) => theme.bp.md} {
    grid-gap: ${pxToRem(ROLE_CARD_GAP)}rem;
  }

  ${({ theme }) => theme.bp.lg} {
    display: grid;
    grid-template-columns: repeat(
      3,
      calc((100% - (${pxToRem(ROLE_CARD_GAP)}rem * 2)) / 3)
    );
    justify-items: flex-start;
    align-items: flex-start;
  }
`
