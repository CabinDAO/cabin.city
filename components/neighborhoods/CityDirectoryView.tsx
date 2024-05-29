import { useState } from 'react'
import { useProfile } from '../auth/useProfile'
import { LocationType } from '@/utils/types/location'
import { canCreateListings } from '@/lib/permissions'
import styled from 'styled-components'
import { TitleCard } from '@/components/core/TitleCard'
import { BaseLayout } from '@/components/core/BaseLayout'
import { Locations } from '@/components/neighborhoods/Locations'
import { ChipFilter, ChipFilterBar } from '@/components/core/ChipFilterBar'
import Icon from '@/components/core/Icon'
import { Overline } from '@/components/core/Typography'
import { AuthenticatedLink } from '@/components/core/AuthenticatedLink'

export const CityDirectoryView = () => {
  const { user } = useProfile()
  const [type, setType] = useState<LocationType | undefined>(undefined)

  return (
    <BaseLayout>
      <TitleCard
        title="City Directory"
        icon="map-fold"
        end={
          canCreateListings(user) ? (
            <NewListingButton href="/location/new">
              <Icon name="plus" size={1} />
              <Overline>List Your Neighborhood</Overline>
            </NewListingButton>
          ) : null
        }
      />
      <Content>
        <ChipFilterBar>
          <ChipFilter
            label="All"
            selected={type === undefined}
            onClick={() => setType(undefined)}
          />
          <ChipFilter
            label="Neighborhoods"
            selected={type === LocationType.Neighborhood}
            onClick={() => setType(LocationType.Neighborhood)}
          />
          <ChipFilter
            label="Outposts"
            selected={type === LocationType.Outpost}
            onClick={() => setType(LocationType.Outpost)}
          />
        </ChipFilterBar>

        <Locations type={type} />
      </Content>
    </BaseLayout>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const NewListingButton = styled(AuthenticatedLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;

  ${Overline} {
    margin: 0;
    line-height: 1;
  }
`
