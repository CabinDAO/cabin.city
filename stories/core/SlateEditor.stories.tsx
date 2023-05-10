import { SlateEditor } from '@/components/core/slate/SlateEditor'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'
import { Descendant } from 'slate'

export default {
  title: 'Core/SlateEditor (Rich Text)',
  component: SlateEditor,
} as ComponentMeta<typeof SlateEditor>

const Template: ComponentStory<typeof SlateEditor> = (args) => {
  const [value, setValue] = useState(args.value)
  const onChange = (val: Descendant[]) => {
    // console.info('onChange', val)
    setValue(val)
  }
  return <SlateEditor {...args} value={value} onChange={onChange} />
}

export const Default = Template.bind({})
Default.args = {}

export const WithValue = Template.bind({})
WithValue.args = {
  value: [
    {
      type: 'paragraph',
      children: [{ text: 'This is plain text' }],
    },
  ],
}

export const WithAllFormats = Template.bind({})
WithAllFormats.args = {
  value: [
    {
      type: 'header1',
      children: [
        {
          text: 'This is a header 1',
        },
      ],
    },
    {
      type: 'header1',
      children: [
        {
          text: '',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: 'Escape to a charming mountain cabin nestled in the heart of nature. This cozy retreat features a warm and inviting interior, complete with a fireplace and rustic decor.',
        },
      ],
    },
    {
      type: 'header1',
      children: [
        {
          text: '',
        },
      ],
    },
    {
      type: 'header2',
      children: [
        {
          text: 'This is a header 2',
        },
      ],
    },
    {
      type: 'header2',
      children: [
        {
          text: '',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: 'Escape to a charming mountain cabin nestled in the heart of nature. This cozy retreat features a warm and inviting interior, complete with a fireplace and rustic decor.',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: '',
        },
      ],
    },
    {
      type: 'quote',
      children: [
        {
          text: 'This is a quote',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: '',
        },
      ],
    },
    {
      type: 'list-numbered',
      children: [
        {
          type: 'list-item',
          children: [
            {
              text: 'Cucumber',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'Carrot',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'Cabbage',
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: '',
        },
      ],
    },
    {
      type: 'list-bulleted',
      children: [
        {
          type: 'list-item',
          children: [
            {
              text: 'Broccoli',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'Cauliflower',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'Sweet potato',
            },
          ],
        },
      ],
    },
  ],
}
