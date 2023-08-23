import { body1Styles, H3 } from '@/components/core/Typography'
import styled from 'styled-components'

const words = [
  'Goal setting',
  'Mindfulness',
  'Collaborative cooking',
  'Campfires',
  'Game night',
  'Morning movement',
  'Hiking',
  'Sauna',
  'Gardening',
  'Swimming',
  'Birding',
  'Journaling',
  'Co-creating art',
  'Breathwork',
  'Compost setup',
  'Tree pruning',
  'Pickling party',
  'Karaoke',
  'Building',
  'Movie night',
  'Harvesting',
  'Music making',
]

export const WordCloud = () => {
  return (
    <Container>
      <H3>Sample Activities</H3>
      <WordContainer>
        {words.map((word, i) => {
          return <Word key={i + 1}>{word}</Word>
        })}
      </WordContainer>
    </Container>
  )
}

export const Word = styled.span`
  padding: 2.4rem 1.6rem;
  border: solid 1px ${({ theme }) => theme.colors.green700};
  border-radius: 0.4rem;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  width: 100%;
  margin-top: 2.4rem;

  ${({ theme }) => theme.bp.lg} {
    margin-top: 4.8rem;
  }

  ${H3} {
    color: ${({ theme }) => theme.colors.yellow100};
  }
`

const WordContainer = styled.div`
  ${body1Styles}

  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors.yellow100};
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: 50rem;
  }

  ${({ theme }) => theme.bp.lg} {
    width: 84rem;
  }
`
