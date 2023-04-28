import styled from 'styled-components'
import Tab from '@/components/core/Tab'
import TabGroup from '@/components/core/TabGroup'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Body1, H4, body1Styles } from '@/components/core/Typography'

export default {
  title: 'Core/TabGroup',
  component: TabGroup,
} as ComponentMeta<typeof TabGroup>

const Template: ComponentStory<typeof TabGroup> = () => {
  return (
    <TabGroup>
      <Tab name="Description">
        <TabDescription>
          <section>
            <div>
              <H4>This is a headline</H4>
              <Body1>
                Escape to a charming mountain cabin nestled in the heart of
                nature. This cozy retreat features a warm and inviting interior,
                complete with a fireplace and rustic decor. Enjoy breathtaking
                views from the private deck, take a hike on nearby trails, or
                simply relax in the peaceful surroundings. Perfect for couples
                or small families seeking a serene.
              </Body1>
            </div>

            <div>
              <H4>This is a headline</H4>
              <Body1>
                Escape to a charming mountain cabin nestled in the heart of
                nature. This cozy retreat features a warm and inviting interior,
                complete with a fireplace and rustic decor.
              </Body1>
            </div>

            <ul>
              <li>
                This is a longer sentence to show a multi-line bullet point,
                just serving as a small example
              </li>
              <li>Apples</li>
              <li>Grapes</li>
              <li>Pineapples</li>
            </ul>
          </section>
        </TabDescription>
      </Tab>
      <Tab name="Offers">
        <TabDescription>
          <section>
            <div>
              <H4>This is a headline</H4>
              <Body1>
                Escape to a charming mountain cabin nestled in the heart of
                nature. This cozy retreat features a warm and inviting interior,
                complete with a fireplace and rustic decor.
              </Body1>
            </div>
          </section>
        </TabDescription>
      </Tab>
    </TabGroup>
  )
}

const TabDescription = styled.section`
  display: flex;
  flex-flow: column;
  gap: 2.4rem;

  section {
    display: flex;
    flex-flow: column;
    gap: 2.4rem;
  }

  > h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 1.6rem;
  }

  ul {
  }

  li {
    ${body1Styles}
    margin-left: 1.6rem;
    padding-left: 0.8rem;
  }
`

export const Default = Template.bind({})
