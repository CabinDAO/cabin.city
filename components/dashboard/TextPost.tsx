import { useState } from 'react'
import { ContentCard } from '@/components/core/ContentCard'
import { TextPostInput } from './TextPostInput'
import styled from 'styled-components'
import { Avatar } from '@/components/core/Avatar'
import { useProfile } from '../auth/useProfile'
import { Subline1 } from '@/components/core/Typography'
import { AnimatePresence, motion } from 'framer-motion'

interface TextPostProps {
  onPost: (text: string) => void
}

export const TextPost = ({ onPost }: TextPostProps) => {
  const [inputVisible, setInputVisible] = useState<boolean>(false)
  const { user } = useProfile()

  const handleCancel = () => {
    setInputVisible(false)
  }

  const handleStartPost = () => {
    setInputVisible(true)
  }

  if (inputVisible) {
    return (
      <AnimatePresence>
        <AnimatedDiv
          initial={{ opacity: 0, translateY: -50 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: -50 }}
        >
          <TextPostInput onCancel={handleCancel} onPost={onPost} />
        </AnimatedDiv>
      </AnimatePresence>
    )
  } else {
    return (
      <StyledContentCard shape="notch">
        <PostCTAContainer onClick={handleStartPost}>
          <Avatar src={user?.avatar?.url} size={3.2} />
          <Subline1>Start a post</Subline1>
        </PostCTAContainer>
      </StyledContentCard>
    )
  }
}

const AnimatedDiv = styled(motion.div)`
  width: 100%;
`

const StyledContentCard = styled(ContentCard)`
  padding: 2.4rem;
`

const PostCTAContainer = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1.2rem;
  padding: 0.8rem 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.green900}26;
`
