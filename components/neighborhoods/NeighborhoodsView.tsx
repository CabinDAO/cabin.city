import { TitleCard } from '../core/TitleCard'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { ProfileEmptyStateSection } from '../profile/view-profile/ProfileEmptyStateSection'

export const NeighborhoodsView = () => {
  return (
    <SingleColumnLayout>
      <TitleCard title="City Directory" icon="neighborhoods"></TitleCard>
      <ProfileEmptyStateSection
        icon="neighborhoods"
        title="Directory coming"
        description="You’ll be able to browse neighborhoods in the Cabin network here."
        href="https://cabin.city"
      />
    </SingleColumnLayout>
  )
}
