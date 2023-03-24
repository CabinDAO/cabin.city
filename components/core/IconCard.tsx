import { BaseShadowCard } from './BaseShadowCard'
import styled, { css } from 'styled-components'
import Icon, { IconName } from './Icon'
import Link from 'next/link'

interface IconCardProps {
  icon: IconName
  children: React.ReactNode
  iconHref?: string
}

export const IconCard = ({ children, icon, iconHref }: IconCardProps) => {
  return (
    <BaseShadowCard>
      {iconHref ? (
        <LinkContainer href={iconHref ?? '/'}>
          <Icon name={icon} size={1.8} />
        </LinkContainer>
      ) : (
        <IconContainer>
          <Icon name={icon} size={1.8} />
        </IconContainer>
      )}

      <ContentContainer>{children}</ContentContainer>
    </BaseShadowCard>
  )
}

const iconContainerStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 5.4rem;
  background-color: ${({ theme }) => theme.colors.yellow300};
`

const IconContainer = styled.div`
  ${iconContainerStyles}
`

const LinkContainer = styled(Link)`
  ${iconContainerStyles}
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
