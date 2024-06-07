import styled from 'styled-components'
import { HHero } from '@/components/core/Typography'
import { Button } from '@/components/core/Button'
import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { AuthenticatedLink } from '@/components/core/AuthenticatedLink'

export const HeroSection = () => {
  return (
    <Content>
      <TopWrapper>
        <HeaderText>
          A network of neighborhoods where you’d want to grow up
        </HeaderText>
        <ButtonWrapper>
          <Buttons>
            <AuthenticatedLink href="/city-directory">
              <Button>Find one near you</Button>
            </AuthenticatedLink>
            <Link
              href={`${EXTERNAL_LINKS.CALENDLY_CALL_URL}?utm_source=cabin.city&utm_content=landingpageheader`}
              target="_blank"
              rel="noopener nofollow noreferrer"
            >
              <Button variant={'secondary'}>Book a welcome call</Button>
            </Link>
          </Buttons>
        </ButtonWrapper>
      </TopWrapper>
      {/*<Newsletter>*/}
      {/*  <H4>Subscribe to our newsletter</H4>*/}
      {/*  <SubscribeForm />*/}
      {/*</Newsletter>*/}
    </Content>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
  gap: 8rem;
  margin-top: 4rem;
  margin-bottom: 4rem;

  ${({ theme }) => theme.bp.md} {
    width: 50rem;
    gap: 16rem;
    margin-bottom: 12rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 67rem;
    margin-bottom: 16rem;
  }
`

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    gap: 10rem;
  }
`

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    gap: 4rem;
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

// const Newsletter = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   gap: 2.4rem;
//   width: 100%;
//   h4 {
//     color: ${({ theme }) => theme.colors.yellow100};
//     text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9), 2px 2px 4px rgba(0, 0, 0, 0.7),
//       3px 3px 6px rgba(0, 0, 0, 0.5), 4px 4px 8px rgba(0, 0, 0, 0.3);
//   }
// `

const HeaderText = styled(HHero)`
  width: 28.8rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9), 2px 2px 4px rgba(0, 0, 0, 0.7),
    3px 3px 6px rgba(0, 0, 0, 0.5), 4px 4px 8px rgba(0, 0, 0, 0.3);

  ${({ theme }) => theme.bp.md} {
    width: 100%;
    font-size: 4rem;
    line-height: 1.25;
  }
`
