import styled from 'styled-components'
import { ModalTitle } from '../core/modals/ModalTitle'
import { ModalContainer } from '../core/modals/ModalContainer'
import { Body1, Body2, H2 } from '../core/Typography'
import Icon from '@/components/core/Icon'
import { ContactUsLink } from '@/components/core/ContactUsLink'
import React from 'react'
import { Button } from '@/components/core/Button'
import { useProfile } from '@/components/auth/useProfile'
import { LocationFragment } from '@/utils/types/location'
import { appDomainWithProto } from '@/utils/display-utils'

export const StewardContactModal = ({
  location,
}: {
  location: LocationFragment
}) => {
  const { user } = useProfile()
  return (
    <CitizenshipModalContainer>
      <ModalTitle text="Stewardship" />
      <CitizenshipModalContent>
        <StyledIcon name={'key'} size={9.6} />
        <H2>Upgrade this neighborhood</H2>
        <Body2>
          The ideal Cabin neighborhood Steward has a strong desire to make
          friends with their neighbors and make neighbors out of their friends,
          plus a few hours a week to commit to this project over the next 6-12
          months.
        </Body2>
        <Body1>Tell us about your connection to this place</Body1>
        <ContactUsLink
          subject={`Steward for ${location.name}`}
          body={
            `I'd like to apply to steward ${location.name} because...%0D%0A%0D%0A` +
            `Helpful links for the Cabin team:%0D%0A` +
            `${appDomainWithProto}/location/${location.externId}%0D%0A` +
            (user ? `${appDomainWithProto}/profile/${user.externId}` : '')
          }
        >
          <Button variant="tertiary">Apply</Button>
        </ContactUsLink>
      </CitizenshipModalContent>
    </CitizenshipModalContainer>
  )
}

const CitizenshipModalContainer = styled(ModalContainer)`
  overflow-y: auto;
`

const CitizenshipModalContent = styled.div`
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
