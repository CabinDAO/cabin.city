import { ChangeEvent, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../core/Button'
import { InputTextArea } from '../core/InputTextArea'
import { ContentCard } from '../core/ContentCard'
import { MAX_POST_LENGTH } from './constants'

interface TextPostInputProps {
  onPost: (text: string) => void
  onCancel: VoidFunction
}

export const TextPostInput = ({ onPost, onCancel }: TextPostInputProps) => {
  const [postText, setPostText] = useState<string>('')

  const handlePostInputChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value

    if (text.length <= MAX_POST_LENGTH && text.length >= 0) {
      setPostText(text)
    }
  }

  const handlePost = () => {
    onPost(postText.trim())
    handleCancel()
  }

  const handleCancel = () => {
    onCancel()
    setPostText('')
  }

  return (
    <StyledContentCard shape="notch">
      <PostInputContainer>
        <StyledTextArea
          textSize="large"
          helperText={`${postText.length}/${MAX_POST_LENGTH}`}
          helperTextPosition="inset"
          value={postText}
          placeholder="What's happening?"
          onChange={handlePostInputChange}
        />
        <Actions>
          <Button variant="link" onClick={handleCancel}>
            Cancel
          </Button>
          <StyledButton
            disabled={postText.trim().length === 0}
            onClick={handlePost}
          >
            Post
          </StyledButton>
        </Actions>
      </PostInputContainer>
    </StyledContentCard>
  )
}

const StyledContentCard = styled(ContentCard)`
  padding: 1.6rem;
  padding-top: 2.6rem;

  ${({ theme }) => theme.bp.md} {
    padding: 2.6rem 2.4rem 1.6rem 2.4rem;
  }
`

const StyledTextArea = styled(InputTextArea)`
  width: 100%;
  height: 26rem;

  ${({ theme }) => theme.bp.md} {
    height: 17rem;
  }
`

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 0.4rem;
  width: 100%;
`

const PostInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1.6rem;
`

const StyledButton = styled(Button)`
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: auto;
  }
`
