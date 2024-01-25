import { ContentCard } from '../core/ContentCard'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Post } from '../core/post/Post'
import { useActivityReactions } from './useActivityReactions'
import { useEffect, useState } from 'react'
import {
  PAGE_SIZE,
  ActivityListFragment,
  ActivityListResponse,
} from '@/utils/types/activity'
import { useAPIGet } from '@/utils/api/interface'

export const ActivityList = () => {
  const [activities, setActivities] = useState<ActivityListFragment[]>([])
  const [page, setPage] = useState(1)

  const { data } = useAPIGet<ActivityListResponse>('ACTIVITY_LIST', { page })

  const { handleLikeActivity, handleUnlikeActivity } = useActivityReactions()

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setActivities(data.activities)
      } else {
        setActivities([...activities, ...data.activities])
      }
    }
  }, [data])

  const hasMore = data ? data.count > PAGE_SIZE * (page + 1) : false

  const baseDate = new Date()

  return (
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
            />
          ))}
        </InfiniteScroll>
      </InnerContainer>
    </ContentCard>
  )
}

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
