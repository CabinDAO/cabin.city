import styled from 'styled-components'
import { ModalTitle } from '../core/modals/ModalTitle'
import { ModalContainer } from '../core/modals/ModalContainer'
import { Body1, Body2, H2 } from '../core/Typography'
import Icon from '@/components/core/Icon'

export const CaretakerContactModal = () => {
  return (
    <CitizenshipModalContainer>
      <ModalTitle text="Citizenship" />
      <CitizenshipModalContent>
        <StyledIcon name={'check-decagram'} size={9.6} />
        <H2>Unlock Citizenship to connect with Caretakers</H2>
        <Body2>
          Cabin’s annual membership that gives you access to our community’s
          global adventures.
        </Body2>
        <Body1>
          Visit the <strong>Citizenship section</strong> on your{' '}
          <strong>profile</strong> to get started
        </Body1>
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
