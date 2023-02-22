import { TwoColumnLayout } from '../layouts/TwoColumnLayout'
import { DataContainer } from '../core/DataContainer'
import { ActivityList } from './ActivityList'

export const DashboardView = () => {
  const dashboardItems = [
    {
      name: 'Members',
      value: 18000,
    },
    {
      name: 'Token Holders',
      value: 10040,
    },
    {
      name: 'Citizens',
      value: 2700,
    },
  ]

  return (
    <TwoColumnLayout title="Cabin Activity">
      <ActivityList />
      <DataContainer title="Dashboard" items={dashboardItems} />
    </TwoColumnLayout>
  )
}
