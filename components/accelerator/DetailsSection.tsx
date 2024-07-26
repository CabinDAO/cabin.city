import Masonry from 'react-masonry-css'
import styled from 'styled-components'
import { Body1, H2, H4, fonts } from '@/components/core/Typography'
import { AcceleratorSectionTitle } from '@/components/accelerator/AcceleratorPageView'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'

export const DetailsSection = () => {
  const { deviceSize } = useDeviceSize()

  return (
    <>
      <AcceleratorSectionTitle>Program details</AcceleratorSectionTitle>

      <Content>
        <Masonry
          className={'masonry'}
          columnClassName={'masonry-column'}
          breakpointCols={deviceSize === 'desktop' ? 2 : 1}
        >
          <Box>
            <BoxTitle>Key Dates</BoxTitle>
            <BoxBody>
              <strong>Start Date</strong>: September 23
            </BoxBody>
            <BoxBody>
              <strong>End Date</strong>: December 1
            </BoxBody>
            <BoxBody>
              <strong>Application Deadline</strong>: September 8, 11:59pm PT
            </BoxBody>
            <BoxBody>
              <strong>Program Length</strong>: 10 weeks
            </BoxBody>
          </Box>
          <Box>
            <BoxTitle>Weekly Time Commitment</BoxTitle>
            <BoxBody>
              To reap the full benefits of this program, we recommend committing
              at least <strong>four hours per week</strong>.
            </BoxBody>
            <BoxBody>
              1 hour a week for the weekly group call and about 3 hours a week
              doing on-the-ground neighborhood building activities like knocking
              on doors, flyering your neighborhood, hosting events, building
              partnerships, spending 1:1 time building relationships, etc.
            </BoxBody>
          </Box>
          <Box>
            <BoxTitle>Curriculum</BoxTitle>
            <BoxBody>
              Each week we’ll{' '}
              <strong>learn the best practices and patterns</strong> of
              neighborhood building and then put them into practice in our
              neighborhoods. We’ll cover:
              <List>
                <li>Building Meaningful Relationships with Neighbors</li>
                <li>
                  Helping Your Friends + Family Move Into Your Neighborhood
                </li>
                <li>Creating Third Places</li>
                <li>Hosting Engaging Events</li>
                <li>Creating a Sense of Group Ownership</li>
                <li>Neighborhood Comms & Group Message Threads</li>
                <li>Knocking on Doors</li>
                <li>
                  Solving Local Problems Together: Placemaking, Tactical
                  Urbanism & Collective Action
                </li>
              </List>
            </BoxBody>
          </Box>
          <Box>
            <BoxTitle>Live Calls</BoxTitle>
            <BoxBody>
              <List>
                <li>
                  <strong>Weekly Small Group Call</strong>: Learn proven
                  neighborhood-building strategies, share progress, and get
                  feedback and support from your group. (Calls will consist of
                  6-8 people in a pod)
                </li>
                <li>
                  <strong>Regular Mentor Calls</strong>: Experienced
                  neighborhood builders share their stories of building their
                  neighborhoods, offer personalized coaching, and answer
                  questions.
                </li>
              </List>
            </BoxBody>
            <BoxBody>
              Call timing will be based on participant availability.
            </BoxBody>
          </Box>
          <Box>
            <BoxTitle>How-To Guides</BoxTitle>
            <BoxBody>
              <strong>Step-by-step neighborhood building playbooks</strong>,
              updated regularly with <strong>real-world insights</strong> and
              stories of successful community builders in our program.
            </BoxBody>
          </Box>
          <Box>
            <BoxTitle>Telegram Groups</BoxTitle>
            <BoxBody>
              The async place to ask questions, get support from mentors and
              fellow neighborhood builders, see how others are doing things, and
              celebrate each others’ wins.
            </BoxBody>
          </Box>
        </Masonry>
      </Content>
    </>
  )
}

const Content = styled.div`
  width: 100%;
  flex-direction: column;
  margin-bottom: 4rem;

  ${({ theme }) => theme.bp.md} {
    width: 55rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 80rem;
  }

  .masonry {
    width: 100%;
    display: flex;
    width: auto;
    gap: 2.4rem;
  }

  .masonry-column {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 2.4rem;
  background-color: white;
  border: solid 1px #000;
  box-shadow: 4px 4px 0px 0px #000;
  padding: 2rem;
`

const BoxTitle = styled(H4)`
  font-size: 3.4rem;
  line-height: 120%; /* 3.84rem */
  font-weight: 600;
`

const BoxBody = styled(Body1)`
  opacity: 0.8;
  line-height: 1.4;
`

const List = styled.ul`
  margin-top: 1rem;
  margin-left: 2.4rem;

  li {
    margin-bottom: 1rem;
  }
`
