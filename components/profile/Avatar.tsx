import styled, { css } from 'styled-components'
import { ColorName } from '@/styles/theme'
import Image from 'next/image'
import { Circle } from '@/components/core/Circle'
import LoadingSpinner from '@/components/core/LoadingSpinner'
import defaultAvatar from '@/components/profile/default-avatar.png'

type AvatarSrc =
  | undefined
  | null
  | string
  | {
      avatarUrl: string
    }
// | {
//     avatarImageId: string
//     avatarFilename: string
//   }

export const Avatar = ({
  src,
  size,
  hoverShadow,
  onClick,
  color,
  isLoading = false,
}: {
  src: AvatarSrc
  size: number
  hoverShadow?: boolean
  onClick?: VoidFunction
  color?: ColorName
  isLoading?: boolean
  onRendered?: VoidFunction
}) => {
  const srcUrl = !src
    ? null
    : typeof src === 'string'
    ? src
    : // : 'avatarImageId' in src
      // ? cloudflareImageUrl(src.avatarImageId)
      src.avatarUrl

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
