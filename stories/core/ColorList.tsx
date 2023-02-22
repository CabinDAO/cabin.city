import { Body1, H3 } from '@/components/core/Typography'
import theme, { availableColors } from '@/styles/theme'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.4rem;
`

const ColorRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  // grid-template-columns: repeat(5, 16rem);
  align-items: center;
  gap: 2.4rem;
`

const ColorCard = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 12rem auto;
  background: ${(props) => props.theme.colors.yellow100};
  border-radius: 1.2rem;
  box-shadow: 0rem 1.2rem 1.6rem -0.4rem rgba(16, 24, 40, 0.1),
    0rem 0.4rem 0.6rem -0.2rem rgba(16, 24, 40, 0.05);
  overflow: hidden;
`

interface ColorProps {
  color: string
}

const Color = styled.div<ColorProps>`
  width: 100%;
  height: 100%;
  background: ${(props) =>
    props.theme.colors[props.color as keyof typeof props.theme.colors]};
`

const ColorInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.2rem;
`

interface GroupedColors {
  green: string[]
  blue: string[]
  yellow: string[]
  red: string[]
}

const groupedColors = availableColors.reduce<GroupedColors>(
  (group, colorName) => {
    if (colorName.startsWith('green')) {
      return { ...group, green: [...(group.green || []), colorName] }
    }
    if (colorName.startsWith('blue')) {
      return { ...group, blue: [...(group.blue || []), colorName] }
    }
    if (colorName.startsWith('yellow')) {
      return { ...group, yellow: [...(group.yellow || []), colorName] }
    }
    if (colorName.startsWith('red')) {
      return { ...group, red: [...(group.red || []), colorName] }
    }
    return group
  },
  {} as GroupedColors
)

interface ColorPaletteCardProps {
  color: string
}
const ColorPaletteCard = ({ color }: ColorPaletteCardProps) => (
  <ColorCard>
    <Color color={color} />
    <ColorInfo>
      <H3>{theme.colors[color as keyof typeof theme.colors]}</H3>
      <Body1>{color}</Body1>
    </ColorInfo>
  </ColorCard>
)
const ColorList = () => {
  return (
    <Container>
      <ColorRow>
        {groupedColors.blue.map((color, index) => (
          <ColorPaletteCard key={index} color={color} />
        ))}
      </ColorRow>
      <ColorRow>
        {groupedColors.green.map((color, index) => (
          <ColorPaletteCard key={index} color={color} />
        ))}
      </ColorRow>
      <ColorRow>
        {groupedColors.yellow.map((color, index) => (
          <ColorPaletteCard key={index} color={color} />
        ))}
      </ColorRow>
      <ColorRow>
        {groupedColors.red.map((color, index) => (
          <ColorPaletteCard key={index} color={color} />
        ))}
      </ColorRow>
    </Container>
  )
}

export default ColorList
