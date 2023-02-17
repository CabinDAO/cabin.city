import { OwnedNft } from 'alchemy-sdk'
import { useState } from 'react'
import styled from 'styled-components'
import { Avatar } from '../core/Avatar'
import { Button } from '../core/Button'
import { InputText } from '../core/InputText'
import { useModal } from '../hooks/useModal'
import { RegistrationParams } from './RegistrationView'
import { SelectNftModal } from './SelectNftModal'

const Container = styled.div`
  margin: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2.4rem;
`

const AvatarSetup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 2.4rem;
  width: 100%;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  width: 100%;
`

const SubmitButton = styled(Button)`
  align-self: flex-end;
`

const MAX_DISPLAY_NAME_LENGTH = 48

interface RegistrationFormProps {
  onSubmit: ({ email, displayName, avatarUrl }: RegistrationParams) => void
  nfts: OwnedNft[]
}

export const RegistrationForm = ({ onSubmit, nfts }: RegistrationFormProps) => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined)

  const { showModal, hideModal } = useModal()
  const [displayError, setDisplayError] = useState(false)

  const handleClick = () => {
    showModal(() => <SelectNftModal nfts={nfts} onSelect={onAvatarSelected} />)
  }

  const onDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayError(false)
    if (e.target.value.length > MAX_DISPLAY_NAME_LENGTH) return
    setDisplayName(e.target.value)
  }

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayError(false)
    setEmail(e.target.value)
  }

  const handleOnSubmit = () => {
    setDisplayError(true)
    onSubmit({ email, displayName, avatarUrl: avatarUrl || '' })
  }

  const onAvatarSelected = (avatarUrl: string) => {
    setAvatarUrl(avatarUrl)
    hideModal()
  }

  return (
    <Container>
      <AvatarSetup>
        <Avatar onClick={handleClick} size={8.8} hoverShadow src={avatarUrl} />
        <Button variant="tertiary" onClick={() => setAvatarUrl(undefined)}>
          Remove
        </Button>
      </AvatarSetup>
      <InputGroup>
        <InputText
          id="displayName"
          error={displayError && displayName.length === 0}
          required
          label="Display Name"
          value={displayName}
          onChange={onDisplayNameChange}
          helperText={`${displayName.length}/${MAX_DISPLAY_NAME_LENGTH}`}
        />
        <InputText
          id="email"
          error={displayError && email.length === 0}
          required
          label="Email"
          value={email}
          onChange={onEmailChange}
        />
      </InputGroup>
      <SubmitButton onClick={handleOnSubmit} variant="primary">
        Continue
      </SubmitButton>
    </Container>
  )
}
