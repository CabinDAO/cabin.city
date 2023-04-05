import { useUser } from '../auth/useUser'
import { TitleCard } from '../core/TitleCard'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { EmptyState } from '../core/EmptyState'

export const NeighborhoodsView = () => {
  const { user } = useUser({ redirectTo: '/login' })

  if (!user) return null

  return (
    <SingleColumnLayout>
      <TitleCard title="City Directory" icon="neighborhoods"></TitleCard>
      <EmptyState
        icon="neighborhoods"
        title="Directory coming"
        description="You’ll be able to browse neighborhoods in the Cabin network here."
        href="https://cabin.city"
      />
    </SingleColumnLayout>
  )
}
