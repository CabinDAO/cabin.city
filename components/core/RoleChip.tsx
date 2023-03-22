import { ProfileRoleType } from '@/generated/graphql'
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

interface RoleChipProps {
  roleType: ProfileRoleType
  selected?: boolean
  disabled?: boolean
  onSelect?: () => void
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

  return (
    <StyledContentCard selected={selected}>
      <ContentContainer>
        <InnerContainer>
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
}

const StyledContentCard = styled(ContentCard)<StyledContentCardProps>`
  max-width: 100%;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.yellow300 : theme.colors.yellow200};

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
  height: 100%;

  ${({ theme }) => theme.bp.lg} {
    gap: 1.6rem;
  }
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
