import { Button } from '@/components/core/Button'
import { LocationVoteModal } from '@/components/core/LocationVoteModal'
import { useModal } from '@/components/hooks/useModal'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/LocationVoteModal',
  component: LocationVoteModal,
} as ComponentMeta<typeof LocationVoteModal>

const Template: ComponentStory<typeof LocationVoteModal> = (args) => {
  const { showModal } = useModal()
  const handleClick = () => {
    showModal(() => <LocationVoteModal {...args} />)
  }

  return <Button onClick={handleClick}>Open Modal</Button>
}

export const Default = Template.bind({})
Default.args = {
  location: {
    _id: '1',
    name: 'Firefly Hut',
  },
  votingPower: 1800,
  myVotes: [],
  onCastVotes: () => new Promise((resolve) => setTimeout(resolve, 3000)),
}

export const Redistribute = Template.bind({})
Redistribute.args = {
  location: {
    _id: '1',
    name: 'Firefly Hut',
  },
  votingPower: 1800,
  myVotes: [
    {
      location: {
        _id: '2',
        name: 'Neighborhood Zero',
      },
      count: 450,
    },
    {
      location: {
        _id: '3',
        name: 'Radish',
      },
      count: 350,
    },
  ],
  onCastVotes: () => new Promise((resolve) => setTimeout(resolve, 3000)),
}

export const ExceededVotingPower = Template.bind({})
ExceededVotingPower.args = {
  location: {
    _id: '1',
    name: 'Firefly Hut',
  },
  votingPower: 1800,
  myVotes: [
    {
      location: {
        _id: '1',
        name: 'Firefly Hut',
      },
      count: 10,
    },
    {
      location: {
        _id: '2',
        name: 'Neighborhood Zero',
      },
      count: 800,
    },
    {
      location: {
        _id: '3',
        name: 'Radish',
      },
      count: 1000,
    },
  ],
  onCastVotes: () => new Promise((resolve) => setTimeout(resolve, 3000)),
}

export const Error = Template.bind({})
Error.args = {
  location: {
    _id: '1',
    name: 'Firefly Hut',
  },
  votingPower: 1800,
  myVotes: [],
  onCastVotes: () => new Promise((resolve, reject) => reject('Error!')),
}

export const Loading = Template.bind({})
Loading.args = {
  location: undefined,
  votingPower: undefined,
  myVotes: [],
  onCastVotes: () => new Promise((resolve) => setTimeout(resolve, 3000)),
  isLoading: true,
}
