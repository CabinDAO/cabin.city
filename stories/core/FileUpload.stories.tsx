import { FileUpload } from '@/components/core/FileUpload'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/FileUpload',
  component: FileUpload,
} as ComponentMeta<typeof FileUpload>

const Template: ComponentStory<typeof FileUpload> = (args) => (
  <FileUpload {...args} />
)

export const Default = Template.bind({})
Default.args = {
  iconName: 'check',
  onFilesUploaded: () => Promise.resolve(),
}
