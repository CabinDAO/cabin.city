import { SlateRenderer } from '@/components/core/slate/SlateRenderer'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/SlateRenderer (Rich Text)',
  component: SlateRenderer,
} as ComponentMeta<typeof SlateRenderer>

const Template: ComponentStory<typeof SlateRenderer> = (args) => (
  <SlateRenderer {...args} />
)

export const Empty = Template.bind({})
Empty.args = {}

export const PlainText = Template.bind({})
PlainText.args = {
  value: [
    {
      type: 'paragraph',
      children: [{ text: 'This is plain text' }],
    },
  ],
}

export const WithBoldText = Template.bind({})
WithBoldText.args = {
  value: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'This is ',
        },
        {
          text: 'bold',
          bold: true,
        },
        {
          text: ' text',
        },
      ],
    },
  ],
}
