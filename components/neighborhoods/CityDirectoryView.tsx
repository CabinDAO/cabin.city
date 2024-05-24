import { useState } from 'react'
import { useProfile } from '../auth/useProfile'
import { LocationType } from '@/utils/types/location'
import { canCreateListings } from '@/lib/permissions'
import styled from 'styled-components'
import { TitleCard } from '../core/TitleCard'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { NewListingButton } from './NewListingButton'
import { Locations } from '@/components/neighborhoods/Locations'
import { ChipFilter, ChipFilterBar } from '@/components/core/ChipFilterBar'

export const CityDirectoryView = () => {
  const { user } = useProfile()
  const [type, setType] = useState<LocationType | undefined>(undefined)

  return (
    <SingleColumnLayout>
      <TitleCard
        title="City Directory"
        icon="map-fold"
        end={canCreateListings(user) ? <NewListingButton /> : null}
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
    </SingleColumnLayout>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
