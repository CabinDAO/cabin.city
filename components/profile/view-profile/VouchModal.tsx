import { useState } from 'react'
import { useBackend } from '@/components/hooks/useBackend'
import {
  CitizenshipStatus,
  ProfileFragment,
  ProfileVouchParams,
  ProfileVouchResponse,
} from '@/utils/types/profile'
import styled from 'styled-components'
import { ModalTitle } from '@/components/core/modals/ModalTitle'
import { ModalContainer } from '@/components/core/modals/ModalContainer'
import Icon from '@/components/core/Icon'
import { Body2, H4 } from '@/components/core/Typography'
import { Button } from '@/components/core/Button'

interface VouchModalProps {
  profile: ProfileFragment
  refetchProfile: VoidFunction
}

export const VouchModal = ({ profile, refetchProfile }: VouchModalProps) => {
  const [vouched, setVouched] = useState(false)
  const { post } = useBackend()

  const onVouch = async () => {
    const result = await post<ProfileVouchResponse>('api_profile_vouch', {
      externId: profile.externId,
      action: 'vouch',
    } satisfies ProfileVouchParams)

    const newStatus = !result || 'error' in result ? null : result.newStatus
    if (newStatus === CitizenshipStatus.Vouched) {
      setVouched(true)
      refetchProfile()
    }
  }

  const onUnvouch = async () => {
    const result = await post<ProfileVouchResponse>('api_profile_vouch', {
      externId: profile.externId,
      action: 'unvouch',
    } satisfies ProfileVouchParams)

    const newStatus = !result || 'error' in result ? null : result.newStatus
    if (newStatus === CitizenshipStatus.VouchRequested) {
      setVouched(false)
      refetchProfile()
    }
  }

  return (
    <VouchModalContainer>
      <ModalTitle text="Vouch" />
      <VouchModalContent>
        <Circle>
          <Icon name="thumb-up" size={4.4} color="yellow600" />
        </Circle>
        <DescriptionContainer>
          <H4>Vouch for Cabin members to</H4>
          <H4>become citizens</H4>
          <Body2>
            When you vouch for a member, you unlock the ability for them to mint
            a Citizenship NFT and become a verified citizen of Cabin.
          </Body2>
        </DescriptionContainer>
        {vouched ? (
          <VouchButton
            startAdornment={<Icon name="check" size={1.7} />}
            onClick={onUnvouch}
            variant="tertiary"
          >
            Vouched for
          </VouchButton>
        ) : (
          <VouchButton variant="primary" onClick={onVouch}>
            Send vouch
          </VouchButton>
        )}
      </VouchModalContent>
    </VouchModalContainer>
  )
}

const VouchModalContainer = styled(ModalContainer)`
  height: min-content;
  max-height: 100%;
`

const VouchButton = styled(Button)`
  width: 100%;
`

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  max-width: 95%;
  text-align: center;
`

const VouchModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  gap: 2.4rem;

  button {
    margin-top: 1.6rem;
  }
`

const Circle = styled.div`
  width: 9.6rem;
  height: 9.6rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.yellow300};
  display: flex;
  justify-content: center;
  align-items: center;
`
