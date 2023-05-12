import { ContentCard } from '../core/ContentCard'
import styled from 'styled-components'
import {
  ActivityItemFragment,
  useGetActivitiesQuery,
} from '@/generated/graphql'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Post } from '../core/post/Post'
import { useActivityReactions } from './useActivityReactions'
import { useEffect } from 'react'

export const ActivityList = () => {
  const { data, fetchMore, refetch } = useGetActivitiesQuery({
    variables: {
      size: 20,
    },
  })

  useEffect(() => {
    return () => {
      refetch()
    }
  }, [refetch])

  const { handleLikeActivity, handleUnlikeActivity } = useActivityReactions()

  const activityItems = data?.allActivities.data.filter(
    (a): a is ActivityItemFragment => !!a
  )
  const hasMore = !!data?.allActivities?.after
  const dataLength = activityItems?.length ?? 0
  const baseDate = new Date()

  return (
    <ContentCard shape="notch">
      <InnerContainer>
        <InfiniteScroll
          hasMore={!!hasMore}
          style={{ overflowX: 'hidden' }}
          dataLength={dataLength}
          next={() => {
            return fetchMore({
              variables: {
                cursor: data?.allActivities?.after,
              },
            })
          }}
          loader="..."
        >
          {activityItems?.map((activityItem) => (
            <Post
              key={activityItem.activity._id}
              activityItem={activityItem}
              baseDate={baseDate}
              onLike={() => handleLikeActivity(activityItem)}
              onUnlike={() => handleUnlikeActivity(activityItem)}
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

  ${({ theme }) => theme.bp.md} {
    margin: 2.4rem;
  }

  ${({ theme }) => theme.bp.lg} {
    margin: 2.6rem;
  }
`
