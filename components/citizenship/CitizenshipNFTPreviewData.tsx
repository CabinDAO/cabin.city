import { MONTHLY_PRICE_IN_USD } from '@/utils/citizenship'
import styled from 'styled-components'
import { useUser } from '../auth/useUser'
import { HorizontalDivider } from '../core/Divider'
import { H3, H1, Caption, H4, Body2 } from '../core/Typography'
import { NFTDataList } from './NFTDataList'

export const CitizenshipNFTPreviewData = () => {
  const { user } = useUser()

  if (!user) return null

  const vouchedBy = user?.receivedVouches?.data[0]?.voucher

  return (
    <Container>
      <H3>Details</H3>
      <PriceContainer>
        <Price>
          <H1 emphasized>${MONTHLY_PRICE_IN_USD}</H1>
          <Caption>/month</Caption>
        </Price>
        <Caption>Billed yearly</Caption>
      </PriceContainer>
      <CabinHolderDisclaimer>
        <H4>FREE</H4>
        <Body2>for holders of 1,000 ₡ABIN</Body2>
      </CabinHolderDisclaimer>

      {vouchedBy && (
        <>
          <HorizontalDivider />
          <NFTDataList
            fieldNames={['Vouched for by']}
            values={[
              {
                value: vouchedBy.name || '',
                url: `/profile/${vouchedBy._id}`,
              },
            ]}
          />
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.6rem;
  width: 100%;
`

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`

const Price = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`

const CabinHolderDisclaimer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background: ${({ theme }) => theme.colors.yellow300};
  border-radius: 1.6rem 0;
  padding: 1rem;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;
  opacity: 0.75;
`
