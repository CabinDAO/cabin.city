import styled from 'styled-components'
import { Body2, Caption } from '../core/Typography'

const OFFER_TYPE_EXPLANATIONS = [
  {
    title: 'Colive',
    description:
      'Let Cabin Citizens can apply to colive at your property for a rate you set.',
  },
  {
    title: 'Residency',
    description:
      'Support creators to work on a personal project for a window of time.',
  },
  {
    title: 'Build Week',
    subtitle: '(Neighborhoods only)',
    description:
      'Provide housing to members working on your property initiatives.',
  },
]

export const OfferTypesDescriptionList = () => {
  return (
    <OfferTypeExplanationGroup>
      {OFFER_TYPE_EXPLANATIONS.map((offerType) => (
        <OfferTypeDescription key={offerType.title}>
          <Title>
            <Caption emphasized>{offerType.title}</Caption>
            {offerType.subtitle && <Caption>{offerType.subtitle}</Caption>}
          </Title>
          <Body2>{offerType.description}</Body2>
        </OfferTypeDescription>
      ))}
    </OfferTypeExplanationGroup>
  )
}

const OfferTypeExplanationGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
  }
`

const OfferTypeDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

const Title = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  justify-content: flex-start;
  align-items: center;
`
