import { useUser } from '../auth/useUser'
import { canCreateListings } from '@/lib/permissions'
import styled from 'styled-components'
import { TitleCard } from '@/components/core/TitleCard'
import { BaseLayout } from '@/components/core/BaseLayout'
import { LocationList } from '@/components/neighborhoods/LocationList'
import Icon from '@/components/core/Icon'
import { Overline } from '@/components/core/Typography'
import { AuthenticatedLink } from '@/components/core/AuthenticatedLink'
import { expandRoute } from '@/utils/routing'

export const CityDirectoryView = () => {
  const { user } = useUser()

  return (
    <BaseLayout>
      <TitleCard
        title="City Directory"
        icon="map-fold"
        end={
          canCreateListings(user) ? (
            <NewListingButton href={expandRoute('n_new')}>
              <Icon name="plus" size={1} />
              <Overline>List Your Neighborhood</Overline>
            </NewListingButton>
          ) : null
        }
      />
      <LocationList />
    </BaseLayout>
  )
}

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
