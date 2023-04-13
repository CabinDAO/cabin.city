import { ImageGallery } from '@/components/core/gallery/ImageGallery'
import { TempImage } from '@/lib/image'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Core/ImageGallery',
  component: ImageGallery,
} as ComponentMeta<typeof ImageGallery>

const Template: ComponentStory<typeof ImageGallery> = (args) => (
  <ImageGallery {...args} />
)

export const Default = Template.bind({})

const images: TempImage[] = []

for (let i = 0; i < 10; i++) {
  images.push({
    name: `Image ${i}`,
    url: `https://picsum.photos/1120/805?random=${i}`,
  })
}

Default.args = {
  title: 'Sleeping arrangements',
  images,
}
