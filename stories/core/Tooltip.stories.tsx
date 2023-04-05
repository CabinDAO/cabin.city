import { Tooltip, TooltipPosition } from '@/components/core/Tooltip'
import { Subline1 } from '@/components/core/Typography'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import styled from 'styled-components'

const TestContainer = styled.div`
  margin: 2rem;
  display: flex;
  padding: 2rem;
  gap: 10rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const TooltipPair = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10rem;
  align-items: center;
  justify-content: center;
`

const TooltipTestContainer = () => (
  <TestContainer>
    {['right', 'left', 'top', 'bottom'].map((position) => (
      <TooltipPair key={position}>
        <Tooltip
          tooltip={`${position} tooltip`}
          position={position as TooltipPosition}
          key={position}
          offset={1.2}
        >
          <Subline1>{position}</Subline1>
        </Tooltip>
        <Tooltip
          tooltip={`${position} animated tooltip`}
          animate
          position={position as TooltipPosition}
          key={`${position}-animated`}
          offset={1.2}
        >
          <Subline1>{position} - Animated</Subline1>
        </Tooltip>
      </TooltipPair>
    ))}
  </TestContainer>
)

export default {
  title: 'Core/Tooltip',
  component: TooltipTestContainer,
} as ComponentMeta<typeof TooltipTestContainer>

const Template: ComponentStory<typeof TooltipTestContainer> = () => (
  <TooltipTestContainer />
)

export const Default = Template.bind({})
Default.args = {}
