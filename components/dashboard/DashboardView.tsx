import InfiniteScroll from 'react-infinite-scroll-component'
import { useProfile } from '../auth/useProfile'
import { useBackend } from '@/components/hooks/useBackend'
import {
  ActivityListFragment,
  ActivityListResponse,
  ActivitySummaryResponse,
} from '@/utils/types/activity'
import { useActivityReactions } from '@/components/dashboard/useActivityReactions'
import { useTextActivity } from './useTextActivity'
import styled from 'styled-components'
import { TwoColumnLayout } from '../layouts/TwoColumnLayout'
import { DataContainer } from '@/components/core/DataContainer'
import { TextPost } from './TextPost'
import { ContentCard } from '@/components/core/ContentCard'
import { Post } from '@/components/core/post/Post'

export const DashboardView = () => {
  const { useGet, useGetPaginated } = useBackend()

  const { user } = useProfile({ redirectTo: '/logout' })

  const { data: summaryData } =
    useGet<ActivitySummaryResponse>('ACTIVITY_SUMMARY')

  const {
    data,
    page,
    setPage,
    isLastPage,
    mutate: refetchActivities,
  } = useGetPaginated<ActivityListResponse>('ACTIVITY_LIST')

  const activities = data
    ? data.reduce(
        (acc: ActivityListFragment[], val) =>
          'error' in val ? acc : [...acc, ...val.activities],
        []
      )
    : []

  const { handleCreateTextActivity } = useTextActivity(refetchActivities)
  const { handleLikeActivity, handleUnlikeActivity } = useActivityReactions()

  const baseDate = new Date()

  const dashboardItems = [
    {
      name: 'Members',
      value:
        !summaryData || 'error' in summaryData ? 0 : summaryData?.profilesCount,
    },
    {
      name: 'Token Holders',
      value:
        !summaryData || 'error' in summaryData
          ? 0
          : summaryData?.tokenHoldersCount,
    },
    {
      name: 'Citizens',
      value:
        !summaryData || 'error' in summaryData ? 0 : summaryData?.citizensCount,
    },
  ]

  const handleOnPost = (text: string) => {
    handleCreateTextActivity(text).then()
  }

  if (!user) return null

  return (
    <TwoColumnLayout title="Cabin Activity">
      <ActivitiesContainer>
        <TextPost onPost={handleOnPost} />
        <ContentCard shape="notch">
          <InnerContainer>
            <InfiniteScroll
              hasMore={!isLastPage}
              style={{ overflowX: 'hidden' }}
              dataLength={activities.length}
              next={async () => {
                await setPage(page + 1)
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
