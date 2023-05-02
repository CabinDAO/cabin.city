import styled from 'styled-components'
import { ContentCard } from '../core/ContentCard'
import { TitleCard } from '../core/TitleCard'
import { OfferViewProps } from './useGetOffer'
import { OfferTypeSummary } from './edit-offer/OfferTypeSummary'
import { EditOfferForm } from './edit-offer/EditOfferForm'

export const EditOfferView = ({ offer }: { offer: OfferViewProps }) => {
  return (
    <>
      <TitleCard title="Edit Offer" icon="close" iconHref="/" />
      <StyledContentCard shape="notch">
        <OfferSummaryContainer>
          <OfferTypeSummary offerType={offer.offerType} />
        </OfferSummaryContainer>
        <EditOfferForm offer={offer.rawFragment} />
      </StyledContentCard>
    </>
  )
}

const StyledContentCard = styled(ContentCard)`
  padding: 3.2rem 2.4rem;
  gap: 2.4rem;
  flex-direction: column;
  margin-bottom: 4.8rem;
`

const OfferSummaryContainer = styled.div`
  width: 50%;
`
