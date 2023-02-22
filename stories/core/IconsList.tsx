import Icon, { IconName, IconSvgs } from '@/components/core/Icon'
import { Body1 } from '@/components/core/Typography'
import { ColorName } from '@/styles/theme'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  align-items: flex-start;
  column-gap: 10rem;
  row-gap: 2rem;
`

const IconContainer = styled.div`
  display: grid;
  grid-template-columns: 2.4rem auto;
  align-items: center;
  gap: 1.6rem;
`

interface IconListProps {
  color?: ColorName
  size?: number
}

const IconsList = ({ size, color }: IconListProps) => {
  const iconList = Object.keys(IconSvgs)

  return (
    <Container>
      {iconList.map((i) => (
        <IconContainer key={i}>
          <Icon name={i as IconName} size={size} color={color} />
          <Body1>{i}</Body1>
        </IconContainer>
      ))}
    </Container>
  )
}

export default IconsList
