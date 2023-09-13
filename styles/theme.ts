import { css, FlattenSimpleInterpolation } from 'styled-components'

type ScreenWidth = 'narrow' | 'mid' | 'wide' // | 'full'
type PaddingSize = `none` | `xs` | 'sm' | 'md' | 'lg' | 'xl' | 'xl_half' // | 'full'

const paddingSizesRem: {
  [key in ScreenWidth]: { [key in PaddingSize]: number }
} = {
  narrow: {
    none: 0,
    xs: 1.6,
    sm: 1.6,
    md: 2.4,
    lg: 4,
    xl: 6.4,
    xl_half: 3.2,
  },
  mid: {
    none: 0,
    xs: 1.6,
    sm: 2.4,
    md: 2.4,
    lg: 4,
    xl: 6.4,
    xl_half: 3.2,
  },
  wide: {
    none: 0,
    xs: 1.6,
    sm: 2.4,
    md: 4,
    lg: 6.4,
    xl: 8,
    xl_half: 4,
  },
}

const padding = function (
  a: PaddingSize,
  b?: PaddingSize,
  c?: PaddingSize,
  d?: PaddingSize
): FlattenSimpleInterpolation {
  const narrow = [],
    mid = [],
    wide = []

  for (const i of [a, b, c, d]) {
    if (i === undefined) break
    narrow.push(`${paddingSizesRem['narrow'][i]}rem`)
    mid.push(`${paddingSizesRem['mid'][i]}rem`)
    wide.push(`${paddingSizesRem['wide'][i]}rem`)
  }

  return css`
    padding: ${narrow.join(' ')};
    ${theme.bp.md} {
      padding: ${mid.join(' ')};
    }
    ${theme.bp.lg} {
      padding: ${wide.join(' ')};
    }
  `
}

padding.one = (dir: 'left' | 'right' | 'top' | 'bottom', size: PaddingSize) =>
  css`
    padding-${dir}: ${paddingSizesRem['narrow'][size]}rem;
    ${theme.bp.md} {
      padding-${dir}: ${paddingSizesRem['mid'][size]}rem;
    }
    ${theme.bp.lg} {
      padding-${dir}: ${paddingSizesRem['wide'][size]}rem;
    }
  `

padding.top = (size: PaddingSize) => padding.one('top', size)
padding.bottom = (size: PaddingSize) => padding.one('bottom', size)
padding.left = (size: PaddingSize) => padding.one('left', size)
padding.right = (size: PaddingSize) => padding.one('right', size)

export { padding }

type ContainerWidth = ScreenWidth | 'full'

const containerWidths: { [key in ContainerWidth]: string } = {
  narrow: '100%',
  mid: '50rem',
  wide: '80rem',
  full: '100%',
}

const breakpoints: {
  [key in ScreenWidth]: number
} = {
  narrow: 320,
  mid: 760,
  wide: 1025,
}

export const queries = {
  base: '(min-width: 0px)',
  sm: `(min-width: ${breakpoints.narrow}px)`,
  sm_max: `(max-width: ${breakpoints.narrow - 1}px)`,
  md: `(min-width: ${breakpoints.mid}px)`,
  md_max: `(max-width: ${breakpoints.mid - 1}px)`,
  lg: `(min-width: ${breakpoints.wide}px)`,
  lg_max: `(max-width: ${breakpoints.wide - 1}px)`,
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
}
const theme = {
  bp: {
    base: `@media only screen and ${queries.base}`,
    sm: `@media only screen and ${queries.sm}`,
    sm_max: `@media only screen and ${queries.sm_max}`,
    sm_landscape: `@media only screen and ${queries.sm} and ${queries.landscape}`,
    md: `@media only screen and ${queries.md}`,
    md_max: `@media only screen and ${queries.md_max}`,
    md_landscape: `@media only screen and ${queries.md} and ${queries.landscape}`,
    lg: `@media only screen and ${queries.lg}`,
    lg_max: `@media only screen and ${queries.lg_max}`,
    portrait: `@media only screen and ${queries.portrait}`,
    landscape: `@media only screen and ${queries.landscape}`,
  },
  colors: {
    twitter: '#1d9bf0',
    green900: '#1D2B2A',
    green800: '#324841',
    green700: '#06774C',
    green600: '#03AB5B',
    green500: '#06DF59',
    green400: '#00FF47',
    green300: '#4FFF79',
    green200: '#A2FFB3',
    green100: '#E0FFE5',
    blue900: '#192634',
    blue800: '#263A4D',
    blue700: '#324E65',
    blue600: '#507996',
    blue500: '#77A9C7',
    blue400: '#90C5E3',
    blue300: '#ACE1FF',
    blue200: '#D0EFFF',
    blue100: '#ECF9FF',
    yellow900: '#17120B',
    yellow800: '#493922',
    yellow700: '#7B5E35',
    yellow600: '#AD844C',
    yellow500: '#DEAE6A',
    yellow400: '#FDC67B',
    yellow300: '#FED7A2',
    yellow200: '#FEE9CB',
    yellow100: '#FDF3E7',
    red900: '#310B05',
    red800: '#6B2115',
    red700: '#A43725',
    red600: '#CE523C',
    red500: '#D97763',
    red400: '#E0907E',
    red300: '#EBB5A6',
    red200: '#F6DACD',
    red100: '#FBEDE6',
    white: '#FFFFFF',
    black: '#000000',
  },
  border: {
    light: '1px solid rgba(29, 42, 42, 0.12)',
  },
}

export const availableColors = Object.keys(theme.colors)

export type ColorName = keyof typeof theme.colors

export default theme
