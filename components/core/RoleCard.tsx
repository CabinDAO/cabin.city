import { range } from '@/utils/array'
import { pxToRem } from '@/utils/display-utils'
import { LevelInfo } from '@/utils/levels'
import { RoleInfo } from '@/utils/roles'
import Image from 'next/image'
import styled from 'styled-components'
import { DeviceSize, useDeviceSize } from '../hooks/useDeviceSize'
import { ContentCard } from './ContentCard'
import Icon from './Icon'
import IconButton from './IconButton'
import { Body2, Caption, H3 } from './Typography'

type RoleCardVariant = 'default' | 'horizontal'

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
}

export const RoleCard = ({
  roleInfo,
  levelInfo,
  externalUrl,
  variant = 'default',
}: RoleCardProps) => {
  const { deviceSize } = useDeviceSize()
  const imageSize = ImageSize[variant][deviceSize]
  const paddingSize = PaddingSize[variant][deviceSize]
  const maxWidth =
    variant === 'default' ? pxToRem(imageSize + paddingSize * 2) : undefined

  return (
    <ContentCard
      shape="notch"
      maxWidth={maxWidth}
      notchSize={variant === 'horizontal' ? 1.6 : paddingSize / 10}
    >
      <ContentContainer>
        <InnerContainer variant={variant} paddingSize={paddingSize}>
          <Image
            src={roleInfo.imagePath}
            alt={roleInfo.name}
            width={ImageSize[variant][deviceSize]}
            height={ImageSize[variant][deviceSize]}
          />
          <RoleDataContainer variant={variant} paddingSize={paddingSize}>
            <RoleNameContainer>
              <H3>{roleInfo.name}</H3>
              <Icon name={roleInfo.iconName} size={1.3} />
              {externalUrl && (
                <a href={externalUrl} target="_blank" rel="noreferrer">
                  <IconButton icon="external-link" size={1.3} />
                </a>
              )}
            </RoleNameContainer>
            <Body2>{roleInfo.description}</Body2>
          </RoleDataContainer>
        </InnerContainer>
        <LevelContainer variant={variant} paddingSize={paddingSize}>
          <LevelLabelCaption>LEVEL</LevelLabelCaption>
          <LevelBars levelInfo={levelInfo} />
          <LevelCaption emphasized>{levelInfo.name}</LevelCaption>
        </LevelContainer>
      </ContentContainer>
    </ContentCard>
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

  ${({ theme }) => theme.bp.md} {
    max-width: ${({ variant }) => (variant === 'horizontal' ? '60%' : '100%')};
  }

  ${({ theme }) => theme.bp.lg} {
    max-width: 100%;
    gap: 1.6rem;
  }
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
    } else {
      return `
      align-items: center;
      flex-direction: column;
      padding: ${pxToRem(paddingSize)}rem;
      `
    }
  }}
`

const RoleNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`

const LevelContainer = styled.div<ContainerProps>`
  padding: 0 ${({ paddingSize }) => pxToRem(paddingSize)}rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: solid 1px ${(props) => props.theme.colors.green900};
`

const LevelCaption = styled(Caption)`
  text-transform: uppercase;
  flex: 1;
  text-align: right;
`

const LevelLabelCaption = styled(Caption)`
  text-transform: uppercase;
  flex: 1;
`

const LevelBars = ({ levelInfo }: { levelInfo: LevelInfo }) => {
  return (
    <LevelBarsContainer>
      {range(levelInfo.number).map((i) => (
        <LevelBar key={i} />
      ))}
    </LevelBarsContainer>
  )
}

const LevelBarsContainer = styled.div`
  display: flex;
  gap: 0.4rem;
`

const LevelBar = styled.div`
  width: 0.6rem;
  height: 2.5rem;
  background-color: ${(props) => props.theme.colors.green400};
  border-left: solid 1px ${(props) => props.theme.colors.green900};
  border-right: solid 1px ${(props) => props.theme.colors.green900};

  ${({ theme }) => theme.bp.md} {
    height: 3rem;
    width: 0.8rem;
  }
`
