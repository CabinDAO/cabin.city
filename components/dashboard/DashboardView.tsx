import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useProfile } from '../auth/useProfile'
import { useBackend } from '@/components/hooks/useBackend'
import { PAGE_SIZE } from '@/utils/api/backend'
import {
  ActivityListFragment,
  ActivityListResponse,
  ActivitySummaryResponse,
} from '@/utils/types/activity'
import { useActivityReactions } from '@/components/dashboard/useActivityReactions'
import { useTextActivity } from './useTextActivity'
import styled from 'styled-components'
import { TwoColumnLayout } from '../layouts/TwoColumnLayout'
import { DataContainer } from '../core/DataContainer'
import { TextPost } from './TextPost'
import { ContentCard } from '@/components/core/ContentCard'
import { Post } from '@/components/core/post/Post'

export const DashboardView = () => {
  const { useGet } = useBackend()

  const { user } = useProfile({ redirectTo: '/logout' })

  const { data: summaryData } =
    useGet<ActivitySummaryResponse>('ACTIVITY_SUMMARY')

  const [activities, setActivities] = useState<ActivityListFragment[]>([])
  const [page, setPage] = useState(1)

  const { data, mutate: refetchActivities } = useGet<ActivityListResponse>(
    'ACTIVITY_LIST',
    { page }
  )
  const hasMore = data ? (data.count ?? 0) > PAGE_SIZE * (page + 1) : false

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setActivities(data.activities ?? [])
      } else {
        setActivities([...activities, ...(data.activities ?? [])])
      }
    }
  }, [data])

  const { handleCreateTextActivity } = useTextActivity(refetchActivities)
  const { handleLikeActivity, handleUnlikeActivity } = useActivityReactions()

  const baseDate = new Date()

  const dashboardItems = [
    {
      name: 'Members',
      value: summaryData?.profilesCount ?? 0,
    },
    {
      name: 'Token Holders',
      value: summaryData?.tokenHoldersCount ?? 0,
    },
    {
      name: 'Citizens',
      value: summaryData?.citizensCount ?? 0,
    },
  ]

  const handleOnPost = (text: string) => {
    handleCreateTextActivity(text).then()
  }

  if (!user) return null

  return (
    <TwoColumnLayout withFooter title="Cabin Activity">
      <ActivitiesContainer>
        <TextPost onPost={handleOnPost} />
        <ContentCard shape="notch">
          <InnerContainer>
            <InfiniteScroll
              hasMore={!!hasMore}
              style={{ overflowX: 'hidden' }}
              dataLength={activities.length}
              next={() => {
                setPage(page + 1)
              }}
              loader="..."
            >
              {activities?.map((activity) => (
                <Post
                  key={activity.externId}
                  activity={activity}
                  baseDate={baseDate}
                  onLike={() => handleLikeActivity(activity)}
                  onUnlike={() => handleUnlikeActivity(activity)}
                  onDelete={refetchActivities}
                />
              ))}
            </InfiniteScroll>
          </InnerContainer>
        </ContentCard>{' '}
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

const InnerContainer = styled.div`
  margin: 1.6rem;
  margin-top: 3.2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: hidden;

  ${({ theme }) => theme.bp.md} {
    margin: 2.4rem;
  }

  ${({ theme }) => theme.bp.lg} {
    margin: 2.6rem;
  }
`
