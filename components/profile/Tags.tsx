import React from 'react'
import { ProfileTag } from '@/utils/types/profile'
import styled from 'styled-components'
import { tagPillLabels } from '@/components/profile/TagsInput'

export const Tags = ({ tags }: { tags: ProfileTag[] }) => {
  if (tags.length === 0) return null

  return (
    <Container>
      {tags.map((tag) => {
        return <Tag key={tag}>#{tagPillLabels[tag]}</Tag>
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
`

const Tag = styled.div`
  font-size: 1.4rem;
  padding: 0.4rem 1rem;
  background-color: ${({ theme }) => theme.colors.yellow300};
  border-radius: 1rem;
`
