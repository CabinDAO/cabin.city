import { CitizenshipStatus } from '@/utils/types/profile'
import { citizenshipInfoFromStatus } from '@/utils/citizenship'
import { RoleInfo } from '@/utils/roles'
import styled from 'styled-components'
import Icon from './Icon'
import { Tooltip } from './Tooltip'

const ICON_SIZE = 1.2
interface ProfileIconsProps {
  citizenshipStatus?: CitizenshipStatus | null | undefined
  roleInfos: RoleInfo[]
  size?: number
}

export const ProfileIcons = (props: ProfileIconsProps) => {
  const { citizenshipStatus, size } = props

  const citizenshipInfo = citizenshipInfoFromStatus(citizenshipStatus)

  return (
    <Container>
      {citizenshipInfo && (
        <Tooltip tooltip={citizenshipInfo.text}>
          <Icon
            key="citizenship"
            name={citizenshipInfo.iconName}
            color="green900"
            size={size ?? ICON_SIZE}
          />
        </Tooltip>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`
