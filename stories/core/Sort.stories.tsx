import { Sort } from '@/components/core/Sort'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import styled from 'styled-components'

export default {
  title: 'Core/Sort',
  component: Sort,
} as ComponentMeta<typeof Sort>

const Template: ComponentStory<typeof Sort> = (args) => (
  <Container>
    <Sort {...args}></Sort>
  </Container>
)

export const Default = Template.bind({})
Default.args = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSelectOption: (option) => {
    console.log({ option })
  },
  fields: [
    {
      key: 'join_date',
      label: 'Join date',
      options: [
        {
          key: 'newest',
          label: 'Newest',
        },
        {
          key: 'oldest',
          label: 'Oldest',
        },
      ],
    },
    {
      key: 'cabin_balance',
      label: '₡ABIN holdings',
      options: [
        {
          key: 'ascending',
          label: 'Ascending',
        },
        {
          key: 'descending',
          label: 'Descending',
        },
      ],
    },
    {
      key: 'stamp_amount',
      label: 'Stamp Amount',
      options: [
        {
          key: 'ascending',
          label: 'Ascending',
        },
        {
          key: 'descending',
          label: 'Descending',
        },
      ],
    },
  ],
}

const Container = styled.div`
  display: flex;
`
