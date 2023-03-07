import styled from 'styled-components'

export const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.green900};
  opacity: 0.12;
  flex-direction: row;
`

export const VerticalDivider = styled(Divider)`
  width: 0.1rem;
`

export const HorizontalDivider = styled(Divider)`
  width: 100%;
  height: 1px;
`
