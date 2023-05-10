import styled from 'styled-components'
import { HTMLAttributes, ReactNode } from 'react'

export interface TabProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  label?: ReactNode
  className?: string
}

const Tab = ({ className, children }: TabProps) => {
  return <TabContainer className={className}>{children}</TabContainer>
}

const TabContainer = styled.div``

export default Tab
