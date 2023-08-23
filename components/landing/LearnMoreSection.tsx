import styled from 'styled-components'
import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { Button } from '@/components/core/Button'
import Icon from '@/components/core/Icon'
import { Body1, H4 } from '@/components/core/Typography'

export const LearnMoreSection = () => {
  return (
    <LearnMoreContent>
      <Link
        href={`${EXTERNAL_LINKS.CALENDLY_CALL_URL}?utm_source=cabin.city&utm_content=cabinweekpage`}
        target="_blank"
        rel="noreferrer"
      >
        <Button
          variant={'tertiary'}
          endAdornment={<Icon name={'right-arrow'} size={1.6} />}
        >
          Book a call
        </Button>
      </Link>
      <Actions>
        <Action href={EXTERNAL_LINKS.VISION} target="_blank" rel="noreferrer">
          <Icon name={'account-group'} size={2.4} />
          <ArrowIcon name={'up-right-arrow'} size={2} color={'green800'} />
          <H4>Check out Cabin&apos;s Vision</H4>
          <Body1>
            Learn about how we’re co-creating a Network City with our community.
          </Body1>
        </Action>
        <Action
          href={EXTERNAL_LINKS.CABIN_DISCORD}
          target="_blank"
          rel="noreferrer"
        >
          <Icon name={'forum'} size={2.4} />
          <ArrowIcon name={'up-right-arrow'} size={2} color={'green800'} />
          <H4>Join our online community</H4>
          <Body1>
            Discord is our Town Hall where our community gathers to make plans
            and memes.
          </Body1>
        </Action>
      </Actions>
    </LearnMoreContent>
  )
}

const ArrowIcon = styled(Icon)`
  position: absolute;
  top: 2.4rem;
  right: 0;
`

const Action = styled(Link)`
  width: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 1.6rem;

  padding-top: 2.4rem;
  padding-bottom: 2.4rem;

  &:first-of-type {
    padding-top: 0;
    ${ArrowIcon} {
      top: 0;
    }
  }
  &:last-of-type {
    padding-bottom: 0;
  }

  ${({ theme }) => theme.bp.lg} {
    padding: 0 2.4rem;

    ${ArrowIcon} {
      top: 0;
      right: 2.4rem;
    }

    &:first-of-type {
      padding-left: 0;
    }
    &:last-of-type {
      padding-right: 0;
      ${ArrowIcon} {
        right: 0;
      }
    }
  }

  ${Body1} {
    opacity: 75%;
  }
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 4rem;

  ${Action} + ${Action} {
    border-top: solid 1px rgba(50, 72, 65, 0.12);
  }

  ${({ theme }) => theme.bp.md} {
    width: 50rem;
  }

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
    width: 84rem;

    ${Action} + ${Action} {
      border-top: none;
      border-left: solid 1px rgba(50, 72, 65, 0.12);
    }
  }
`

const LearnMoreContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.md} {
    gap: 4.8rem;
  }
`
