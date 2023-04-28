import { HTMLAttributes, ReactElement, useState } from 'react'
import styled from 'styled-components'
import { Children } from 'react'
import { H3 } from '@/components/core/Typography'
import { TabProps } from '@/components/core/Tab'

interface TabGroupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactElement<TabProps> | ReactElement<TabProps>[]
}

interface TabGroupHeaderNameProps extends HTMLAttributes<HTMLDivElement> {
  isSelected: boolean
}

const TabGroup = ({ className, children }: TabGroupProps) => {
  const tabs = Children.toArray(children) as ReactElement<TabProps>[]
  const [currentTab, setCurrentTab] = useState(tabs[0])

  return (
    <TabGroupContainer className={className}>
      <TabGroupHeader>
        {tabs.map((tab) => (
          <TabGroupHeaderName
            key={tab.props.name}
            isSelected={currentTab.props.name === tab.props.name}
          >
            <H3 onClick={() => setCurrentTab(tab)}>
              {tab.props.label || tab.props.name}
            </H3>
          </TabGroupHeaderName>
        ))}
      </TabGroupHeader>
      <TabGroupBody>{currentTab}</TabGroupBody>
    </TabGroupContainer>
  )
}

const TabGroupHeaderName = styled.div<TabGroupHeaderNameProps>`
  display: flex;
  padding: 1.6rem 0 1.2rem 0;
  cursor: pointer;
  border-bottom: 0.4rem solid
    ${({ theme, isSelected }) =>
      isSelected ? theme.colors.green900 : 'transparent'};

  > * {
    opacity: ${({ isSelected }) => (isSelected ? 1 : 0.65)};
  }
`

const TabGroupBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4rem 2.4rem;
  border-top: 0.1rem solid ${({ theme }) => theme.colors.green900};
`

const TabGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 0.1rem solid ${({ theme }) => theme.colors.green900};
  background-color: ${({ theme }) => theme.colors.yellow200};
`

const TabGroupHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 2.4rem;
  gap: 4rem;
`

export default TabGroup
