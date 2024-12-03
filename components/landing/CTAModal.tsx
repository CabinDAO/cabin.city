import React, { useEffect } from 'react'
import { useModal } from '@/components/hooks/useModal'
import { useLocalStorage, useWindowScroll } from 'react-use'
import { useUser } from '@/components/auth/useUser'
import styled from 'styled-components'
import { ModalContainer } from '@/components/core/modals/ModalContainer'
import { ModalTitle } from '@/components/core/modals/ModalTitle'
import { Body1 } from '@/components/core/Typography'
import { SubscribeForm } from '@/components/landing/SubscribeForm'

export const CTAModal = () => {
  const { user } = useUser()
  const { showModal } = useModal()
  const { y } = useWindowScroll()
  const [popupLastShownAt, setPopupLastShownAt] = useLocalStorage<number>(
    'landingPopupLastShownAt'
  )

  useEffect(() => {
    if (
      // !user &&
      y > 4500 &&
      (!popupLastShownAt || Date.now() - popupLastShownAt > 1000 * 60 * 60 * 24)
    ) {
      setPopupLastShownAt(Date.now())
      showModal(() => <Modal />)
    }
  }, [y, user, popupLastShownAt, setPopupLastShownAt, showModal])

  return null
}

const Modal = () => {
  return (
    <StyledModalContainer>
      <ModalTitle text={'Get Our Updates'} />
      <ModalContent>
        <Body1>We'll help you turn your neighborhood into a community.</Body1>
        <SubscribeForm />
      </ModalContent>
    </StyledModalContainer>
  )
}

const StyledModalContainer = styled(ModalContainer)`
  height: min-content;

  ${({ theme }) => theme.bp.md} {
    width: 55rem;
  }
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  padding-bottom: 3.2rem;
  gap: 3.2rem;
  text-align: center;
`
