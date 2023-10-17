import styled from 'styled-components'
import { Body1, H4, HHero } from '@/components/core/Typography'
import { padding } from '@/styles/theme'
import { SubscribeForm } from '@/components/landing/SubscribeForm'

interface HeroSectionProps {
  title: string
  body: string
  buttons: JSX.Element[]
}

export const HeroSection = (props: HeroSectionProps) => {
  return (
    <ExtraPadding>
      <Wrapper>
        <Text>
          <StyledHHero>{props.title}</StyledHHero>
          <Description>
            <Body1>{props.body}</Body1>
          </Description>
        </Text>
        <ButtonWrapper>
          <Buttons>
            {props.buttons.map((button) => {
              return button
            })}
          </Buttons>
        </ButtonWrapper>
      </Wrapper>
      <H4>Subscribe to our newsletter</H4>
      <SubscribeForm />
    </ExtraPadding>
  )
}

export const StyledHHero = styled(HHero)`
  width: 28.8rem;
  text-align: center;

  ${({ theme }) => theme.bp.md} {
    width: 100%;
    font-size: 4rem;
    line-height: 1.25;
  }
`

const ExtraPadding = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  ${padding('xl', 'md')};

  ${({ theme }) => theme.bp.md} {
    width: 50rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 80rem;
  }
`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const Buttons = styled.div`
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

const ButtonWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.8rem;

  ${({ theme }) => theme.bp.md} {
    align-items: center;
    text-align: center;
    gap: 1.6rem;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    gap: 4rem;
  }
`

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`
