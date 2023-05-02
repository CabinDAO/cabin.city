import { ColorName } from '@/styles/theme'
import styled from 'styled-components'
import {
  Body1,
  H1,
  H2,
  H3,
  Caption,
  H4,
  H5,
  H6,
  Subline1,
  Subline2,
  Body2,
  Overline,
  BlockQuote,
} from '@/components/core/Typography'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.4rem;
`

const TypographyRow = styled.div`
  display: grid;
  grid-template-columns: 12rem 1fr;
  align-items: center;
  gap: 1.2rem;
`

interface TypographyListProps {
  $color?: ColorName
}

const TypographyList = ({ $color }: TypographyListProps) => {
  return (
    <Container>
      <TypographyRow>
        <Body1>H1 emphasized</Body1>
        <H1 emphasized $color={$color}>
          {'Welcome to Cabin'}
        </H1>
      </TypographyRow>
      <TypographyRow>
        <Body1>H1</Body1>
        <H1 $color={$color}>{'Cabin Activity'}</H1>
      </TypographyRow>
      <TypographyRow>
        <Body1>H2</Body1>
        <H2 $color={$color}>{'Dashboard'}</H2>
      </TypographyRow>
      <TypographyRow>
        <Body1>H3</Body1>
        <H3 $color={$color}>{'Jane Doe'}</H3>
      </TypographyRow>
      <TypographyRow>
        <Body1>H4</Body1>
        <H4 $color={$color}>{'Welcome to Cabin'}</H4>
      </TypographyRow>
      <TypographyRow>
        <Body1>H5</Body1>
        <H5 $color={$color}>{'Welcome to Cabin'}</H5>
      </TypographyRow>
      <TypographyRow>
        <Body1>H6</Body1>
        <H6 $color={$color}>{'Welcome to Cabin'}</H6>
      </TypographyRow>
      <TypographyRow>
        <Body1>Subline1</Body1>
        <Subline1 $color={$color}>{'Welcome to Cabin'}</Subline1>
      </TypographyRow>
      <TypographyRow>
        <Body1>Subline2</Body1>
        <Subline2 $color={$color}>{'Welcome to Cabin'}</Subline2>
      </TypographyRow>
      <TypographyRow>
        <Body1>Body1</Body1>
        <Body1 $color={$color}>{'Leveled up to a Member Builder'}</Body1>
      </TypographyRow>
      <TypographyRow>
        <Body1>Body2</Body1>
        <Body2 $color={$color}>{'Welcome to Cabin'}</Body2>
      </TypographyRow>
      <TypographyRow>
        <Body1>Caption</Body1>
        <Caption $color={$color}>{'10 hours ago'}</Caption>
      </TypographyRow>
      <TypographyRow>
        <Body1>Caption emphasized</Body1>
        <Caption emphasized $color={$color}>
          {'10.4K'}
        </Caption>
      </TypographyRow>
      <TypographyRow>
        <Body1>Overline</Body1>
        <Overline $color={$color}>{'Welcome to Cabin'}</Overline>
      </TypographyRow>
      <TypographyRow>
        <Body1>BlockQuote</Body1>
        <BlockQuote $color={$color}>{'This is a quote'}</BlockQuote>
      </TypographyRow>
    </Container>
  )
}

export default TypographyList
