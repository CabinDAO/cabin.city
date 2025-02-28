import { useState } from 'react'
import Link from 'next/link'
import { useUser } from '@/components/auth/useUser'
import { useModal } from '@/components/hooks/useModal'
import { useTextActivity } from '@/components/activity/useTextActivity'
import { format, formatDistance, parseISO } from 'date-fns'
import { expandRoute } from '@/utils/routing'
import styled from 'styled-components'
import { Avatar } from '@/components/profile/Avatar'
import IconButton from '../IconButton'
import { Caption, H4 } from '../Typography'
import { getPostSlots } from './post-slots'
import { MoreMenu } from '../MoreMenu'
import { ActionConfirmationModal } from '../ActionConfirmationModal'
import { ActivityListFragment, ActivityType } from '@/utils/types/activity'

type PostVariant = 'full' | 'compact'
export interface PostProps {
  activity: ActivityListFragment
  baseDate: Date
  onDelete: VoidFunction
  onLike?: VoidFunction
  onUnlike?: VoidFunction
  hovered?: boolean
  variant?: PostVariant
}

export const Post = (props: PostProps) => {
  const { activity, onLike, onUnlike, onDelete, variant = 'full' } = props
  const profile = activity.profile

  const { Content, Media } = getPostSlots(props)
  const [hovered, setHovered] = useState(false)
  const { user } = useUser()
  const { showModal } = useModal()
  const { handleDeleteTextActivity } = useTextActivity(
    onDelete,
    activity.externId
  )
  const [hasReactionByMe, setHasReactionByMe] = useState(
    activity.hasReactionByMe
  )
  const [likesCount, setLikesCount] = useState(activity.reactionCount)

  const handleLike = () => {
    if (onLike) {
      onLike()
      setHasReactionByMe(true)
      setLikesCount(likesCount + 1)
    }
  }

  const handleUnlike = () => {
    if (onUnlike) {
      onUnlike()
      setHasReactionByMe(false)
      setLikesCount(likesCount - 1)
    }
  }

  const displayMoreMenu =
    profile.externId === user?.externId && activity.type === ActivityType.Text

  const handleDeletePost = () => {
    showModal(() => (
      <ActionConfirmationModal
        onConfirm={handleDeleteTextActivity}
        title={'Delete Post'}
        text={'Are you sure you want to delete this post?'}
        confirmText={'Delete'}
      />
    ))
  }

  return (
    <Container
      variant={variant}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ContentContainer>
        {variant === 'full' && (
          <ProfileContainer>
            <LeftContainer
              href={expandRoute(['profile_id', { id: profile.externId }])}
              passHref
            >
              <Avatar srcCfId={profile.avatarCfId} size={3.2} />
              <ProfileName>{profile.name}</ProfileName>
            </LeftContainer>
            {displayMoreMenu && (
              <RightContainer>
                <MoreMenu
                  options={[
                    {
                      label: 'Delete post',
                      icon: 'trash',
                      onClick: handleDeletePost,
                    },
                  ]}
                />
              </RightContainer>
            )}
          </ProfileContainer>
        )}
        {Content && <Content {...props} hovered={hovered} />}
        <ActivityDate {...props} />
        {Media && (
          <MediaContainer>
            <Media {...props} hovered={hovered} />
          </MediaContainer>
        )}
        <ReactionsContainer>
          {hasReactionByMe ? (
            <IconButton
              icon="heart-solid"
              size={2}
              color="red600"
              onClick={handleUnlike}
            />
          ) : (
            <IconButton icon="heart-outline" size={2} onClick={handleLike} />
          )}
          <Caption>{likesCount}</Caption>
        </ReactionsContainer>
      </ContentContainer>
    </Container>
  )
}

interface ContainerProps {
  variant: PostVariant
}

const MediaContainer = styled.div`
  display: flex;
  width: 100%;
`

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  overflow: hidden;

  &:not(:first-child) {
    padding-top: 1.6rem;
  }

  &:not(:last-child) {
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(29, 42, 42, 0.12);
  }

  ${({ variant }) =>
    variant === 'compact' &&
    `
  flex-direction: row;
  justify-content: space-between;
  `}
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const LeftContainer = styled(Link)`
  display: flex;
  align-items: center;
`

const RightContainer = styled.div`
  position: relative;
`

const ProfileName = styled(H4)`
  margin-left: 1.2rem;
  margin-right: 0.8rem;
`

const ReactionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`

const ActivityDate = (props: PostProps) => (
  <Caption title={format(parseISO(props.activity.createdAt), 'yyyy-MM-dd')}>
    {formatDistance(parseISO(props.activity.createdAt), props.baseDate)}
    {' ago'}
  </Caption>
)
