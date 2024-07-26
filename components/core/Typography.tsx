import { Inter, IBM_Plex_Mono, Poppins } from 'next/font/google'
import styled, { css } from 'styled-components'
import theme, { ColorName } from '@/styles/theme'

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['600'],
  subsets: ['latin'],
  display: 'swap',
})

const poppins = Poppins({
  weight: ['600'],
  subsets: ['latin'],
  display: 'swap',
})

interface TypographyProps {
  $color?: ColorName
}

interface EmphasizableTypographyProps extends TypographyProps {
  emphasized?: boolean
}

export const fonts = {
  inter: inter.style.fontFamily,
  ibmPlexMono: ibmPlexMono.style.fontFamily,
  poppins: poppins.style.fontFamily,
  // FYI there are some hardcoded fonts on the stripe payment form
}

export const typographySharedStyles = css<TypographyProps>`
  font-style: normal;
  margin: 0;
  color: ${(props) =>
    props.$color ? props.theme.colors[props.$color] : theme.colors.green900};
`

export const hhStyles = css`
  ${typographySharedStyles}
  font-family: ${fonts.poppins};
  font-weight: 600;
  line-height: 1.5;
  font-size: 3.2rem;
`

export const h1Styles = css<EmphasizableTypographyProps>`
  ${typographySharedStyles}
  font-family: ${fonts.ibmPlexMono};
  font-weight: 600;
  line-height: 1.3;

  font-size: ${({ emphasized }) => (emphasized ? '2.4rem' : '2rem')};

  ${theme.bp.md} {
    font-size: ${({ emphasized }) => (emphasized ? '3.2rem' : '2rem')};
  }

  ${theme.bp.lg} {
    font-size: ${({ emphasized }) => (emphasized ? '3.2rem' : '2.4rem')};
  }
`

export const h2Styles = css`
  ${typographySharedStyles}
  font-family: ${fonts.ibmPlexMono};
  font-weight: 600;
  line-height: 1.3;
  font-size: 2rem;
`

export const h3Styles = css`
  ${typographySharedStyles}
  font-family: ${fonts.ibmPlexMono};
  text-transform: uppercase;
  font-weight: 600;
  line-height: 1.3;
  font-size: 1.6rem;
`

export const h4Styles = css`
  ${typographySharedStyles}
  font-family: ${fonts.inter};
  font-weight: 700;
  line-height: 1.21;
  font-size: 1.6rem;
`

export const h5Styles = css`
  ${typographySharedStyles}
  font-family: ${fonts.ibmPlexMono};
  font-weight: 600;
  line-height: 1.3;
  font-size: 1.3rem;

  ${theme.bp.lg} {
    font-size: 1.6rem;
  }
`

export const h6Styles = css`
  ${typographySharedStyles}
  font-family: ${fonts.inter};
  font-weight: 500;
  line-height: 1.21;
  font-size: 1.3rem;
`

export const subline1Styles = css`
  ${typographySharedStyles}
  font-family: ${fonts.ibmPlexMono};
  font-weight: 600;
  line-height: 1.3;
  font-size: 1.4rem;
`

export const subline2Styles = css`
  ${typographySharedStyles}
  font-family: ${fonts.inter};
  font-weight: 400;
  line-height: 1.21;
  font-size: 1.4rem;
`

export const body1Styles = css`
  ${typographySharedStyles}
  font-family: ${fonts.inter};
  font-weight: 500;
  line-height: 1.3;
  font-size: 1.6rem;
`

export const body2Styles = css`
  ${typographySharedStyles}
  font-family: ${fonts.inter};
  font-weight: 400;
  line-height: 1.5;
  font-size: 1.3rem;
  opacity: 0.75;
`

export const captionStyles = css<EmphasizableTypographyProps>`
  ${typographySharedStyles}
  font-family: ${fonts.inter};
  font-weight: ${({ emphasized }) => (emphasized ? '500' : '400')};
  line-height: 1.23;
  font-size: 1.3rem;
  opacity: ${({ emphasized }) => (emphasized ? 'inherit' : '0.75')};
`

export const overlineStyles = css`
  ${typographySharedStyles}
  font-family: ${fonts.ibmPlexMono};
  font-weight: 600;
  line-height: 1.3;
  font-size: 1.3rem;
  text-transform: uppercase;
`

export const buttonStyles = css`
  ${typographySharedStyles}
  font-family: ${fonts.ibmPlexMono};
  font-weight: 600;
  line-height: 1.3;
  font-size: 1.5rem;
`

export const HHero = styled.h1`
  ${hhStyles}
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

export const WordBreak = styled.div`
  overflow-wrap: break-word;

  -ms-word-break: break-all;
  word-break: break-word;

  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
`

export const BlockQuote = styled(Body1)`
  padding-left: 2.4rem;
  border-left: 2px solid rgba(29, 42, 42, 0.12);
`

export const OrderedList = styled.ol`
  list-style-position: inside;
`

export const UnorderedList = styled.ul`
  list-style-position: inside;
`

export const ListItem = styled.li`
  ${body1Styles}
`

export const truncateStyles = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
