import styled from 'styled-components'
import { Slideshow } from '@/components/core/gallery/Slideshow'
import { ProfileRoleLevelType, ProfileRoleType } from '@/generated/graphql'
import { RoleCard } from '@/components/core/RoleCard'
import { roleInfoFromType } from '@/utils/roles'
import { levelInfoFromType } from '@/utils/levels'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'

export const TestimonialSection = () => {
  const { deviceSize } = useDeviceSize()

  return (
    <Content>
      <Slideshow key={deviceSize}>
        {Object.values(ProfileRoleType).map((role) => (
          <RoleCard
            key={`${role}-${deviceSize}`}
            variant={deviceSize === 'desktop' ? 'default' : 'small'}
            roleInfo={roleInfoFromType(ProfileRoleType[role])}
            levelInfo={levelInfoFromType(ProfileRoleLevelType.Custodian)}
          />
        ))}
      </Slideshow>
    </Content>
  )
}

const Content = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    align-self: flex-start;
    box-sizing: content-box;
  }

  ${({ theme }) => theme.bp.lg} {
    align-self: center;
    width: 80rem;
  }
`
