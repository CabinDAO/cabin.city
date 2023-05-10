import styled from 'styled-components'
import { OfferType } from '@/generated/graphql'
import { Body2, H3 } from '@/components/core/Typography'

interface OfferTypeSummaryProps {
  offerType: OfferType | null | undefined
}

interface OfferTypeDescription {
  title: string
  paragraphs: string[]
}

const offerTypeDescriptionMap: Record<OfferType, OfferTypeDescription> = {
  [OfferType.PaidColiving]: {
    title: 'Colive Offer',
    paragraphs: [
      'Invite people to apply to stay at your location for short-term residence. This offer type will be only available to Cabin Citizens.',
      'Use the form below to specify your available date range, rate, and add a description that highlights the perks of coliving from your location.',
    ],
  },
  [OfferType.Residency]: {
    title: 'Residency Offer',
    paragraphs: [
      'Support creatives by offering short-term stays where they can work uninterrupted on a personal project.',
      'Use the form below to specify your available date range, eligibility constraints, and add a description that informs and encourages people to apply.',
    ],
  },
  [OfferType.BuildAndGrowWeek]: {
    title: 'Build Week Offer',
    paragraphs: [
      'Plan and build out your property with the help of the community. These can be short-term project initiatives on location for community members to participate in for free room and board.',
      'Use the form below to specify your available date range, eligibility constraints, and add a description that informs and encourages people to apply.',
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
      <H3>{config.title}</H3>
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
  gap: 1.6rem;
`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`
