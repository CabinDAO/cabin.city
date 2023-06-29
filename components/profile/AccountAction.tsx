import styled from 'styled-components'
import { Caption } from '../core/Typography'
import { Button } from '../core/Button'
import { useDeviceSize } from '../hooks/useDeviceSize'
import { Tooltip } from '../core/Tooltip'
import { truncate } from '@/utils/display-utils'

interface AccountActionProps {
  onClick?: () => void
  actionCTA?: string
  fieldTitle: string
  fieldValue: string
}

export const AccountAction = ({
  actionCTA,
  fieldTitle,
  fieldValue,
  onClick,
}: AccountActionProps) => {
  const { deviceSize } = useDeviceSize()

  return (
    <Container>
      <TitleValue>
        <OpaqueCaption>{fieldTitle}</OpaqueCaption>
        <Tooltip tooltip={fieldValue} position="top">
          <Caption emphasized>{truncate(fieldValue, 25)}</Caption>
        </Tooltip>
      </TitleValue>
      {actionCTA ? (
        <ActionButton variant="tertiary" onClick={onClick}>
          {actionCTA}
        </ActionButton>
      ) : (
        // Invisible button to keep the layout consistent
        deviceSize !== 'mobile' && <InvisibleButton>null</InvisibleButton>
      )}
    </Container>
  )
}

const InvisibleButton = styled(Button)`
  visibility: hidden;
`

const Container = styled.div`
  display: flex;
  border: 0.1rem solid ${({ theme }) => theme.colors.green900}1A; // 10% opacity
  padding: 1.2rem;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.4rem;
  align-items: center;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    justify-content: space-between;
    gap: 0;
  }
`

const TitleValue = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
  text-align: center;

  ${({ theme }) => theme.bp.md} {
    align-items: flex-start;
  }
`

const OpaqueCaption = styled(Caption)`
  opacity: 0.75;
`

const ActionButton = styled(Button)`
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: auto;
  }
`
