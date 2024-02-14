import styled from 'styled-components'
import { Body2, Subline1 } from '@/components/core/Typography'
import { OfferType } from '@/utils/types/offer'

interface OfferTypeSummaryProps {
  offerType: OfferType | null | undefined
}

interface OfferTypeDescription {
  title: string
  paragraphs: string[]
}

const offerTypeDescriptionMap: Record<OfferType, OfferTypeDescription> = {
  [OfferType.PaidColiving]: {
    title: 'Colive Experience',
    paragraphs: [
      'Invite people to apply to stay at your location for short-term residence. This experience type will be only available to Cabin Citizens.',
    ],
  },
  [OfferType.Residency]: {
    title: 'Residency Experience',
    paragraphs: [
      'Support creatives by offering short-term stays where they can work uninterrupted on a personal project.',
    ],
  },
  [OfferType.CabinWeek]: {
    title: 'Cabin Week',
    paragraphs: [
      'An introduction to Cabin coliving and culture. They are how we welcome community members to Cabin and grant them citizenship.',
    ],
  },
}

export const OfferTypeSummary = ({ offerType }: OfferTypeSummaryProps) => {
  if (!offerType) {
    return null
  }

  const config = offerTypeDescriptionMap[offerType]

  return (
    <SummaryContainer>
      <Subline1>{config.title}</Subline1>
      <Description>
        {config.paragraphs.map((paragraph) => (
          <Body2 key={paragraph}>{paragraph}</Body2>
        ))}
      </Description>
    </SummaryContainer>
  )
}

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`
