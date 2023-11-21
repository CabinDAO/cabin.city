import styled from 'styled-components'
import { Body1, H4, HHero } from '@/components/core/Typography'
import { padding } from '@/styles/theme'
import { SubscribeForm } from '@/components/landing/SubscribeForm'

interface HeroSectionProps {
  buttons: JSX.Element[]
}

export const HeroSection = (props: HeroSectionProps) => {
  return (
    <ExtraPadding>
      <Wrapper>
        <Text>
          <StyledHHero>
            Internet friends building a network of modern villages
          </StyledHHero>
        </Text>
        {/*<ButtonWrapper>*/}
        {/*  <Buttons>*/}
        {/*    {props.buttons.map((button) => {*/}
        {/*      return button*/}
        {/*    })}*/}
        {/*  </Buttons>*/}
        {/*</ButtonWrapper>*/}
      </Wrapper>
      <Newsletter>
        <H4>Subscribe to our newsletter</H4>
        <SubscribeForm />
      </Newsletter>
    </ExtraPadding>
  )
}

export const StyledHHero = styled(HHero)`
  width: 28.8rem;
  text-align: center;

  ${({ theme }) => theme.bp.md} {
    width: 100%;
    font-size: 3.2rem;
    line-height: 1.25;
  }
`

const ExtraPadding = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  margin-bottom: 4rem;

  ${({ theme }) => theme.bp.md} {
    width: 50rem;
    gap: 4.8rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 57rem;
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

const Newsletter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  width: 100%;
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
