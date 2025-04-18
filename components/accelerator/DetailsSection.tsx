import Masonry from 'react-masonry-css'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import styled from 'styled-components'
import { Body1, H4 } from '@/components/core/Typography'
import { SectionTitle } from '@/components/accelerator/shared'
import { BaseContainer } from '@/components/core/BaseContainer'
import { AutoImage } from '@/components/core/AutoImage'
import polaroids from '@/components/accelerator/polaroids.jpg'
import { DEADLINE, deadlineToString } from '@/components/accelerator/Countdown'

export const DetailsSection = () => {
  const { deviceSize } = useDeviceSize()

  return (
    <Container maxWidth={110}>
      <SectionTitle>Program Details</SectionTitle>
      <Masonry
        className={'masonry'}
        columnClassName={'masonry-column'}
        breakpointCols={deviceSize === 'desktop' ? 2 : 1}
      >
        <Box>
          <BoxTitle>Key Dates</BoxTitle>
          <BoxBody>
            <strong>Program Runs</strong>: June 9 - August 20 (10 weeks)
          </BoxBody>
          {new Date() < DEADLINE && (
            <BoxBody>
              <strong>Application Deadline</strong>: {deadlineToString()}
            </BoxBody>
          )}
        </Box>
        <Box>
          <BoxTitle>Weekly Time Commitment</BoxTitle>
          <BoxBody>
            We recommend a minimum time commitment of{' '}
            <strong>4 hours a week</strong> to make the most of the program.
            This time will be spent:
          </BoxBody>
          <List>
            <li>
              "Doing the thing" in your neighborhood (knocking on doors,
              flyering your neighborhood, hosting events, building partnerships,
              spending 1:1 time building relationships, and more)
            </li>
            <li>
              Attending the 75 minute weekly session (in-person or online)
            </li>
            <li>
              Optional online workshops as well as chances to learn from mentors
              1:1
            </li>
          </List>
        </Box>
        <Box>
          <BoxTitle>Curriculum</BoxTitle>
          <BoxBody>
            Each week we’ll{' '}
            <strong>learn the best practices and patterns</strong> of
            neighborhood building and then put them into practice in our
            neighborhoods. We’ll cover:
          </BoxBody>
          <List>
            <li>Building Meaningful Relationships with Neighbors</li>
            <li>Helping Your Friends Move Into Your Neighborhood</li>
            <li>Building Third Places</li>
            <li>Hosting Events People Want to Attend</li>
            <li>Creating a Sense of Group Ownership</li>
            <li>Neighborhood Comms & Group Message Threads</li>
            <li>Knocking on Doors</li>
            <li>
              Solving Local Problems Together: Placemaking, Tactical Urbanism &
              Collective Action
            </li>
          </List>
        </Box>
        <Box>
          <BoxTitle>Live Calls</BoxTitle>
          <List>
            <li>
              <strong>Weekly 75 min Pod Call</strong>: Learn proven
              neighborhood-building strategies, share progress, be held
              accountable to taking action each week, and get support from your
              peers.
            </li>
            <li>
              <strong>Workshops</strong>: Mentors and experts will lead highly
              interactive sessions on relevant topics.
            </li>
          </List>
          <BoxBody>
            Call timing will be based on participant availability.
          </BoxBody>
        </Box>
        <Box>
          <BoxTitle>How-To Guides</BoxTitle>
          <BoxBody>
            <strong>Step-by-step playbooks</strong>, updated regularly with{' '}
            <strong>real-world insights</strong> and stories of successful
            community builders in our program.
          </BoxBody>
        </Box>
        <Box>
          <BoxTitle>Telegram Groups</BoxTitle>
          <BoxBody>
            The async place to ask questions,{' '}
            <strong>get support from mentors</strong> and fellow neighborhood
            builders, see how others are doing things, and{' '}
            <strong>celebrate each others’ wins</strong>.
          </BoxBody>
        </Box>
      </Masonry>

      {deviceSize === 'desktop' && (
        <AutoImage
          src={polaroids.src}
          alt={'polaroids'}
          style={{ marginTop: '10rem' }}
        />
      )}
    </Container>
  )
}

const Container = styled(BaseContainer)`
  margin-bottom: 4rem;
  gap: 4rem;

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
  gap: 0.7rem;
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
  margin-left: 2.4rem;
  opacity: 0.8;
  line-height: 1.4;
  font-size: 1.6rem;

  li {
    margin-bottom: 1rem;
  }
`
