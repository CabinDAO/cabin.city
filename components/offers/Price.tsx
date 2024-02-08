import { OfferFragment, OfferPriceInterval } from '@/utils/types/offer'
import styled, { css } from 'styled-components'
import { captionStyles, h1Styles } from '@/components/core/Typography'

interface PriceProps {
  price: OfferFragment['price']
  priceInterval: OfferFragment['priceInterval']
  small?: boolean
}

export const Price = ({ price, priceInterval, small }: PriceProps) => {
  const [amount, unit] = formatOfferPrice(price, priceInterval)

  return (
    <StyledPrice small={small}>
      <Amount>{amount}</Amount>
      <Unit>{unit}</Unit>
    </StyledPrice>
  )
}

const formatOfferPrice = (
  price: OfferFragment['price'],
  priceInterval: OfferFragment['priceInterval']
): [string, string] => {
  const dollarString = `$${price}`
  switch (priceInterval) {
    case OfferPriceInterval.Hourly:
      return [dollarString, `/ hour`]
    case OfferPriceInterval.Daily:
      return [dollarString, `/ day`]
    case OfferPriceInterval.Weekly:
      return [dollarString, `/ week`]
    case OfferPriceInterval.Monthly:
      return [dollarString, `/ month`]
    case OfferPriceInterval.FlatFee:
    default:
      return [dollarString, `total cost`]
  }
}

interface StyledPriceProps {
  small?: boolean
}

const Amount = styled.span`
  ${h1Styles}
`
const Unit = styled.span`
  ${captionStyles}
`

export const StyledPrice = styled.div<StyledPriceProps>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
  gap: 0.8rem;

  ${(props) => {
    if (props.small) {
      return css`
        ${Amount} {
          font-size: 1.3rem;
        }
      `
    }
  }}
`
