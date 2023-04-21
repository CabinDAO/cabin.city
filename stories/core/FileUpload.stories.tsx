import { FileUploadDropzone } from '@/components/core/FileUploadDropzone'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/FileUploadDropzone',
  component: FileUploadDropzone,
} as ComponentMeta<typeof FileUploadDropzone>

const Template: ComponentStory<typeof FileUploadDropzone> = (args) => (
  <FileUploadDropzone {...args} />
)

export const Default = Template.bind({})
Default.args = {
  iconName: 'check',
  onFilesUploaded: () => Promise.resolve(),
}
