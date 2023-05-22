import { TwoColumnLayout } from '../layouts/TwoColumnLayout'
import { DataContainer } from '../core/DataContainer'
import { ActivityList } from './ActivityList'
import { useGetActivitySummaryQuery } from '@/generated/graphql'
import { useUser } from '../auth/useUser'
import styled from 'styled-components'
import { TextPost } from './TextPost'
import { useTextActivity } from './useTextActivity'
import { useEffect } from 'react'

export const DashboardView = () => {
  const { user } = useUser({ redirectTo: '/' })
  const { data, refetch } = useGetActivitySummaryQuery()
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

  useEffect(() => {
    refetch()
  }, [refetch])

  if (!user) return null

  return (
    <TwoColumnLayout title="Cabin Activity">
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
