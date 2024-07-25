import styled from 'styled-components'
import { Body1, H2, H4, fonts } from '@/components/core/Typography'
import { AcceleratorSectionTitle } from '@/components/accelerator/AcceleratorPageView'

export const DetailsSection = () => {
  return (
    <>
      <AcceleratorSectionTitle>Program details</AcceleratorSectionTitle>

      <Content>
        <Box>
          <BoxTitle>Key Dates</BoxTitle>
          <BoxBody>
            You’ll receive clear, personalized guidance and hands-on support
            every step of the way.
          </BoxBody>
        </Box>
        <Box>
          <BoxTitle>Weekly Time Commitment</BoxTitle>
          <BoxBody>
            To reap the full benefits of this program, we recommend committing
            at least four hours per week.
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
            Each week we’ll learn the best practices and patterns of
            neighborhood building and then put them into practice in our
            neighborhoods. We’ll cover: - Building Meaningful Relationships with
            Neighbors - Helping Your Friends + Family Move Into Your
            Neighborhood - Creating Third Places - Hosting Engaging Events -
            Creating a Sense of Group Ownership - Neighborhood Comms & Group
            Message Threads - Knocking on Doors - Solving Local Problems
            Together: Placemaking, Tactical Urbanism & Collective Action
          </BoxBody>
        </Box>
        <Box>
          <BoxTitle>How-To Guides</BoxTitle>
          <BoxBody>
            Step-by-step neighborhood building playbooks, updated regularly with
            real-world insights and stories of successful community builders in
            our program.
          </BoxBody>
        </Box>
        <Box>
          <BoxTitle>Live Calls</BoxTitle>
          <BoxBody>
            Weekly Small Group Call: Learn proven neighborhood-building
            strategies, share progress, and get feedback and support from your
            group. (Calls will consist of 6-8 people in a pod)
          </BoxBody>
          <BoxBody>
            Regular Mentor Calls: Experienced neighborhood builders share their
            stories of building their neighborhoods, offer personalized
            coaching, and answer questions.
          </BoxBody>
          <BoxBody>
            Call timing will be based on participant availability.
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
      </Content>
    </>
  )
}

const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 2.4rem;
  margin-bottom: 4rem;

  ${({ theme }) => theme.bp.md} {
    width: 55rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 80rem;
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

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    padding: 6rem;
  }
`

const BoxTitle = styled(H4)`
  font-size: 3.2rem;
  line-height: 120%; /* 3.84rem */
  font-weight: 600;

  ${({ theme }) => theme.bp.md} {
    width: 50%;
  }
`

const BoxBody = styled(Body1)`
  opacity: 0.75;
  line-height: 1.5;

  ${({ theme }) => theme.bp.md} {
    width: 50%;
  }
`
