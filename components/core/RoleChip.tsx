import { RoleType } from '@/utils/types/profile'
import { pxToRem } from '@/utils/display-utils'
import { roleInfoFromType } from '@/utils/roles'
import Image from 'next/image'
import styled from 'styled-components'
import { useDeviceSize } from '../hooks/useDeviceSize'
import { AutofitImage } from './AutofitImage'
import { Checkbox } from './Checkbox'
import { ContentCard } from './ContentCard'
import Icon from './Icon'
import { H5 } from './Typography'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface RoleChipProps {
  roleType: RoleType
  selected?: boolean
  disabled?: boolean
  onSelect?: VoidFunction
}

const INNER_CONTAINER_PADDING_PX = 8
const IMAGE_SIZE_PX = 232
const MAX_CONTAINER_WIDTH_PX = IMAGE_SIZE_PX + INNER_CONTAINER_PADDING_PX * 2

export const RoleChip = ({
  roleType,
  selected,
  disabled,
  onSelect,
}: RoleChipProps) => {
  const { deviceSize } = useDeviceSize()
  const roleInfo = roleInfoFromType(roleType)
  const [isHovered, setHovered] = useState(false)

  return (
    <StyledContentCard selected={selected} hovered={isHovered}>
      <ContentContainer
        onClick={onSelect}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <InnerContainer>
          <OuterImageContainer>
            <motion.div
              animate={{
                scale: isHovered ? 1.05 : 1,
                transition: { duration: 0.3 },
              }}
              initial={false}
              whileTap={{ scale: 1.05 }}
            >
              {deviceSize === 'desktop' ? (
                <Image
                  src={roleInfo.imagePath}
                  alt={roleInfo.name}
                  width={IMAGE_SIZE_PX}
                  height={IMAGE_SIZE_PX}
                />
              ) : (
                <AutofitImage src={roleInfo.imagePath} alt={roleInfo.name} />
              )}
            </motion.div>
          </OuterImageContainer>
        </InnerContainer>
        <RoleDataContainer>
          <CheckboxContainer>
            <Checkbox
              selected={!!selected}
              disabled={disabled}
              onClick={onSelect}
            />
            <H5>{roleInfo.name}</H5>
          </CheckboxContainer>
          <Icon name={roleInfo.iconName} color="yellow600" size={1.7} />
        </RoleDataContainer>
      </ContentContainer>
    </StyledContentCard>
  )
}

interface StyledContentCardProps {
  selected?: boolean
  hovered?: boolean
}

const StyledContentCard = styled(ContentCard)<StyledContentCardProps>`
  max-width: 100%;
  cursor: pointer;

  transition: background-color 0.3s ease-in-out;
  background-color: ${({ theme, selected, hovered }) => {
    if (hovered && !selected) {
      return `rgba(254, 215, 162, 0.24)`
    } else if (selected) {
      return theme.colors.yellow300
    } else {
      return theme.colors.yellow200
    }
  }};

  ${({ theme }) => theme.bp.lg} {
    max-width: ${pxToRem(MAX_CONTAINER_WIDTH_PX)}rem;
  }
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const InnerContainer = styled.div`
  padding: ${pxToRem(INNER_CONTAINER_PADDING_PX)}rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  overflow: hidden;

  ${({ theme }) => theme.bp.lg} {
    gap: 1.6rem;
  }
`

const OuterImageContainer = styled.div`
  display: flex;
  border-radius: 0 0 4.8rem 0;
  overflow: hidden;
  max-width: ${pxToRem(IMAGE_SIZE_PX)}rem;
  max-height: ${pxToRem(IMAGE_SIZE_PX)}rem;
`

const RoleDataContainer = styled.div`
  padding: ${pxToRem(INNER_CONTAINER_PADDING_PX)}rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.bp.lg} {
    padding-right: 1.6rem;
    padding-bottom: 1.2rem;
  }
`

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`
