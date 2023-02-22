import { ProfileRoleLevelType, ProfileRoleType } from '@/generated/graphql'
import { range } from '@/utils/array'
import { pxToRem } from '@/utils/display-utils'
import { LevelInfo, levelInfoFromType } from '@/utils/levels'
import { roleInfoFromType } from '@/utils/roles'
import Image from 'next/image'
import styled from 'styled-components'
import { ContentCard } from './ContentCard'
import Icon from './Icon'
import IconButton from './IconButton'
import { Body2, Caption, H3 } from './Typography'

export interface RoleCardProps {
  roleType: ProfileRoleType
  levelType: ProfileRoleLevelType
  externalUrl?: string // This will be undefined if the role is not tied to a hat/token
}

const INNER_CONTAINER_PADDING_PX = 16
const IMAGE_SIZE_PX = 232
const MAX_CONTAINER_WIDTH_PX = IMAGE_SIZE_PX + INNER_CONTAINER_PADDING_PX * 2

export const RoleCard = (props: RoleCardProps) => {
  const roleInfo = roleInfoFromType(props.roleType)
  const levelInfo = levelInfoFromType(props.levelType)

  return (
    <StyledContentCard shape="notch">
      <ContentContainer>
        <InnerContainer>
          <Image
            src={roleInfo.imagePath}
            alt={roleInfo.name}
            width={IMAGE_SIZE_PX}
            height={IMAGE_SIZE_PX}
          />
          <RoleNameContainer>
            <H3>{roleInfo.name}</H3>
            <Icon name={roleInfo.iconName} size={1.2} />
            {props.externalUrl && (
              <a href={props.externalUrl} target="_blank" rel="noreferrer">
                <IconButton icon="external-link" size={1.2} />
              </a>
            )}
          </RoleNameContainer>
          <Body2>{roleInfo.description}</Body2>
        </InnerContainer>
        <LevelContainer>
          <LevelLabelCaption>LEVEL</LevelLabelCaption>
          <LevelBars levelInfo={levelInfo} />
          <LevelCaption emphasized>{levelInfo.name}</LevelCaption>
        </LevelContainer>
      </ContentContainer>
    </StyledContentCard>
  )
}

const StyledContentCard = styled(ContentCard)`
  max-width: ${pxToRem(MAX_CONTAINER_WIDTH_PX)}rem;
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

const RoleNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`

const LevelContainer = styled.div`
  padding: 0 ${pxToRem(INNER_CONTAINER_PADDING_PX)}rem;
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
  width: 0.8rem;
  height: 3rem;
  background-color: ${(props) => props.theme.colors.green400};
  border-left: solid 1px ${(props) => props.theme.colors.green900};
  border-right: solid 1px ${(props) => props.theme.colors.green900};
`
