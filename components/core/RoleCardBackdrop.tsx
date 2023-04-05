import { RoleInfo } from '@/utils/roles'
import styled from 'styled-components'

export const RoleCardBackdrop = styled.div<{ roleInfo: RoleInfo }>`
  padding: 2.4rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  background: url(${(props) => props.roleInfo.backgroundImagePath}) no-repeat;
  background-size: cover;
`
