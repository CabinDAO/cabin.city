import { CitizenshipStatus, LocationType, OfferType } from '@/generated/graphql'
import { TitleCard } from '../core/TitleCard'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { useRouter } from 'next/router'
import { useProfile } from '../auth/useProfile'
import { NewListingButton } from './NewListingButton'
import { LocationListFilter } from './LocationListFilter'
import { ChipFilterBar, ChipFilter } from '../core/ChipFilterBar'
import styled from 'styled-components'

interface CityDirectoryViewProps {
  locationType?: LocationType
  offerType?: OfferType
}
export const CityDirectoryView = (props: CityDirectoryViewProps) => {
  const { locationType, offerType } = props
  const { user } = useProfile()
  const router = useRouter()
  const canCreateListings =
    user?.citizenshipStatus === CitizenshipStatus.Verified

  return (
    <SingleColumnLayout>
      <TitleCard
        title="City Directory"
        icon="neighborhoods"
        end={canCreateListings ? <NewListingButton /> : null}
      ></TitleCard>
      <Content>
        <StyledChipFilterBar>
          <ChipFilter
            label="All"
            selected={!locationType && !offerType}
            onClick={() => router.push('/city-directory')}
          />
          <ChipFilter
            label="Neighborhoods"
            selected={locationType === LocationType.Neighborhood}
            onClick={() => router.push('/city-directory/neighborhoods')}
          />
          <ChipFilter
            label="Outposts"
            selected={locationType === LocationType.Outpost}
            onClick={() => router.push('/city-directory/outposts')}
          />
          <ChipFilter
            label="Cabin Week"
            selected={offerType === OfferType.CabinWeek}
            onClick={() => router.push('/city-directory/cabin-week')}
          />
          <ChipFilter
            label="Coliving"
            selected={offerType === OfferType.PaidColiving}
            onClick={() => router.push('/city-directory/coliving')}
          />
          <ChipFilter
            label="Residencies"
            selected={offerType === OfferType.Residency}
            onClick={() => router.push('/city-directory/residency')}
          />
        </StyledChipFilterBar>
        <LocationListFilter locationType={locationType} offerType={offerType} />
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

const StyledChipFilterBar = styled(ChipFilterBar)`
  display: flex;
  border-bottom: none;
`
