import { BaseShadowCard } from './BaseShadowCard'
import styled from 'styled-components'
import Icon, { IconName } from './Icon'

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 5.4rem;
  background-color: ${({ theme }) => theme.colors.yellow300};
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 1.2rem;
  width: 100%;
  text-align: left;
`

interface IconCardProps {
  icon: IconName
  children: React.ReactNode
}

export const IconCard = ({ children, icon }: IconCardProps) => {
  return (
    <BaseShadowCard>
      <IconContainer>
        <Icon name={icon} size={1.8} />
      </IconContainer>
      <ContentContainer>{children}</ContentContainer>
    </BaseShadowCard>
  )
}
