import styled from 'styled-components'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { RoleCard } from '@/components/core/RoleCard'
import { roleInfoFromType } from '@/utils/roles'
import { ProfileRoleLevelType, ProfileRoleType } from '@/generated/graphql'
import { levelInfoFromType } from '@/utils/levels'
import { Slideshow } from '@/components/core/gallery/Slideshow'

export default {
  title: 'Core/Slideshow',
  component: Slideshow,
} as ComponentMeta<typeof Slideshow>

const Template: ComponentStory<typeof Slideshow> = (args) => (
  <Viewport>
    <Slideshow {...args}>
      {Object.values(ProfileRoleType).map((role) => (
        <RoleCard
          key={role}
          variant="small"
          roleInfo={roleInfoFromType(ProfileRoleType[role])}
          levelInfo={levelInfoFromType(ProfileRoleLevelType.Custodian)}
        />
      ))}
    </Slideshow>
  </Viewport>
)

const Viewport = styled.div`
  padding: 4rem 6rem;
  width: 90rem;
  max-width: 100%;
  background-color: ${({ theme }) => theme.colors.green800};
`

export const Default = Template.bind({})
Default.args = {}
