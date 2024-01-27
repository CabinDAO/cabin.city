import { TwoColumnLayout } from '../layouts/TwoColumnLayout'
import { DataContainer } from '../core/DataContainer'
import { ActivityList } from './ActivityList'
import styled from 'styled-components'
import { TextPost } from './TextPost'
import { useTextActivity } from './useTextActivity'
import { useProfile } from '../auth/useProfile'
import { useBackend } from '@/components/hooks/useBackend'
import { ActivitySummaryResponse } from '@/pages/api/v2/activity/summary'

export const DashboardView = () => {
  const { user } = useProfile({ redirectTo: '/logout' })

  const { useGet } = useBackend()
  const { data } = useGet<ActivitySummaryResponse>('ACTIVITY_SUMMARY')

  const { handleCreateTextActivity } = useTextActivity()

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

  const handleOnPost = (text: string) => {
    handleCreateTextActivity(text)
  }

  if (!user) return null

  return (
    <TwoColumnLayout withFooter title="Cabin Activity">
      <ActivitiesContainer>
        <TextPost onPost={handleOnPost} />
        <ActivityList />
      </ActivitiesContainer>
      <DataContainer title="Dashboard" items={dashboardItems} />
    </TwoColumnLayout>
  )
}

const ActivitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
  justify-content: center;
  width: 100%;
`
