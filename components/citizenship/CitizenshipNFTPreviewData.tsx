import { YEARLY_PRICE_IN_USD } from '@/utils/citizenship'
import styled from 'styled-components'
import { useUser } from '../auth/useUser'
import { HorizontalDivider } from '@/components/core/Divider'
import { H3, H1, Caption, H4, Body2 } from '@/components/core/Typography'
import { NFTDataList } from './NFTDataList'

export const CitizenshipNFTPreviewData = () => {
  const { user } = useUser()

  const vouchedBy = user?.voucher

  if (!user) return null

  return (
    <Container>
      <H3>Details</H3>
      <PriceContainer>
        <Price>
          <PriceValue>
            <H1 emphasized>${YEARLY_PRICE_IN_USD}</H1>
          </PriceValue>
          <Caption>/ year</Caption>
        </Price>
        <Caption>pay with credit card or crypto</Caption>
      </PriceContainer>
      <CabinHolderDisclaimer>
        <H4>FREE</H4>
        <Body2>for holders of 1,000 ₡ABIN</Body2>
      </CabinHolderDisclaimer>

      {vouchedBy && (
        <>
          <HorizontalDivider />
          <NFTDataList
            data={{
              'Vouched for by': {
                value: vouchedBy.name || '',
                url: `/profile/${vouchedBy.externId}`,
              },
            }}
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

const PriceValue = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
  align-items: center;
  justify-content: flex-start;
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
