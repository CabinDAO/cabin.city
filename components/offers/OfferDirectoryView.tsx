import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { TitleCard } from '../core/TitleCard'
import { useMemo, useState } from 'react'
import { useDeviceSize } from '../hooks/useDeviceSize'
import { allOfferInfos, offerListItemPropsFromFragment } from '@/utils/offer'
import {
  OfferItemFragment,
  OfferType,
  ProfileRoleLevelType,
  ProfileRoleType,
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
import { NestedFilter, SelectedOptionValues } from '../core/NestedFilter'
import { allLevels } from '@/utils/levels'
import { allRoles } from '@/utils/roles'
import { ListEmptyState } from '../core/ListEmptyState'

export const OfferDirectoryView = () => {
  const [open, setOpen] = useState(false)
  const [offerTypes, setOfferTypes] = useState<OfferType[]>([])
  const [roleLevels, setRoleLevels] = useState<
    SelectedOptionValues<ProfileRoleType, ProfileRoleLevelType>
  >({} as SelectedOptionValues<ProfileRoleType, ProfileRoleLevelType>)
  const { deviceSize } = useDeviceSize()
  const { user } = useUser()
  const input = useMemo(() => {
    const profileRoleConstraints = Object.keys(roleLevels)
      .map((roleTypeStr) => {
        const roleType = roleTypeStr as ProfileRoleType
        const levels = roleLevels[roleType]
        return levels.map((levelType) => ({
          profileRole: roleType,
          level: levelType,
        }))
      })
      .flat()

    return {
      offerTypes,
      profileRoleConstraints,
    }
  }, [offerTypes, roleLevels])
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

  const roleLevelOptions = allRoles.map((role) => {
    return {
      label: role.name,
      value: role.roleType,
      options: allLevels.map((level) => {
        return {
          label: level.name,
          value: level.levelType,
        }
      }),
    }
  })

  const handleSelectedOfferTypes = (selectedOfferTypes: OfferType[]) => {
    setOfferTypes(selectedOfferTypes)
  }

  const handleSelectedRoleLevels = (
    selections: SelectedOptionValues<ProfileRoleType, ProfileRoleLevelType>
  ) => {
    setRoleLevels(selections)
  }

  const handleClearFilters = () => {
    setOfferTypes([])
    setRoleLevels(
      {} as SelectedOptionValues<ProfileRoleType, ProfileRoleLevelType>
    )
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
            <NestedFilter
              label="Role"
              options={roleLevelOptions}
              selections={roleLevels}
              onApply={handleSelectedRoleLevels}
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
          style={{ overflowX: 'hidden', overflowY: 'hidden' }}
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
            <ListEmptyState iconName="offer" />
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
