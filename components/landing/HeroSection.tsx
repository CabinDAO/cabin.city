import {
  LandingContentNoPadding,
  SectionContent,
  StyledHHero,
} from '@/components/landing/styles'
import styled from 'styled-components'
import { Body1 } from '@/components/core/Typography'

interface HeroSectionProps {
  title: string
  body: string
  buttons: JSX.Element[]
}

export const HeroSection = (props: HeroSectionProps) => {
  return (
    <LandingContent>
      <SectionContent>
        <HeroDescriptionContainer>
          <StyledHHero>{props.title}</StyledHHero>
          <SectionGrowDescription>
            <Body1>{props.body}</Body1>
          </SectionGrowDescription>
        </HeroDescriptionContainer>
        <SectionHeader>
          <SectionGrowSignup>
            {props.buttons.map((button) => {
              return button
            })}
          </SectionGrowSignup>
        </SectionHeader>
      </SectionContent>
    </LandingContent>
  )
}

const LandingContent = styled(LandingContentNoPadding)`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  padding: 8rem 2.4rem;

  ${({ theme }) => theme.bp.md} {
    align-self: flex-start;
    box-sizing: content-box;
    padding: 8rem 2.4rem 8rem 12.8rem;
  }

  ${({ theme }) => theme.bp.lg} {
    align-self: center;
    padding: 8rem 4rem;
  }
`

const SectionGrowDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const SectionGrowSignup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
  }

  ${({ theme }) => theme.bp.md_max} {
    > * {
      flex-grow: 1;
    }

    button {
      width: 100%;
    }
  }
`

const SectionHeader = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.8rem;

  ${({ theme }) => theme.bp.md} {
    align-items: center;
    text-align: center;
    gap: 1.6rem;
  }
`

export const HeroDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`
