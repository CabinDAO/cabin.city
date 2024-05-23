import React from 'react'
import { useModal } from '@/components/hooks/useModal'
import styled from 'styled-components'
import { Button } from './Button'
import Icon from '@/components/core/Icon'
import { DeleteConfirmationModal } from '@/components/core/DeleteConfirmationModal'

const defaultButtonConfig = {
  label: 'OK',
  onClick: () => {
    return
  },
}

export type ButtonConfig = {
  label: string
  onClick: VoidFunction
}

interface ActionBarProps {
  primaryButton?: ButtonConfig
  secondaryButton?: ButtonConfig
  trashButton?: ButtonConfig
}

export const ActionBar = ({
  primaryButton = defaultButtonConfig,
  secondaryButton = defaultButtonConfig,
  trashButton,
}: ActionBarProps) => {
  const { showModal } = useModal()

  const handleDelete = () => {
    if (!trashButton) return
    showModal(() => (
      <DeleteConfirmationModal
        entityName={trashButton.label}
        onDelete={trashButton.onClick}
      />
    ))
  }

  return (
    <ActionBarContainer withTrash={!!trashButton}>
      {trashButton && (
        <Button variant="link" onClick={handleDelete}>
          <Icon name={'trash'} size={1.8} color={'red600'}></Icon>
        </Button>
      )}
      <RightButtons>
        {secondaryButton.onClick && (
          <Button variant="link" onClick={secondaryButton.onClick}>
            {secondaryButton.label}
          </Button>
        )}
        <Button variant="primary" onClick={primaryButton.onClick}>
          {primaryButton.label}
        </Button>
      </RightButtons>
    </ActionBarContainer>
  )
}

const ActionBarContainer = styled.div<{ withTrash: boolean }>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.yellow300};
  border-top: 1px solid ${({ theme }) => theme.colors.green900};
  justify-content: ${({ withTrash }) =>
    withTrash ? 'space-between' : 'flex-end'};
  align-self: flex-end;
  padding: 0.8rem;
  gap: 0.8rem;
`

const RightButtons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
