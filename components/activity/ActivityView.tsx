import InfiniteScroll from 'react-infinite-scroll-component'
import { useUser } from '../auth/useUser'
import { useBackend } from '@/components/hooks/useBackend'
import {
  ActivityListFragment,
  ActivityListResponse,
} from '@/utils/types/activity'
import { useActivityReactions } from '@/components/activity/useActivityReactions'
import { useTextActivity } from './useTextActivity'
import styled from 'styled-components'
import { TextPost } from './TextPost'
import { ContentCard } from '@/components/core/ContentCard'
import { Post } from '@/components/core/post/Post'
import { TitleCard } from '@/components/core/TitleCard'
import { BaseLayout } from '@/components/core/BaseLayout'

export const ActivityView = () => {
  const { useGetPaginated } = useBackend()

  const { user } = useUser({ redirectTo: '/logout' })

  const {
    data,
    next,
    hasMore,
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

  const handleOnPost = (text: string) => {
    handleCreateTextActivity(text).then()
  }

  if (!user) return null

  return (
    <BaseLayout>
      <TitleCard icon="citizen" title="Cabin Activity" />
      <Container>
        <TextPost onPost={handleOnPost} />
        <ContentCard shape="notch">
          <Activities>
            <InfiniteScroll
              hasMore={hasMore}
              style={{ overflowX: 'hidden' }}
              dataLength={activities.length}
              next={next}
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
          </Activities>
        </ContentCard>
      </Container>
    </BaseLayout>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const Activities = styled.div`
  margin: 3.2rem 1.6rem 1.6rem;
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
