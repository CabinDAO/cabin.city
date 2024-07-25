import styled from 'styled-components'
import { Body1, H4 } from '@/components/core/Typography'
import { AcceleratorSectionTitle } from '@/components/accelerator/AcceleratorPageView'

export const AboutSection = () => {
  return (
    <>
      <AcceleratorSectionTitle>
        The Cabin Neighborhood Accelerator
      </AcceleratorSectionTitle>

      <TopSection>
        <strong>
          A 10-week program that helps people build a sense of community in
          their neighborhoods.
        </strong>{' '}
        Whether you’re just starting out or want to take your community to the
        next level, we want to help you turn your neighborhood into a thriving
        community.
      </TopSection>

      <Content>
        <Box>
          <BoxTitle>Step-by-Step Support</BoxTitle>
          <BoxBody>
            You’ll receive clear, personalized guidance and hands-on support
            every step of the way.
          </BoxBody>
        </Box>
        <Box>
          <BoxTitle>Mentorship</BoxTitle>
          <BoxBody>
            You’ll learn from experienced mentors who have successfully built
            vibrant communities. They’ll share what’s worked and coach you
            through whatever comes up.
          </BoxBody>
        </Box>
        <Box>
          <BoxTitle>Incredible Humans</BoxTitle>
          <BoxBody>
            This extraordinary network offers a deep sense of camaraderie,
            encouragement, brainstorming, and cross-pollination of ideas that
            will elevate your community-building efforts. Together, you'll
            navigate challenges, celebrate wins, and draw inspiration from the
            collective wisdom of this exceptional group.
          </BoxBody>
        </Box>
        <Box>
          <BoxTitle>Accountability</BoxTitle>
          <BoxBody>
            You’ll be held accountable to take specific, time-tested actions
            each week to build a neighborhood you’re proud of.
          </BoxBody>
        </Box>
        <Box>
          <BoxTitle>Funding Opportunities</BoxTitle>
          <BoxBody>
            We connect neighborhood stewards with grants and public goods
            funding opportunities.
          </BoxBody>
        </Box>
      </Content>
    </>
  )
}

const TopSection = styled(Body1)`
  font-size: 2rem;
  width: 100%;
  margin-bottom: 2rem;

  ${({ theme }) => theme.bp.md} {
    width: 45rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 70rem;
  }
`

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
