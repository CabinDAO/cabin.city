import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { TitleCard } from '../core/TitleCard'
import { OfferType } from '@/generated/graphql'
import { useRouter } from 'next/router'
import { TabBar, Tab } from '../core/TabBar'
import { OfferTabList } from './OfferTabList'

const SlugOfferTypeMap: Record<string, OfferType> = {
  coliving: OfferType.PaidColiving,
  residency: OfferType.Residency,
  'build-week': OfferType.BuildAndGrowWeek,
}

export const OfferDirectoryView = () => {
  const router = useRouter()
  const { offerTypeSlug } = router.query
  const offerType =
    SlugOfferTypeMap[offerTypeSlug as string] ?? OfferType.PaidColiving

  return (
    <SingleColumnLayout>
      <TitleCard icon="offer" title="Offers" />
      <TabBar>
        <Tab
          isSelected={offerType === OfferType.PaidColiving}
          onClick={() => router.push('/offers/coliving')}
        >
          Colive
        </Tab>
        <Tab
          isSelected={offerType === OfferType.Residency}
          onClick={() => router.push('/offers/residency')}
        >
          Residency
        </Tab>
        <Tab
          isSelected={offerType === OfferType.BuildAndGrowWeek}
          onClick={() => router.push('/offers/build-week')}
        >
          Build Week
        </Tab>
      </TabBar>
      <OfferTabList offerType={offerType} />
    </SingleColumnLayout>
  )
}
