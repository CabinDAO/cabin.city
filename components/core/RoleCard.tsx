import { range } from '@/utils/array'
import { pxToRem } from '@/utils/display-utils'
import { LevelInfo } from '@/utils/levels'
import { RoleInfo } from '@/utils/roles'
import Image from 'next/image'
import styled, { css } from 'styled-components'
import { DeviceSize, useDeviceSize } from '../hooks/useDeviceSize'
import { ZoomInCard } from './ZoomInCard'
import { ContentCard } from './ContentCard'
import Icon from './Icon'
import IconButton from './IconButton'
import { Body2, Caption, H3 } from './Typography'

type RoleCardVariant = 'default' | 'horizontal' | 'small'

type NumberConfigMap = {
  [key in RoleCardVariant]: {
    [key in DeviceSize]: number
  }
}

export interface RoleCardProps {
  roleInfo: RoleInfo
  levelInfo: LevelInfo
  externalUrl?: string // This will be undefined if the role is not tied to a hat/token
  variant?: RoleCardVariant
  hovered?: boolean
}

const PaddingSize: NumberConfigMap = {
  default: {
    desktop: 16,
    mobile: 12,
    tablet: 16,
  },
  horizontal: {
    desktop: 16,
    mobile: 8,
    tablet: 16,
  },
  small: {
    desktop: 12,
    mobile: 12,
    tablet: 12,
  },
}

const ImageSize: NumberConfigMap = {
  default: {
    desktop: 232,
    mobile: 170,
    tablet: 232,
  },
  horizontal: {
    desktop: 96,
    mobile: 96,
    tablet: 96,
  },
  small: {
    desktop: 185,
    mobile: 185,
    tablet: 185,
  },
}

const sf = 0.8

export const RoleCard = ({
  roleInfo,
  levelInfo,
  externalUrl,
  variant = 'default',
  hovered = false,
}: RoleCardProps) => {
  const { deviceSize } = useDeviceSize()
  const imageSize = ImageSize[variant][deviceSize]
  const paddingSize = PaddingSize[variant][deviceSize]
  const maxWidthMap = {
    horizontal: undefined,
    small: pxToRem(imageSize + paddingSize * 2),
    default: pxToRem(imageSize + paddingSize * 2),
  }
  const isSmall = variant === 'small'
  const notchSizeMap = {
    horizontal: 1.6,
    small: (sf * paddingSize) / 10,
    default: paddingSize / 10,
  }

  return (
    <ZoomInCard hovered={hovered}>
      <ContentCard
        shape="notch"
        maxWidth={maxWidthMap[variant]}
        notchSize={notchSizeMap[variant]}
      >
        <ContentContainer>
          <InnerContainer variant={variant} paddingSize={paddingSize}>
            <Image
              quality={40}
              src={roleInfo.imagePath}
              alt={roleInfo.name}
              width={ImageSize[variant][deviceSize]}
              height={ImageSize[variant][deviceSize]}
            />
            <RoleDataContainer variant={variant} paddingSize={paddingSize}>
              <RoleNameContainer variant={variant} paddingSize={paddingSize}>
                <RoleName variant={variant} paddingSize={paddingSize}>
                  {roleInfo.name}
                </RoleName>
                <Icon
                  name={roleInfo.iconName}
                  size={isSmall ? 1.3 * sf : 1.3}
                />
                {externalUrl && (
                  <a
                    href={externalUrl}
                    target="_blank"
                    rel="noopener nofollow noreferrer"
                  >
                    <IconButton
                      icon="external-link"
                      size={isSmall ? 1.3 * sf : 1.3}
                    />
                  </a>
                )}
              </RoleNameContainer>
              <RoleDescription variant={variant} paddingSize={paddingSize}>
                {roleInfo.description}
              </RoleDescription>
            </RoleDataContainer>
          </InnerContainer>
          <LevelContainer variant={variant} paddingSize={paddingSize}>
            <LevelLabelCaption variant={variant} paddingSize={paddingSize}>
              LEVEL
            </LevelLabelCaption>
            <LevelBars
              variant={variant}
              paddingSize={paddingSize}
              levelInfo={levelInfo}
            />
            <LevelCaption
              variant={variant}
              paddingSize={paddingSize}
              emphasized
            >
              {levelInfo.name}
            </LevelCaption>
          </LevelContainer>
        </ContentContainer>
      </ContentCard>
    </ZoomInCard>
  )
}

interface ContainerProps {
  variant: RoleCardVariant
  paddingSize: number
}

const RoleDataContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding-right: 1.6rem;
  min-height: 7.5rem;

  ${({ theme }) => theme.bp.md} {
    max-width: ${({ variant }) => (variant === 'horizontal' ? '60%' : '100%')};
  }

  ${({ theme }) => theme.bp.lg} {
    max-width: 100%;
    gap: 1.6rem;
    min-height: 9.5rem;
  }

  ${({ variant, theme }) =>
    variant === 'small' &&
    css`
      gap: ${sf * 0.8}rem;
      padding-right: ${sf * 1.6}rem;

      ${theme.bp.lg} {
        gap: ${sf * 1.6}rem;
        min-height: ${sf * 9.5}rem;
      }
    `}
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const InnerContainer = styled.div<ContainerProps>`
  padding-top: 3.2rem;
  padding-bottom: 1.6rem;
  display: flex;
  flex-direction: row;
  gap: 1.6rem;

  ${({ variant, paddingSize }) => {
    if (variant === 'horizontal') {
      return `
      `
    }

    if (variant === 'small') {
      return `
        align-items: center;
        flex-direction: column;
        padding: ${pxToRem(sf * paddingSize)}rem;
      `
    }

    return `
      align-items: center;
      flex-direction: column;
      padding: ${pxToRem(paddingSize)}rem;
      `
  }}
`

const RoleNameContainer = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  ${({ variant }) =>
    variant === 'small' &&
    css`
      gap: ${sf * 0.6}rem;
    `}
`

const RoleName = styled(H3)<ContainerProps>`
  ${({ variant }) =>
    variant === 'small' &&
    css`
      font-size: ${sf * 1.6}rem;
    `}
`

const RoleDescription = styled(Body2)<ContainerProps>`
  ${({ variant }) =>
    variant === 'small' &&
    css`
      font-size: ${sf * 1.3}rem;
    `}
`

const LevelContainer = styled.div<ContainerProps>`
  padding: 0 ${({ paddingSize }) => pxToRem(paddingSize)}rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: solid 1px ${(props) => props.theme.colors.green900};
`

const LevelCaption = styled(Caption)<ContainerProps>`
  text-transform: uppercase;
  flex: 1;
  text-align: right;

  ${({ variant }) =>
    variant === 'small' &&
    css`
      font-size: ${sf * 1.3}rem;
    `}
`

const LevelLabelCaption = styled(Caption)<ContainerProps>`
  text-transform: uppercase;
  flex: 1;

  ${({ variant }) =>
    variant === 'small' &&
    css`
      font-size: ${sf * 1.3}rem;
    `}
`

const LevelBars = ({
  levelInfo,
  variant,
  paddingSize,
}: {
  levelInfo: LevelInfo
} & ContainerProps) => {
  return (
    <LevelBarsContainer variant={variant} paddingSize={paddingSize}>
      {range(levelInfo.number).map((i) => (
        <LevelBar key={i} variant={variant} paddingSize={paddingSize} />
      ))}
    </LevelBarsContainer>
  )
}

const LevelBarsContainer = styled.div<ContainerProps>`
  display: flex;
  gap: 0.4rem;

  ${({ variant }) =>
    variant === 'small' &&
    css`
      gap: ${sf * 0.4}rem;
    `}
`

const LevelBar = styled.div<ContainerProps>`
  width: 0.6rem;
  height: 2.5rem;
  background-color: ${(props) => props.theme.colors.green400};
  border-left: solid 1px ${(props) => props.theme.colors.green900};
  border-right: solid 1px ${(props) => props.theme.colors.green900};

  ${({ theme }) => theme.bp.md} {
    height: 3rem;
    width: 0.8rem;
  }

  ${({ variant, theme }) =>
    variant === 'small' &&
    css`
      width: ${sf * 0.6}rem;
      height: ${sf * 2.5}rem;

      ${theme.bp.md} {
        height: ${sf * 3}rem;
        width: ${sf * 0.8}rem;
      }
    `}
`
