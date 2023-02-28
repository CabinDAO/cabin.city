import { CitizenshipStatus } from '@/generated/graphql'
import { citizenshipInfoFromStatus } from '@/utils/citizenship'
import { RoleInfo } from '@/utils/roles'
import styled from 'styled-components'
import Icon from './Icon'
import { Tooltip } from './Tooltip'

const ICON_SIZE = 1.2
interface ProfileIconsProps {
  citizenshipStatus?: CitizenshipStatus | null | undefined
  roleInfos: RoleInfo[]
}

export const ProfileIcons = (props: ProfileIconsProps) => {
  const { citizenshipStatus, roleInfos } = props

  const citizenshipInfo = citizenshipInfoFromStatus(citizenshipStatus)

  return (
    <Container>
      {citizenshipInfo && (
        <Tooltip tooltip={citizenshipInfo.text}>
          <Icon
            key="citizenship"
            name={citizenshipInfo.iconName}
            color="green900"
            size={ICON_SIZE}
          />
        </Tooltip>
      )}
      {roleInfos.map((roleInfo) => (
        <Tooltip key={roleInfo.name} tooltip={roleInfo.name}>
          <Icon name={roleInfo.iconName} color="yellow600" size={ICON_SIZE} />
        </Tooltip>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`
