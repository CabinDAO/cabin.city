import theme, { ColorName } from '../../styles/theme'
import styled, { css } from 'styled-components'

interface TypographyProps {
  $color?: ColorName
}

const fonts = {
  primary: 'Inter',
  secondary: 'IBM Plex Mono',
}

const headerSharedStyles = css<TypographyProps>`
  font-family: ${fonts.primary};
  font-weight: 600;
  font-style: normal;
  margin: 0;
  color: ${(props) =>
    props.$color ? props.theme.colors[props.$color] : theme.colors.green900};
`

const h1Styles = css`
  ${headerSharedStyles}
  font-family: ${fonts.secondary};
  font-size: 2.4rem;
  line-height: 3.1rem;
`

const h2Styles = css`
  ${headerSharedStyles}
  font-family: ${fonts.secondary};
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.1rem;
  text-transform: uppercase;
`

const h3Styles = css`
  ${headerSharedStyles}
  font-family: ${fonts.primary};
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.9rem;
`

const bodyStyles = css`
  ${headerSharedStyles}
  font-family: ${fonts.primary};
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 1.9rem;
`

const captionStyles = css`
  ${headerSharedStyles}
  font-family: ${fonts.primary};
  font-weight: 400;
  font-size: 1.3rem;
  line-height: 1.6rem;
`

const captionBoldStyles = css`
  ${headerSharedStyles}
  font-family: ${fonts.primary};
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.6rem;
`

export const H1 = styled.h1`
  ${h1Styles}
`

export const H2 = styled.h2`
  ${h2Styles}
`

export const H3 = styled.h3`
  ${h3Styles}
`

export const Body = styled.p`
  ${bodyStyles}
`

export const Caption = styled.p`
  ${captionStyles}
`

export const CaptionBold = styled.p`
  ${captionBoldStyles}
`
