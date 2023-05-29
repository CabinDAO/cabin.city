import styled from 'styled-components'
import Icon from './Icon'
import { Caption } from './Typography'
import { ColorName } from '@/styles/theme'

interface FieldAvailabilityProps {
  available: boolean
}

export const FieldAvailability = ({ available }: FieldAvailabilityProps) => {
  const color: ColorName = available ? 'green700' : 'red600'

  return (
    <Container>
      <Icon
        name={available ? 'check-circle' : 'x-circle'}
        color={color}
        size={1.75}
      />
      <Caption emphasized $color={color}>
        {available ? 'Available' : 'Unavailable'}
      </Caption>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 0.5rem;
`
