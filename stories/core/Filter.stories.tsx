import { Filter } from '@/components/core/Filter'
import { ProfileRoleType } from '@/generated/graphql'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import styled from 'styled-components'

export default {
  title: 'Core/Filter',
  component: Filter,
} as ComponentMeta<typeof Filter>

const Template: ComponentStory<typeof Filter> = (args) => (
  <Container>
    <Filter {...args}></Filter>
  </Container>
)

export const Default = Template.bind({})
Default.args = {
  label: 'Role',
  options: [
    { label: 'Caretaker', value: ProfileRoleType.Caretaker },
    { label: 'Builder', value: ProfileRoleType.Builder },
    { label: 'Naturalist', value: ProfileRoleType.Naturalist },
    { label: 'Gatherer', value: ProfileRoleType.Gatherer },
    { label: 'Creator', value: ProfileRoleType.Creator },
    { label: 'Resident', value: ProfileRoleType.Resident },
  ],
  selections: [],
}

export const ParentSelections = Template.bind({})
ParentSelections.args = {
  label: 'Role',
  options: [
    { label: 'Caretaker', value: ProfileRoleType.Caretaker },
    { label: 'Builder', value: ProfileRoleType.Builder },
    { label: 'Naturalist', value: ProfileRoleType.Naturalist },
    { label: 'Gatherer', value: ProfileRoleType.Gatherer },
    { label: 'Creator', value: ProfileRoleType.Creator },
    { label: 'Resident', value: ProfileRoleType.Resident },
  ],
  selections: [ProfileRoleType.Caretaker, ProfileRoleType.Builder],
}

const Container = styled.div`
  display: flex;
`
