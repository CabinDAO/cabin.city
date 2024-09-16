import { ProfileTag } from '@/utils/types/profile'
import styled from 'styled-components'
import { Checkbox } from '@/components/core/Checkbox'

type Labels = Record<ProfileTag, string>
const tagLabels: Labels = {
  [ProfileTag.steward]: `I want to create a greater sense of community in my neighborhood`,
  [ProfileTag.moveCurious]: `I'd want to move to a place with stronger local community`,
  [ProfileTag.nomad]: `I live a nomadic lifestyle`,
  [ProfileTag.parent]: `I'm a parent`,
  [ProfileTag.networkSociety]: `I'm interested in network societies`,
  [ProfileTag.crypto]: `I have a crypto wallet`,
}

export const tagPillLabels: Record<ProfileTag, string> = {
  [ProfileTag.steward]: `neighborhood-organizer`,
  [ProfileTag.moveCurious]: `might-move`,
  [ProfileTag.nomad]: `nomad`,
  [ProfileTag.parent]: `parent`,
  [ProfileTag.networkSociety]: `network-society`,
  [ProfileTag.crypto]: `crypto`,
}

export const TagsInput = ({
  tags,
  onTagsChange,
  canShowErrors,
  disabled = false,
}: {
  tags: ProfileTag[]
  onTagsChange: (tags: ProfileTag[]) => void
  canShowErrors: boolean
  disabled?: boolean
}) => {
  const tagChoices = Object.entries(tagLabels) as [keyof Labels, string][] // fix typing of entries()
  return (
    <Container>
      {tagChoices.map(([tag, label]) => (
        <Row key={tag}>
          <Checkbox
            selected={tags.includes(tag)}
            label={label}
            disabled={disabled}
            onClick={() => {
              if (tags.includes(tag)) {
                onTagsChange(tags.filter((t) => t !== tag))
              } else {
                onTagsChange([...tags, tag])
              }
            }}
          />
        </Row>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.6rem;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  align-items: center;
`
