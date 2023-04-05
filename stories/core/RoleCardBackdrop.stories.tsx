import { RoleCard } from '@/components/core/RoleCard'
import { RoleCardBackdrop } from '@/components/core/RoleCardBackdrop'
import { ProfileRoleLevelType, ProfileRoleType } from '@/generated/graphql'
import { levelInfoFromType } from '@/utils/levels'
import { roleInfoFromType } from '@/utils/roles'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/RoleCardBackdrop',
  component: RoleCardBackdrop,
} as ComponentMeta<typeof RoleCardBackdrop>

const Template: ComponentStory<typeof RoleCardBackdrop> = (args) => (
  <RoleCardBackdrop {...args}>
    <RoleCard
      roleInfo={args.roleInfo}
      levelInfo={levelInfoFromType(ProfileRoleLevelType.Artisan)}
    />
  </RoleCardBackdrop>
)

export const Builder = Template.bind({})
Builder.args = {
  roleInfo: roleInfoFromType(ProfileRoleType.Builder),
}

export const Naturalist = Template.bind({})
Naturalist.args = {
  roleInfo: roleInfoFromType(ProfileRoleType.Naturalist),
}

export const Caretaker = Template.bind({})
Caretaker.args = {
  roleInfo: roleInfoFromType(ProfileRoleType.Caretaker),
}

export const Gatherer = Template.bind({})
Gatherer.args = {
  roleInfo: roleInfoFromType(ProfileRoleType.Gatherer),
}

export const Creator = Template.bind({})
Creator.args = {
  roleInfo: roleInfoFromType(ProfileRoleType.Creator),
}

export const Resident = Template.bind({})
Resident.args = {
  roleInfo: roleInfoFromType(ProfileRoleType.Resident),
}
