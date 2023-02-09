import { ColorName } from '@/styles/theme'
import styled from 'styled-components'
import {
  Body,
  H1,
  H2,
  H3,
  Caption,
  CaptionBold,
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
        <Body>H1</Body>
        <H1 $color={$color}>{'Cabin Activity'}</H1>
      </TypographyRow>
      <TypographyRow>
        <Body>H2</Body>
        <H2 $color={$color}>{'DASHBOARD'}</H2>
      </TypographyRow>
      <TypographyRow>
        <Body>H3</Body>
        <H3 $color={$color}>{'Jane Doe'}</H3>
      </TypographyRow>
      <TypographyRow>
        <Body>Body</Body>
        <Body $color={$color}>{'Leveled up to a Member Builder'}</Body>
      </TypographyRow>
      <TypographyRow>
        <Body>Caption</Body>
        <Caption $color={$color}>{'10 hours ago'}</Caption>
      </TypographyRow>
      <TypographyRow>
        <Body>Caption Bold</Body>
        <CaptionBold $color={$color}>{'10.4K'}</CaptionBold>
      </TypographyRow>
    </Container>
  )
}

export default TypographyList
