import { OfferPrice, OfferPriceUnit } from '@/generated/graphql'
import styled, { css } from 'styled-components'
import { captionStyles, h1Styles } from '@/components/core/Typography'

interface PriceProps {
  price: OfferPrice
  small?: boolean
}

export const Price = ({ price, small }: PriceProps) => {
  const [amount, unit] = formatOfferPrice(price)

  return (
    <StyledPrice small={small}>
      <Amount>{amount}</Amount>
      <Unit>{unit}</Unit>
    </StyledPrice>
  )
}

export const formatOfferPrice = (offerPrice: OfferPrice): [string, string] => {
  const dollarString = `$${offerPrice.amountCents / 100}`
  switch (offerPrice.unit) {
    case OfferPriceUnit.Hourly:
      return [dollarString, `/ hour`]
    case OfferPriceUnit.Daily:
      return [dollarString, `/ day`]
    case OfferPriceUnit.Weekly:
      return [dollarString, `/ week`]
    case OfferPriceUnit.Monthly:
      return [dollarString, `/ month`]
    case OfferPriceUnit.FlatFee:
    default:
      return [dollarString, `all inclusive`]
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
