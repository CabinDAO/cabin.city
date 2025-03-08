import React from 'react'
import Link from 'next/link'
import { useModal } from '@/components/hooks/useModal'
import { useUser } from '@/components/auth/useUser'
import { MeFragment, ProfileBasicFragment } from '@/utils/types/profile'
import { LocationFragment } from '@/utils/types/location'
import { format, parseISO } from 'date-fns'
import { expandRoute } from '@/utils/routing'
import { appDomainWithProto } from '@/utils/display-utils'
import analytics from '@/lib/googleAnalytics/analytics'
import styled, { css } from 'styled-components'
import theme from '@/styles/theme'
import Icon from '@/components/core/Icon'
import { Body1, Body2, Caption, H2, H4 } from './Typography'
import { Button } from '@/components/core/Button'
import { NoWrap } from './NoWrap'
import { Avatar } from '@/components/profile/Avatar'
import { ModalContainer } from '@/components/core/modals/ModalContainer'
import { ModalTitle } from '@/components/core/modals/ModalTitle'
import { ContactUsLink } from '@/components/core/ContactUsLink'
import { ContactModal } from '@/components/contact/ContactModal'

export const StewardContact = ({
  steward,
  location,
}: {
  steward: ProfileBasicFragment | null
  location: locationForModal
}) => {
  const { showModal } = useModal()
  const { user } = useUser()

  return (
    <Container>
      <Top>
        <Info>
          {steward ? (
            <Link href={expandRoute(['profile_id', { id: steward.externId }])}>
              <Avatar srcCfId={steward.avatarCfId} size={7.2} />
            </Link>
          ) : (
            <IconWarp>
              <Icon name={'silhouette'} size={4} />
            </IconWarp>
          )}
          <NameAndDetails>
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
          </NameAndDetails>
        </Info>

        <Body1>
          {steward
            ? steward.bio
            : 'You can apply to steward this neighborhood and help it grow'}
        </Body1>
      </Top>

      <ButtonContainer>
        <ContactButton
          onClick={
            steward
              ? () => {
                  showModal(() => (
                    <ContactModal sender={user} recipient={steward} />
                  ))
                  if (!user) return
                  analytics.contactStewardEvent(steward.externId)
                  analytics.openMessageModalButtonClick(
                    user.externId,
                    steward.externId,
                    'neighborhood-page'
                  )
                }
              : () => {
                  showModal(() => <Modal user={user} location={location} />)
                }
          }
          variant="tertiary"
        >
          {steward ? (
            <>
              <Icon name="envelope" size={1.6} />
              Contact
            </>
          ) : (
            'Learn More'
          )}
        </ContactButton>
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  gap: 1.6rem;
  justify-content: space-between;

  ${Body1} {
    opacity: 0.75;
  }
`

const Top = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  gap: 1.6rem;
`

const Info = styled.div`
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

const NameAndDetails = styled.div`
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
            href={expandRoute('nap')}
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
            `${appDomainWithProto}${expandRoute([
              'n_id',
              { id: location.externId },
            ])}\r\n` +
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
