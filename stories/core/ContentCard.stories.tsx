import { ContentCard } from '@/components/core/ContentCard'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import styled from 'styled-components'

export default {
  title: 'Core/ContentCard',
  component: ContentCard,
} as ComponentMeta<typeof ContentCard>

const Template: ComponentStory<typeof ContentCard> = (args) => (
  <ContentCard {...args} />
)

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 10rem;
  padding: 1rem;
  height: 10rem;
`

export const OutlineDefault = Template.bind({})

OutlineDefault.args = {
  children: <Content />,
}

export const OutlineWithShadow = Template.bind({})

OutlineWithShadow.args = {
  children: <Content />,
  shadow: true,
}

export const OutlineWithNotch = Template.bind({})
OutlineWithNotch.args = {
  children: <Content />,
  shape: 'notch',
}

export const OutlineWithCurve = Template.bind({})
OutlineWithCurve.args = {
  children: <Content />,
  shape: 'curve',
}

export const OutlineWithCurveAndShadow = Template.bind({})
OutlineWithCurveAndShadow.args = {
  children: <Content />,
  shape: 'curve',
  shadow: true,
}

export const OutlineWithNotchAndShadow = Template.bind({})
OutlineWithNotchAndShadow.args = {
  children: <Content />,
  shape: 'notch',
  shadow: true,
}

export const SoftFillDefault = Template.bind({})
SoftFillDefault.args = {
  children: <Content />,
  fillType: 'soft',
}

export const HardFillDefault = Template.bind({})
HardFillDefault.args = {
  children: <Content />,
  fillType: 'hard',
}

export const SoftFillCurve = Template.bind({})
SoftFillCurve.args = {
  children: <Content />,
  fillType: 'soft',
  shape: 'curve',
}

export const HardFillCurve = Template.bind({})
HardFillCurve.args = {
  children: <Content />,
  fillType: 'hard',
  shape: 'curve',
}

export const OutlineNotchAll = Template.bind({})
OutlineNotchAll.args = {
  children: <Content />,
  shape: 'notch-all',
}
