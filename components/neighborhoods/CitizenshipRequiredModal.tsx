import React from 'react'
import Link from 'next/link'
import { useModal } from '@/components/hooks/useModal'
import { expandRoute } from '@/utils/routing'
import styled from 'styled-components'
import { Body2, H2 } from '@/components/core/Typography'
import { ModalTitle } from '@/components/core/modals/ModalTitle'
import { ModalContainer } from '@/components/core/modals/ModalContainer'
import Icon from '@/components/core/Icon'
import { Button } from '@/components/core/Button'

export const CitizenshipRequiredModal = () => {
  const { hideModal } = useModal()
  return (
    <Container>
      <ModalTitle text="Citizenship" />
      <Content>
        <StyledIcon name={'check-decagram'} size={9.6} />
        <H2>Unlock Citizenship to connect with Stewards</H2>
        <Body2>
          Cabin’s annual membership that gives you access to our community’s
          global adventures.
        </Body2>
        <StyledLink href={expandRoute('citizenship')} onClick={hideModal}>
          <StyledButton isFullWidth variant={'tertiary'}>
            Join Now
          </StyledButton>
        </StyledLink>
      </Content>
    </Container>
  )
}

const Container = styled(ModalContainer)`
  height: auto;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.4rem;
  gap: 2.4rem;
  width: 100%;

  ${H2} {
    text-align: center;
  }

  ${Body2} {
    text-align: center;
  }
`

const StyledLink = styled(Link)`
  width: 100%;
`

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.yellow100} !important;
`

const StyledIcon = styled(Icon)`
  padding: 2.4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.yellow300};
`
