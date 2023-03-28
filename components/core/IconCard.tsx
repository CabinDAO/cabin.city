import { BaseShadowCard } from './BaseShadowCard'
import styled, { css } from 'styled-components'
import Icon, { IconName } from './Icon'
import Link from 'next/link'
import { ZoomInCard } from './ZoomInCard'
import { useState } from 'react'

interface IconCardProps {
  icon: IconName
  children: React.ReactNode
  iconHref?: string
}

export const IconCard = ({ children, icon, iconHref }: IconCardProps) => {
  const [hovered, setHovered] = useState(false)
  return (
    <BaseShadowCard>
      {iconHref ? (
        <LinkContainer
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          href={iconHref ?? '/'}
        >
          <ZoomInCard hovered={hovered} hoverScale={1.2} tapScale={1}>
            <Icon name={icon} size={2} />
          </ZoomInCard>
        </LinkContainer>
      ) : (
        <IconContainer>
          <Icon name={icon} size={2} />
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

  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.yellow300}66;
  }
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
