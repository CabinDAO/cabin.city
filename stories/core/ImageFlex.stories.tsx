import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ImageFlex } from '@/components/core/gallery/ImageFlex'

export default {
  title: 'Core/ImageFlex',
  component: ImageFlex,
} as ComponentMeta<typeof ImageFlex>

const Template: ComponentStory<typeof ImageFlex> = (args) => (
  <ImageFlex {...args} />
)

export const FixedHeight = Template.bind({})
FixedHeight.args = {
  src: 'https://picsum.photos/1120/805?random=1',
  height: 40,
}

export const AspectRatio = Template.bind({})
AspectRatio.args = {
  src: 'https://picsum.photos/1120/805?random=2',
  width: 80,
  aspectRatio: 1.6,
}

export const FullAspectRatio = Template.bind({})
FullAspectRatio.args = {
  src: 'https://picsum.photos/1120/805?random=3',
  aspectRatio: 1.6,
}

export const FixedAspectRatio = Template.bind({})
FixedAspectRatio.args = {
  src: 'https://picsum.photos/1120/805?random=4',
  width: 60,
  aspectRatio: 1.9,
}
