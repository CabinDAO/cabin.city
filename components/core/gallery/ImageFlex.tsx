import styled, { css } from 'styled-components'
import Image, { ImageProps } from 'next/image'
import { HTMLAttributes } from 'react'

interface ImageFlexProps extends ImageProps {
  height?: number
  className?: string
  aspectRatio?: number
  width?: number
}

export const ImageFlex = ({
  aspectRatio,
  width,
  height,
  className,
  style,
  ...imageProps
}: ImageFlexProps) => {
  if (aspectRatio && height) {
    throw new Error('Both aspectRatio and height cannot be set simultaneously')
  }

  return (
    <ImageContainer height={height} width={width} className={className}>
      {aspectRatio ? (
        <ImageSizing aspectRatio={aspectRatio}>
          <Image
            {...imageProps}
            alt={imageProps.alt}
            fill
            style={{ ...style, objectFit: 'cover', objectPosition: 'center' }}
          />
        </ImageSizing>
      ) : (
        <Image
          {...imageProps}
          alt={imageProps.alt}
          fill
          style={{ ...style, objectFit: 'cover', objectPosition: 'center' }}
        />
      )}
    </ImageContainer>
  )
}

interface ImageContainerProps extends HTMLAttributes<HTMLDivElement> {
  height?: number
  className?: string
  width?: number
}

const ImageContainer = styled.div<ImageContainerProps>`
  ${({ width, height }) => css`
    position: relative;

    ${height &&
    `
      height: ${height}rem;
    `}

    ${height &&
    width &&
    `
      max-width: ${width}rem;
      width: 100%;
    `}

    ${!height &&
    `
      width: ${width ? `${width}rem` : '100%'};
    `}
  `}
`

interface ImageSizingProps extends HTMLAttributes<HTMLDivElement> {
  aspectRatio: number
}

const ImageSizing = styled.div<ImageSizingProps>`
  position: relative;
  padding: ${({ aspectRatio }) => `${50 / aspectRatio}% 0`};
`
