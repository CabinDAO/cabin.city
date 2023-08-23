import { ModalTitle } from '@/components/core/modals/ModalTitle'
import { ModalContainer } from '@/components/core/modals/ModalContainer'
import styled from 'styled-components'
import Icon from '@/components/core/Icon'
import {
  Body1,
  Body2,
  Caption,
  H4,
  Subline1,
} from '@/components/core/Typography'
import { Button } from '@/components/core/Button'
import {
  CitizenshipStatus,
  GetProfileByIdFragment,
  useMyVouchesThisYearQuery,
  useUnvouchProfileMutation,
  useVouchProfileMutation,
} from '@/generated/graphql'
import { useState } from 'react'

interface VouchModalProps {
  profile: GetProfileByIdFragment
}

const MAX_VOUCHES_PER_YEAR = 10

export const VouchModal = ({ profile }: VouchModalProps) => {
  const { data } = useMyVouchesThisYearQuery()
  const [vouched, setVouched] = useState(false)
  const [vouchProfile] = useVouchProfileMutation({
    refetchQueries: ['MyVouchesThisYear'],
  })
  const [unvouchProfile] = useUnvouchProfileMutation({
    refetchQueries: ['MyVouchesThisYear'],
  })

  const onVouch = async () => {
    const result = await vouchProfile({
      variables: {
        id: profile._id,
      },
    })

    if (
      result.data?.vouchProfile?.citizenshipStatus === CitizenshipStatus.Vouched
    ) {
      setVouched(true)
    }
  }

  const onUnvouch = async () => {
    const result = await unvouchProfile({
      variables: {
        id: profile._id,
      },
    })
    if (
      result.data?.unvouchProfile?.citizenshipStatus ===
      CitizenshipStatus.VouchRequested
    ) {
      setVouched(false)
    }
  }

  if (!data) return null

  const vouchesRemaining = MAX_VOUCHES_PER_YEAR - data.myVouchesThisYear

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
        <VouchLimitContainer>
          <div>
            <Subline1>Vouches remaining</Subline1>
            <Caption>Replenishes annually</Caption>
          </div>
          <div>
            <Body1>{`${vouchesRemaining}/${MAX_VOUCHES_PER_YEAR}`}</Body1>
          </div>
        </VouchLimitContainer>
        {vouched ? (
          <VouchButton
            startAdornment={<Icon name="check" size={1.7} />}
            onClick={onUnvouch}
            variant="tertiary"
          >
            Vouched for
          </VouchButton>
        ) : (
          <VouchButton
            variant="primary"
            onClick={onVouch}
            disabled={vouchesRemaining <= 0}
          >
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

const VouchLimitContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  padding: 1.6rem;
`
