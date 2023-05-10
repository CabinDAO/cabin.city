import { NestedFilter } from '@/components/core/NestedFilter'
import { ProfileRoleLevelType, ProfileRoleType } from '@/generated/graphql'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import styled from 'styled-components'

export default {
  title: 'Core/NestedFilter',
  component: NestedFilter,
} as ComponentMeta<typeof NestedFilter>

const Template: ComponentStory<typeof NestedFilter> = (args) => (
  <Container>
    <NestedFilter {...args}></NestedFilter>
  </Container>
)

const allLevelOptions = [
  { label: 'Apprentice', value: ProfileRoleLevelType.Apprentice },
  { label: 'Artisan', value: ProfileRoleLevelType.Artisan },
  { label: 'Custodian', value: ProfileRoleLevelType.Custodian },
]

export const NestedOptions = Template.bind({})
NestedOptions.args = {
  label: 'Role',
  options: [
    {
      label: 'Caretaker',
      value: ProfileRoleType.Caretaker,
      options: allLevelOptions,
    },
    {
      label: 'Builder',
      value: ProfileRoleType.Builder,
      options: allLevelOptions,
    },
    {
      label: 'Naturalist',
      value: ProfileRoleType.Naturalist,
      options: allLevelOptions,
    },
    {
      label: 'Gatherer',
      value: ProfileRoleType.Gatherer,
      options: allLevelOptions,
    },
    {
      label: 'Creator',
      value: ProfileRoleType.Creator,
      options: allLevelOptions,
    },
    {
      label: 'Resident',
      value: ProfileRoleType.Resident,
      options: allLevelOptions,
    },
  ],
  selections: {},
}

const Container = styled.div`
  display: flex;
`
