import styled from 'styled-components'
import Icon from './Icon'
import { Overline } from './Typography'

interface CardActionsProps {
  onDelete: () => void
  onEdit: () => void
}

export const CardActions = ({ onDelete, onEdit }: CardActionsProps) => {
  return (
    <CardActionsContainer>
      <DeleteAction onClick={onDelete}>
        <Icon name="trash" size={1.2} />
        <Overline>Delete</Overline>
      </DeleteAction>
      <Action onClick={onEdit}>
        <Icon name="pencil" size={1.2} />
        <Overline>Edit</Overline>
      </Action>
    </CardActionsContainer>
  )
}

const CardActionsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 1.6rem 2.4rem;
  border: solid 1px ${({ theme }) => theme.colors.green900};
  border-top: none;
`

const Action = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;

  ${Overline} {
    line-height: 1;
  }
`

const DeleteAction = styled(Action)`
  color: ${({ theme }) => theme.colors.red700};
  --icon-color: ${({ theme }) => theme.colors.red700};
`
