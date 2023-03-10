import { ContentCard } from '../core/ContentCard'
import styled from 'styled-components'
import { ActivityFragment, useGetActivitiesQuery } from '@/generated/graphql'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Post } from '../core/post/Post'

export const ActivityList = () => {
  const { data, fetchMore } = useGetActivitiesQuery({
    variables: {
      size: 20,
    },
  })

  const activities = data?.allActivities.data.filter(
    (a): a is ActivityFragment => !!a
  )
  const hasMore = !!data?.allActivities?.after
  const dataLength = activities?.length ?? 0
  const baseDate = new Date()

  return (
    <ContentCard shape="notch">
      <InnerContainer>
        <InfiniteScroll
          hasMore={!!hasMore}
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
          {activities?.map((activity) => (
            <Post key={activity._id} activity={activity} baseDate={baseDate} />
          ))}
        </InfiniteScroll>
      </InnerContainer>
    </ContentCard>
  )
}

const InnerContainer = styled.div`
  margin: 2.6rem;
  display: flex;
  flex-direction: column;
  width: 100%;
`
