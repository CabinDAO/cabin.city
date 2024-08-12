import React from 'react'
import Link from 'next/link'
import { useModal } from '@/components/hooks/useModal'
import { usePrivy } from '@privy-io/react-auth'
import { useProfile } from '@/components/auth/useProfile'
import { MeFragment, ProfileBasicFragment } from '@/utils/types/profile'
import { LocationFragment } from '@/utils/types/location'
import { format, parseISO } from 'date-fns'
import { appDomainWithProto } from '@/utils/display-utils'
import analytics from '@/lib/googleAnalytics/analytics'
import styled, { css } from 'styled-components'
import theme from '@/styles/theme'
import Icon from '@/components/core/Icon'
import { Body1, Body2, Caption, H2, H4 } from './Typography'
import { Button } from '@/components/core/Button'
import { NoWrap } from './NoWrap'
import { Avatar } from '@/components/core/Avatar'
import { ModalContainer } from '@/components/core/modals/ModalContainer'
import { ModalTitle } from '@/components/core/modals/ModalTitle'
import { ContactUsLink } from '@/components/core/ContactUsLink'
import { EXTERNAL_LINKS } from '@/utils/external-links'

export const StewardContact = ({
  steward,
  location,
}: {
  steward: ProfileBasicFragment | null
  location: locationForModal
}) => {
  const { showModal } = useModal()
  const { user } = useProfile()
  const { login } = usePrivy()

  return (
    <Container>
      <Top>
        {steward ? (
          <Link href={`/profile/${steward.externId}`}>
            <Avatar src={steward.avatarUrl} size={7.2} />
          </Link>
        ) : (
          <IconWarp>
            <Icon name={'silhouette'} size={4} />
          </IconWarp>
        )}
        <Info>
          <Name>
            <NoWrap>
              <H4>{steward ? steward.name : 'No Steward (yet)'}</H4>
            </NoWrap>
          </Name>
          <Caption>
            {steward ? (
              <>
                {steward.cabinTokenBalanceInt !== null && (
                  <>
                    {steward.cabinTokenBalanceInt.toLocaleString('en-US')}{' '}
                    ₡ABIN&nbsp;·&nbsp;
                  </>
                )}
                Joined {format(parseISO(steward.createdAt), 'yyyy')}
              </>
            ) : (
              'Maybe you?'
            )}
          </Caption>
        </Info>
      </Top>

      <Body1>
        {steward
          ? steward.bio
          : 'You can apply to steward this neighborhood and help it grow'}
      </Body1>

      <ButtonContainer>
        <ContactButton
          onClick={
            !user
              ? login
              : steward
              ? (e) => {
                  // todo: contact steward via form in modal
                  e.preventDefault()
                  if (!steward) return
                  const newWindow = window.open(
                    `mailto:${steward.email}`,
                    '_blank',
                    'noopener,noreferrer'
                  )
                  if (newWindow) {
                    newWindow.opener = null // This is an additional safety measure
                  }
                  analytics.contactStewardEvent(steward.externId)
                }
              : () => {
                  showModal(() => <Modal user={user} location={location} />)
                }
          }
          variant="tertiary"
        >
          {steward ? 'Contact' : 'Learn More'}
        </ContactButton>
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  gap: 1.6rem;

  ${Body1} {
    opacity: 0.75;
  }
`

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 1.6rem;
`

const IconWarp = styled.div`
  width: 7.2rem;
  height: 7.2rem;
  background-color: ${theme.colors.yellow100};
  border: 1px solid ${theme.colors.green900};
  border-radius: 50%;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
`

const Name = styled.div<{
  wrapToNextLine?: boolean
}>`
  display: flex;
  gap: 0.4rem;
  flex-direction: row;
  align-items: center;

  ${H4} {
    margin-bottom: 0;
  }

  ${({ wrapToNextLine }) =>
    wrapToNextLine &&
    css`
      flex-direction: column;
      align-items: flex-start;
    `}
`

const ButtonContainer = styled.div`
  margin-top: 0.8rem;
`
const ContactButton = styled(Button)`
  width: 100%;
`

type locationForModal = Pick<LocationFragment, 'name' | 'externId'>

const Modal = ({
  user,
  location,
}: {
  user: MeFragment | null
  location: locationForModal
}) => {
  return (
    <ModalWrap>
      <ModalTitle text="Stewardship" />
      <ModalContent>
        <StyledIcon name={'neighborhood'} size={9.6} />
        <H2>Activate this neighborhood</H2>
        <Body2>
          The ideal Cabin neighborhood Steward has a strong desire to make
          friends with their neighbors and make neighbors out of their friends,
          and is willing to commit several hours a week to this project over the
          next 6-12 months.
        </Body2>
        <Body2>
          If you’d like support in this endeavor, check out our{' '}
          <Link
            style={{ textDecoration: 'underline' }}
            target="_blank"
            rel="noopener nofollow noreferrer"
            href={'/accelerator'}
          >
            Neighborhood Accelerator Program
          </Link>
          .
        </Body2>
        <ContactUsLink
          subject={`Steward for ${location.name}`}
          body={
            `I'd like to apply to steward ${location.name} because...\r\n\r\n` +
            `Helpful links for the Cabin team:\r\n` +
            `${appDomainWithProto}/location/${location.externId}\r\n` +
            (user ? `${appDomainWithProto}/profile/${user.externId}` : '')
          }
        >
          <Button variant="tertiary">Apply</Button>
        </ContactUsLink>
      </ModalContent>
    </ModalWrap>
  )
}

const ModalWrap = styled(ModalContainer)`
  overflow-y: auto;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.4rem;
  gap: 2.4rem;
  width: 100%;
  text-align: center;
`

const StyledIcon = styled(Icon)`
  padding: 2.4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.yellow300};
`
