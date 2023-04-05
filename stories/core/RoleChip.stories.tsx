import { RoleChip } from '@/components/core/RoleChip'
import { ProfileRoleType } from '@/generated/graphql'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/RoleChip',
  component: RoleChip,
} as ComponentMeta<typeof RoleChip>

const Template: ComponentStory<typeof RoleChip> = (args) => (
  <RoleChip {...args} />
)

export const BuilderUnselected = Template.bind({})
BuilderUnselected.args = {
  roleType: ProfileRoleType.Builder,
}

export const CaretakerSelected = Template.bind({})
CaretakerSelected.args = {
  roleType: ProfileRoleType.Caretaker,
  selected: true,
}

export const NaturalistDisabled = Template.bind({})
NaturalistDisabled.args = {
  roleType: ProfileRoleType.Naturalist,
  disabled: true,
}

export const CreatorSelectedAndDisabled = Template.bind({})
CreatorSelectedAndDisabled.args = {
  roleType: ProfileRoleType.Creator,
  selected: true,
  disabled: true,
}
