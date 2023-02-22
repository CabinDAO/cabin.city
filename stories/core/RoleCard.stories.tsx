import { RoleCard } from '@/components/core/RoleCard'
import { ProfileRoleLevelType, ProfileRoleType } from '@/generated/graphql'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/RoleCard',
  component: RoleCard,
} as ComponentMeta<typeof RoleCard>

const Template: ComponentStory<typeof RoleCard> = (args) => (
  <RoleCard {...args} />
)

export const BuilderApprentice = Template.bind({})
BuilderApprentice.args = {
  roleType: ProfileRoleType.Builder,
  levelType: ProfileRoleLevelType.Apprentice,
}

export const ExternalUrl = Template.bind({})
ExternalUrl.args = {
  roleType: ProfileRoleType.Builder,
  levelType: ProfileRoleLevelType.Apprentice,
  externalUrl: 'https://goerli.etherscan.io',
}

export const BuilderMember = Template.bind({})
BuilderMember.args = {
  roleType: ProfileRoleType.Builder,
  levelType: ProfileRoleLevelType.Member,
}

export const BuilderTopHat = Template.bind({})
BuilderTopHat.args = {
  roleType: ProfileRoleType.Builder,
  levelType: ProfileRoleLevelType.TopHat,
}

export const NaturalistApprentice = Template.bind({})
NaturalistApprentice.args = {
  roleType: ProfileRoleType.Naturalist,
  levelType: ProfileRoleLevelType.Apprentice,
}

export const NaturalistMember = Template.bind({})
NaturalistMember.args = {
  roleType: ProfileRoleType.Naturalist,
  levelType: ProfileRoleLevelType.Member,
}

export const NaturalistTopHat = Template.bind({})
NaturalistTopHat.args = {
  roleType: ProfileRoleType.Naturalist,
  levelType: ProfileRoleLevelType.TopHat,
}
