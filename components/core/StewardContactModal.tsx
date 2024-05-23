import React from 'react'
import { useProfile } from '@/components/auth/useProfile'
import { LocationFragment } from '@/utils/types/location'
import { appDomainWithProto } from '@/utils/display-utils'
import styled from 'styled-components'
import { Body2, H2 } from '../core/Typography'
import Icon from '@/components/core/Icon'
import { Button } from '@/components/core/Button'
import { ModalTitle } from '../core/modals/ModalTitle'
import { ModalContainer } from '../core/modals/ModalContainer'
import { ContactUsLink } from '@/components/core/ContactUsLink'

export const StewardContactModal = ({
  location,
}: {
  location: LocationFragment
}) => {
  const { user } = useProfile()
  return (
    <Container>
      <ModalTitle text="Stewardship" />
      <Content>
        <StyledIcon name={'neighborhood'} size={9.6} />
        <H2>Activate this neighborhood</H2>
        <Body2>
          The ideal Cabin neighborhood Steward has a strong desire to make
          friends with their neighbors and make neighbors out of their friends,
          plus a few hours a week to commit to this project over the next 6-12
          months.
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
      </Content>
    </Container>
  )
}

const Container = styled(ModalContainer)`
  overflow-y: auto;
`

const Content = styled.div`
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
