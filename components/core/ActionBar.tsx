import styled from 'styled-components'
import { Button } from './Button'
import { MainContent } from '../layouts/common.styles'

const defaultButtonConfig = {
  label: 'OK',
  onClick: undefined,
}

export type ButtonConfig = {
  label: string
  onClick?: () => void
}

interface ActionBarProps {
  primaryButton?: ButtonConfig
  secondaryButton?: ButtonConfig
}

export const ActionBar = ({
  primaryButton = defaultButtonConfig,
  secondaryButton = defaultButtonConfig,
}: ActionBarProps) => {
  return (
    <ActionBarContainer>
      <MainContent>
        <ButtonContainer>
          <Button variant="link" onClick={secondaryButton.onClick}>
            {secondaryButton.label}
          </Button>
          <Button variant="primary" onClick={primaryButton.onClick}>
            {primaryButton.label}
          </Button>
        </ButtonContainer>
      </MainContent>
    </ActionBarContainer>
  )
}

const ActionBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.yellow300};
  border-top: 1px solid ${({ theme }) => theme.colors.green900};
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: min-content;
  align-self: flex-end;
  padding: 0.8rem;
  gap: 0.8rem;
`
