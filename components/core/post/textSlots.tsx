import { Body1, WordBreak } from '../Typography'
import { PostProps } from './Post'
import { PostSlots } from './post-slots'

const TextContent = (props: PostProps) => {
  const { activity } = props

  return (
    <WordBreak>
      <Body1>{activity.metadata.text}</Body1>
    </WordBreak>
  )
}

export const textSlots: PostSlots = {
  Content: TextContent,
}
