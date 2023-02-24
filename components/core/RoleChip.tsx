import { ProfileRoleType } from '@/generated/graphql'
import { pxToRem } from '@/utils/display-utils'
import { roleInfoFromType } from '@/utils/roles'
import Image from 'next/image'
import styled from 'styled-components'
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
  const roleInfo = roleInfoFromType(roleType)
  return (
    <StyledContentCard selected={selected}>
      <ContentContainer>
        <InnerContainer>
          <Image
            src={roleInfo.imagePath}
            alt={roleInfo.name}
            width={IMAGE_SIZE_PX}
            height={IMAGE_SIZE_PX}
          />
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
  max-width: ${pxToRem(MAX_CONTAINER_WIDTH_PX)}rem;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.yellow300 : theme.colors.yellow200};
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const InnerContainer = styled.div`
  padding: ${pxToRem(INNER_CONTAINER_PADDING_PX)}rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

const RoleDataContainer = styled.div`
  padding: ${pxToRem(INNER_CONTAINER_PADDING_PX)}rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 1.6rem;
  padding-bottom: 1.2rem;
`

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`
