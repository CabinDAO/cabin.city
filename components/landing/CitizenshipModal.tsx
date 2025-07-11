import styled from 'styled-components'
import { ModalTitle } from '@/components/core/modals/ModalTitle'
import { ModalContainer } from '@/components/core/modals/ModalContainer'
import { Body2, H4 } from '@/components/core/Typography'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import Icon from '@/components/core/Icon'
import Link from 'next/link'

export const CitizenshipModal = () => {
  return (
    <CitizenshipModalContainer>
      <ModalTitle text="Citizenship" />
      <CitizenshipModalContent>
        <StyledIcon name={'check-decagram'} size={9.6} />
        <Body2>
          Cabin Citizenship is an annual subscription membership for remote
          workers who love nature. Citizens are issued digital and physical
          passports that give them access to our community’s global adventures.
        </Body2>
        <H4>2 ways to unlock Citizenship</H4>
        <Body2>
          1. You earn Citizenship for free by attending a Cabin Week at a
          neighborhood.
        </Body2>
        <Body2>
          2. You can buy Citizenship IF an existing Citizen has vouched for you.
        </Body2>
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

  ${Body2}:first-of-type {
    text-align: center;
  }
  ${Body2}:last-of-type {
    width: 100%;
    text-align: left;
  }
`

const StyledLink = styled(Link)`
  text-decoration: underline;
`

const StyledIcon = styled(Icon)`
  padding: 2.4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.yellow300};
`
