import styled from 'styled-components'

interface DividerProps {
  opaque?: boolean
}

export const Divider = styled.div<DividerProps>`
  background-color: ${({ theme }) => theme.colors.green900};
  opacity: ${({ opaque }) => (opaque ? 1 : 0.12)};
  flex-direction: row;
`

export const VerticalDivider = styled(Divider)`
  width: 0.1rem;
`

export const HorizontalDivider = styled(Divider)`
  width: 100%;
  height: 1px;
`

// When desktop, the divider is vertical, when mobile, it's horizontal
export const ResponsiveDivider = styled(Divider)`
  width: 100%;
  height: 1px;

  ${({ theme }) => theme.bp.lg} {
    width: 0.1rem;
    height: 100%;
  }
`
