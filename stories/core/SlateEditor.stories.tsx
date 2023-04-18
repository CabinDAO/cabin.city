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
    console.info('onChange', val)
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
