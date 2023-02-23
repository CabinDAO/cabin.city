import { RoleCard } from '@/components/core/RoleCard'
import { ProfileRoleLevelType, ProfileRoleType } from '@/generated/graphql'
import { levelInfoFromType } from '@/utils/levels'
import { roleInfoFromType } from '@/utils/roles'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/RoleCard',
  component: RoleCard,
} as ComponentMeta<typeof RoleCard>

const Template: ComponentStory<typeof RoleCard> = (args) => {
  return <RoleCard {...args} />
}

export const BuilderApprentice = Template.bind({})
BuilderApprentice.args = {
  roleInfo: roleInfoFromType(ProfileRoleType.Builder),
  levelInfo: levelInfoFromType(ProfileRoleLevelType.Apprentice),
}

export const ExternalUrl = Template.bind({})
ExternalUrl.args = {
  roleInfo: roleInfoFromType(ProfileRoleType.Builder),
  levelInfo: levelInfoFromType(ProfileRoleLevelType.Apprentice),
  externalUrl: 'https://goerli.etherscan.io',
}

export const BuilderMember = Template.bind({})
BuilderMember.args = {
  roleInfo: roleInfoFromType(ProfileRoleType.Builder),
  levelInfo: levelInfoFromType(ProfileRoleLevelType.Member),
}

export const BuilderTopHat = Template.bind({})
BuilderTopHat.args = {
  roleInfo: roleInfoFromType(ProfileRoleType.Builder),
  levelInfo: levelInfoFromType(ProfileRoleLevelType.TopHat),
}

export const NaturalistApprentice = Template.bind({})
NaturalistApprentice.args = {
  roleInfo: roleInfoFromType(ProfileRoleType.Naturalist),
  levelInfo: levelInfoFromType(ProfileRoleLevelType.Apprentice),
}

export const NaturalistMember = Template.bind({})
NaturalistMember.args = {
  roleInfo: roleInfoFromType(ProfileRoleType.Naturalist),
  levelInfo: levelInfoFromType(ProfileRoleLevelType.Member),
}

export const NaturalistTopHat = Template.bind({})
NaturalistTopHat.args = {
  roleInfo: roleInfoFromType(ProfileRoleType.Naturalist),
  levelInfo: levelInfoFromType(ProfileRoleLevelType.TopHat),
}
