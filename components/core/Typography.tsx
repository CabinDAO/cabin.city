import theme, { ColorName } from '../../styles/theme'
import styled, { css } from 'styled-components'

interface TypographyProps {
  $color?: ColorName
}

interface EmphasizableTypographyProps extends TypographyProps {
  emphasized?: boolean
}

const fonts = {
  inter: 'Inter',
  ibmPlexMono: 'IBM Plex Mono',
}

const typographySharedStyles = css<TypographyProps>`
  font-style: normal;
  margin: 0;
  color: ${(props) =>
    props.$color ? props.theme.colors[props.$color] : theme.colors.green900};
`

export const h1Styles = css<EmphasizableTypographyProps>`
  ${typographySharedStyles}
  font-family: ${fonts.ibmPlexMono};
  font-weight: 600;
  font-size: ${({ emphasized }) => (emphasized ? '3.2rem' : '2.4rem')};
  line-height: 3.12rem;
`

export const h2Styles = css`
  ${typographySharedStyles}
  font-family: ${fonts.ibmPlexMono};
  font-weight: 600;
  font-size: 2rem;
  line-height: 2.6rem;
`

export const h3Styles = css`
  ${typographySharedStyles}
  font-family: ${fonts.ibmPlexMono};
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.08rem;
  text-transform: uppercase;
`

export const h4Styles = css`
  ${typographySharedStyles}
  font-family: ${fonts.inter};
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 1.936rem;
`

export const h5Styles = css`
  ${typographySharedStyles}
  font-family: ${fonts.ibmPlexMono};
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.08rem;
`

export const h6Styles = css`
  ${typographySharedStyles}
  font-family: ${fonts.inter};
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.573rem;
`

export const subline1Styles = css`
  ${typographySharedStyles}
  font-family: ${fonts.ibmPlexMono};
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1.82rem;
`

export const subline2Styles = css`
  ${typographySharedStyles}
  font-family: ${fonts.inter};
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.7rem;
`

export const body1Styles = css`
  ${typographySharedStyles}
  font-family: ${fonts.inter};
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 1.9rem;
`

export const body2Styles = css`
  ${typographySharedStyles}
  font-family: ${fonts.inter};
  font-weight: 400;
  font-size: 1.3rem;
  line-height: 1.95rem;
  opacity: 0.75;
`

export const captionStyles = css<EmphasizableTypographyProps>`
  ${typographySharedStyles}
  font-family: ${fonts.inter};
  font-weight: ${({ emphasized }) => (emphasized ? '500' : '400')};
  font-size: 1.3rem;
  line-height: 1.6rem;
  opacity: ${({ emphasized }) => (emphasized ? 'inherit' : '0.75')};
`

export const overlineStyles = css`
  ${typographySharedStyles}
  font-family: ${fonts.ibmPlexMono};
  font-weight: 600;
  font-size: 1.3rem;
  line-height: 1.7rem;
  text-transform: uppercase;
`

export const buttonStyles = css`
  ${typographySharedStyles}
  font-family: ${fonts.ibmPlexMono};
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1.8rem;
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

export const H4 = styled.h4`
  ${h4Styles}
`

export const H5 = styled.h5`
  ${h5Styles}
`

export const H6 = styled.h6`
  ${h6Styles}
`

export const Subline1 = styled.h6`
  ${subline1Styles}
`

export const Subline2 = styled.h6`
  ${subline2Styles}
`

export const Body1 = styled.p`
  ${body1Styles}
`

export const Body2 = styled.p`
  ${body2Styles}
`

export const Caption = styled.p`
  ${captionStyles}
`

export const Overline = styled.p`
  ${overlineStyles}
`
