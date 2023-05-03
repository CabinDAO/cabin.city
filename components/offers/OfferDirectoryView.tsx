import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { TitleCard } from '../core/TitleCard'
import { useMemo, useState } from 'react'
import { useDeviceSize } from '../hooks/useDeviceSize'
import { allOfferInfos, offerListItemPropsFromFragment } from '@/utils/offer'
import {
  OfferItemFragment,
  OfferType,
  useGetOffersCountQuery,
  useGetOffersQuery,
} from '@/generated/graphql'
import { Button } from '../core/Button'
import { NoWrap } from '../core/NoWrap'
import { Filter, FilterContainer, FilterGroup } from '../core/Filter'
import { ChevronButton } from '../core/ChevronButton'
import { FilterCount } from '../core/FilterCount'
import Icon from '../core/Icon'
import { List } from '../core/List'
import InfiniteScroll from 'react-infinite-scroll-component'
import { OfferListItem } from '../core/OfferListItem'
import { useUser } from '../auth/useUser'

export const OfferDirectoryView = () => {
  const [open, setOpen] = useState(false)
  const [offerTypes, setOfferTypes] = useState<OfferType[]>([])
  const { deviceSize } = useDeviceSize()
  const { user } = useUser()
  const input = useMemo(() => {
    // Zero selected means all are selected
    return {
      offerTypes: offerTypes.length > 0 ? offerTypes : Object.values(OfferType),
    }
  }, [offerTypes])
  const { data, fetchMore } = useGetOffersQuery({
    variables: {
      input,
    },
  })

  const { data: offersCountData } = useGetOffersCountQuery({
    variables: {
      input,
    },
  })

  const offers = useMemo(
    () => data?.getOffers.data.filter((o): o is OfferItemFragment => !!o) ?? [],
    [data]
  )
  const hasMore = !!data?.getOffers?.after
  const dataLength = offers.length

  const filterCount = useMemo(() => offerTypes.length, [offerTypes])

  const displayFilters = deviceSize === 'desktop' || open

  const offerOptions = allOfferInfos.map((offerInfo) => ({
    label: offerInfo.name,
    value: offerInfo.offerType,
  }))

  const handleSelectedOfferTypes = (selectedOfferTypes: OfferType[]) => {
    setOfferTypes(selectedOfferTypes)
  }

  const handleClearFilters = () => {
    setOfferTypes([])
  }

  return (
    <SingleColumnLayout>
      <TitleCard icon="offer" title="Offers" />
      <FilterContainer>
        {deviceSize !== 'desktop' && (
          <Button
            variant="tertiary"
            isActive={filterCount > 0 || open}
            onClick={() => setOpen(!open)}
            endAdornment={
              <ChevronButton role="button" open={filterCount === 0 && open}>
                {filterCount > 0 ? (
                  <FilterCount count={filterCount} />
                ) : (
                  <Icon name="chevron-down" size={1.4} />
                )}
              </ChevronButton>
            }
          >
            Filters
          </Button>
        )}
        {displayFilters && (
          <FilterGroup>
            <Filter
              label="Type"
              options={offerOptions}
              selections={offerTypes}
              onApply={handleSelectedOfferTypes}
            />
            <Button variant="link" onClick={handleClearFilters}>
              <NoWrap>Clear all</NoWrap>
            </Button>
          </FilterGroup>
        )}
      </FilterContainer>
      <List total={offersCountData?.offersCount}>
        <InfiniteScroll
          hasMore={!!hasMore}
          dataLength={dataLength}
          next={() => {
            return fetchMore({
              variables: {
                cursor: data?.getOffers?.after,
              },
            })
          }}
          loader="..."
        >
          {offers.length === 0 && data && offersCountData ? (
            <div>TODO: Empty state</div>
          ) : (
            offers.map((offer) => {
              const offerProps = offerListItemPropsFromFragment(offer, user)
              return <OfferListItem key={offer._id} {...offerProps} />
            })
          )}
        </InfiniteScroll>
      </List>
    </SingleColumnLayout>
  )
}
