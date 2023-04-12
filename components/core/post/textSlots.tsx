import { Body1 } from '../Typography'
import { PostProps } from './Post'
import { PostSlots } from './post-slots'
import styled from 'styled-components'

const TextContent = (props: PostProps) => {
  const { activityItem } = props
  const { activity } = activityItem

  return <StyledBody>{activity.text}</StyledBody>
}

export const textSlots: PostSlots = {
  Content: TextContent,
}

const StyledBody = styled(Body1)`
  overflow-wrap: break-word;

  -ms-word-break: break-all;
  word-break: break-word;

  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
`
