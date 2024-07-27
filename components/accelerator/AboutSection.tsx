import styled from 'styled-components'
import { Body1, H4 } from '@/components/core/Typography'
import { SectionTitle } from '@/components/accelerator/SectionTitle'
import { AutoImage } from '@/components/core/AutoImage'
import img from '@/components/accelerator/accel-imgs.jpg'
import { useWindowSize } from 'react-use'

export const AboutSection = () => {
  const { width } = useWindowSize()
  return (
    <Container width={width}>
      <Title>The Cabin Neighborhood Accelerator</Title>
      <Content>
        <Left>
          <TopSection>
            <strong>
              A 10-week program that helps people build a sense of community in
              their neighborhoods.
            </strong>{' '}
            Whether you’re just starting out or want to take your community to
            the next level, we want to help you turn your neighborhood into a
            thriving community.
          </TopSection>

          <Boxes>
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
                You’ll learn from experienced mentors who have successfully
                built vibrant communities. They’ll share what’s worked and coach
                you through whatever comes up.
              </BoxBody>
            </Box>
            <Box>
              <BoxTitle>Incredible Humans</BoxTitle>
              <BoxBody>
                Our network of neighborhood builders offers a deep sense of
                camaraderie, encouragement, brainstorming, and cross-pollination
                of ideas that will elevate your community-building efforts.
                Together, we’ll navigate challenges, celebrate wins, and draw
                inspiration from the collective wisdom of each other’s
                experiments.
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
          </Boxes>
        </Left>

        <Right>
          <AutoImage src={img.src} alt={'neighborhood polaroids'} />
        </Right>
      </Content>
    </Container>
  )
}

const Container = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  ${({ theme }) => theme.bp.md} {
    width: 55rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: auto;
    max-width: ${({ width }) => (width > 1320 ? '1100' : width - 220)}px;
  }
`

const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
    justify-content: space-between;
  }
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.lg} {
    width: 48%;
  }
`

const Right = styled.div`
  width: 100%;

  ${({ theme }) => theme.bp.lg} {
    width: 48%;
  }
`

const Title = styled(SectionTitle)`
  ${({ theme }) => theme.bp.lg} {
    width: auto;
  }
`

const TopSection = styled(Body1)`
  font-size: 2rem;
  width: 100%;
  margin-bottom: 2rem;
`

const Boxes = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 2.4rem;
  margin-bottom: 4rem;
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 1.6rem;
  background-color: white;
  border: solid 1px #000;
  box-shadow: 4px 4px 0px 0px #000;
  padding: 2rem;
`

const BoxTitle = styled(H4)`
  font-size: 3.2rem;
  line-height: 120%; /* 3.84rem */
  font-weight: 600;
`

const BoxBody = styled(Body1)`
  opacity: 0.75;
  line-height: 1.5;
`
