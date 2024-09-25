import styled, { css } from 'styled-components'
import { ColorName } from '@/styles/theme'
import Image from 'next/image'
import { cloudflareImageUrl } from '@/lib/image'
import { Circle } from '@/components/core/Circle'
import LoadingSpinner from '@/components/core/LoadingSpinner'
import defaultAvatar from '@/components/profile/default-avatar.png'

export const Avatar = ({
  srcCfId,
  size,
  hoverShadow,
  onClick,
  color,
  isLoading = false,
}: {
  srcCfId: undefined | null | string
  size: number
  hoverShadow?: boolean
  onClick?: VoidFunction
  color?: ColorName
  isLoading?: boolean
  onRendered?: VoidFunction
}) => {
  const srcUrl = !srcCfId ? null : cloudflareImageUrl(srcCfId)

  return (
    <StyledCircle
      onClick={onClick}
      size={size}
      shadowMode={hoverShadow ? 'hover' : 'never'}
      color={color}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Image
          alt="Avatar"
          src={srcUrl || defaultAvatar.src}
          unoptimized={!srcUrl} // idk why there are server-side errors without this
          width={size * 10}
          height={size * 10}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: '50%',
          }}
        />
      )}
    </StyledCircle>
  )
}

const StyledCircle = styled(Circle)<{
  onClick?: VoidFunction
}>`
  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `}

  position: relative; // need this because the image inside has 'fill' attribute
`
