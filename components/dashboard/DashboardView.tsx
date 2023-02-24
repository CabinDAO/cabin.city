import { TwoColumnLayout } from '../layouts/TwoColumnLayout'
import { DataContainer } from '../core/DataContainer'
import { ActivityList } from './ActivityList'
import { useGetActivitySummaryQuery } from '@/generated/graphql'

export const DashboardView = () => {
  const { data } = useGetActivitySummaryQuery()

  const dashboardItems = [
    {
      name: 'Members',
      value: data?.profilesCount ?? 0,
    },
    {
      name: 'Token Holders',
      value: data?.tokenHoldersCount ?? 0,
    },
    {
      name: 'Citizens',
      value: data?.citizensCount ?? 0,
    },
  ]

  return (
    <TwoColumnLayout title="Cabin Activity">
      <ActivityList />
      <DataContainer title="Dashboard" items={dashboardItems} />
    </TwoColumnLayout>
  )
}
