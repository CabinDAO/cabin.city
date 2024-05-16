import styled from 'styled-components'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { TitleCard } from '../core/TitleCard'
import { useRouter } from 'next/router'
import { OfferTabList } from './OfferTabList'
import { ChipFilter, ChipFilterBar } from '../core/ChipFilterBar'
import { OfferType } from '@/utils/types/offer'

const SlugOfferTypeMap: Record<string, OfferType> = {
  coliving: OfferType.PaidColiving,
  'cabin-week': OfferType.CabinWeek,
}

export const OfferDirectoryView = () => {
  const router = useRouter()
  const { offerTypeSlug } = router.query
  const offerType = SlugOfferTypeMap[offerTypeSlug as string] || null

  return (
    <SingleColumnLayout>
      <TitleCard icon="offer" title="Events" />
      <Content>
        <ChipFilterBar>
          <ChipFilter
            label="All"
            selected={!offerType}
            onClick={() => router.push('/experiences')}
          />
          <ChipFilter
            label="Cabin Week"
            selected={offerType === OfferType.CabinWeek}
            onClick={() => router.push('/experiences/cabin-week')}
          />
          <ChipFilter
            label="Coliving"
            selected={offerType === OfferType.PaidColiving}
            onClick={() => router.push('/experiences/coliving')}
          />
        </ChipFilterBar>
        <OfferTabList offerType={offerType} />
      </Content>
    </SingleColumnLayout>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`
