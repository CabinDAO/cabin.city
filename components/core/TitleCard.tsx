import React, { ReactNode, useState } from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import Icon, { IconName } from './Icon'
import { ZoomInCard } from './ZoomInCard'
import { H1 } from './Typography'

interface TitleCardProps {
  title: string
  icon: IconName
  iconHref?: string
  onIconClick?: () => void
  end?: ReactNode | null
  marginTop?: number
}

export const TitleCard = ({
  title,
  icon,
  iconHref,
  onIconClick,
  end,
  marginTop,
}: TitleCardProps) => {
  const [hovered, setHovered] = useState(false)

  return (
    <Container onClick={onIconClick} marginTop={marginTop}>
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

      <ContentContainer>
        <H1 $color="green900">{title}</H1>
        {end}
      </ContentContainer>
    </Container>
  )
}

const Container = styled.div<{
  onClick?: () => void
  marginTop?: number
}>`
  display: flex;
  flex-direction: row;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  background-color: ${({ theme }) => theme.colors.yellow200};
  width: 100%;
  border: 0.1rem solid ${({ theme }) => theme.colors.yellow900};
  box-shadow: 0.8rem 0.8rem 0rem ${({ theme }) => theme.colors.yellow900};
  ${({ marginTop }) => marginTop && `margin-top: ${marginTop}rem;`}
`

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
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem;
  width: 100%;
  text-align: left;
`
