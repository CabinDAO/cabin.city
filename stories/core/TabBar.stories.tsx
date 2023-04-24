import { Tab, TabBar } from '@/components/core/TabBar'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

export default {
  title: 'Core/TabBar',
  component: TabBar,
} as ComponentMeta<typeof TabBar>

const Template: ComponentStory<typeof TabBar> = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  return (
    <TabBar>
      <Tab isSelected={selectedTab === 0} onClick={() => setSelectedTab(0)}>
        Neighborhoods
      </Tab>
      <Tab isSelected={selectedTab === 1} onClick={() => setSelectedTab(1)}>
        Outposts
      </Tab>
    </TabBar>
  )
}

export const Default = Template.bind({})
