import styled from 'styled-components'
import { CartFragment } from '@/generated/graphql'
import { daysBetween } from '@/utils/display-utils'
import { useModal } from '@/components/hooks/useModal'
import { Caption, H4 } from '@/components/core/Typography'
import Icon from '@/components/core/Icon'
import { HorizontalDivider } from '@/components/core/Divider'
import { MEMBERSHIP_PRICE_DOLLARS } from '@/components/checkout/constants'
import { CitizenshipModal } from '@/components/landing/CitizenshipModal'
import { OfferViewProps } from '@/components/offers/useGetOffer'

export const CostBreakdown = ({
  lodgingType,
  startDate,
  endDate,
}: {
  lodgingType:
    | CartFragment['lodgingType']
    | OfferViewProps['location']['lodgingTypes']['data'][0]
  startDate: Date | null
  endDate: Date | null
}) => {
  const { showModal } = useModal()

  const handleCitizenshipInfoClick = () => {
    showModal(() => <CitizenshipModal />)
  }

  return (
    <Summary>
      <Row>
        <Caption emphasized>
          {daysBetween(startDate, endDate)} nights ({lodgingType.description})
        </Caption>
        <Caption emphasized>${(lodgingType.priceCents ?? 0) / 100}</Caption>
      </Row>
      <Row>
        <Caption emphasized>
          1yr Cabin Citizenship{' '}
          <a onClick={handleCitizenshipInfoClick} style={{ cursor: 'pointer' }}>
            <Icon name={'info'} size={1.2} inline />
          </a>
        </Caption>
        <Caption emphasized>${MEMBERSHIP_PRICE_DOLLARS}</Caption>
      </Row>
      <Row>
        <Caption emphasized>Cabin Week Discount</Caption>
        <Caption emphasized $color={'green700'}>
          -${MEMBERSHIP_PRICE_DOLLARS}
        </Caption>
      </Row>
      <HorizontalDivider />
      <Row>
        <H4>Total</H4>
        <H4>${(lodgingType.priceCents ?? 0) / 100}</H4>
      </Row>
    </Summary>
  )
}

const Summary = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 2.4rem;
`

const Row = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
