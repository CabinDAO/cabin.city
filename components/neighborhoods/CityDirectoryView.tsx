import { CitizenshipStatus, LocationType } from '@/generated/graphql'
import { TitleCard } from '../core/TitleCard'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { Tab, TabBar } from '../core/TabBar'
import { useRouter } from 'next/router'
import { Button } from '../core/Button'
import { useUser } from '../auth/useUser'
import Link from 'next/link'
import { LocationList } from './LocationList'

interface CityDirectoryViewProps {
  locationType: LocationType
}
export const CityDirectoryView = (props: CityDirectoryViewProps) => {
  const { locationType } = props
  const { user } = useUser()
  const router = useRouter()

  return (
    <SingleColumnLayout>
      <TitleCard
        title="City Directory"
        icon="neighborhoods"
        end={
          user?.citizenshipStatus === CitizenshipStatus.Verified ? (
            <Link href="/location/new">
              <Button variant="link">+ New Listing</Button>
            </Link>
          ) : null
        }
      ></TitleCard>
      <TabBar>
        <Tab
          isSelected={locationType === LocationType.Neighborhood}
          onClick={() => router.push('/city-directory/neighborhoods')}
        >
          Neighborhoods
        </Tab>
        <Tab
          isSelected={locationType === LocationType.Outpost}
          onClick={() => router.push('/city-directory/outposts')}
        >
          Outposts
        </Tab>
      </TabBar>
      <LocationList locationType={locationType} />
    </SingleColumnLayout>
  )
}
