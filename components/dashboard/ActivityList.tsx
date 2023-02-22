import { ContentCard } from '../core/ContentCard'
import styled from 'styled-components'
import { ActivityFragment, useGetActivitiesQuery } from '@/generated/graphql'
import { ReactNode } from 'react'
import { formatDistance, parseISO } from 'date-fns'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Avatar } from '../core/Avatar'

const InnerContainer = styled.div`
  overflow: scroll;
  margin: 2.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
`

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
            <ActivityPost
              key={activity._id}
              activity={activity}
              baseDate={baseDate}
            />
          ))}
        </InfiniteScroll>
      </InnerContainer>
    </ContentCard>
  )
}

interface ActivityPostProps {
  activity: ActivityFragment
  baseDate: Date
}
const ActivityPost = (props: ActivityPostProps) => {
  const { activity, baseDate } = props
  const date = parseISO(activity.timestamp)

  return (
    <Post
      activityId={activity._id}
      profile={activity.profile}
      content="Joined Cabin"
      date={date}
      baseDate={baseDate}
    />
  )
}

interface PostProps {
  activityId: string
  profile: {
    _id: string
    name: string
    avatar?: {
      url: string | undefined
    } | null
  }
  content: ReactNode
  date: Date
  baseDate: Date
}

// Temporary component until we have a real Post component
const Post = (props: PostProps) => {
  const imageUrl =
    props.activityId.endsWith('5') || props.activityId.endsWith('2')
      ? 'https://fastly.picsum.photos/id/521/300/435.jpg?hmac=J4muwOhXM59a3cXXsZRHi675vtgZ7VP2e34eEVMKPTQ'
      : null

  return (
    <div style={{ padding: '1.6rem', borderBottom: 'solid 1px black' }}>
      <div>Id: {props.activityId}</div>
      <div>
        <Avatar src={props.profile.avatar?.url} />
      </div>
      <div>{props.profile.name}</div>
      <div>{props.content}</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {imageUrl && <img src={imageUrl} alt="Photo" />}
      <div>
        {formatDistance(props.date, props.baseDate, { addSuffix: true })}
      </div>
    </div>
  )
}
