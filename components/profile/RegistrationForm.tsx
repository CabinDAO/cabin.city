import { ProfileAvatarInput } from '@/generated/graphql'
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
  onSubmit: (params: RegistrationParams) => void
}

export const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState<ProfileAvatarInput | undefined>()

  const { showModal, hideModal } = useModal()
  const [displayError, setDisplayError] = useState(false)

  const openSelectNftModal = () => {
    showModal(() => <SelectNftModal onSelect={onNftSelected} />)
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

  const handleSubmit = () => {
    setDisplayError(true)
    onSubmit({ email, displayName, avatar })
  }

  const onNftSelected = (nft: OwnedNft) => {
    const url = nft.media[0]?.thumbnail

    if (!url) {
      throw new Error('NFT does not have a media URL')
    }
    setAvatar({
      url,
      contractAddress: nft.contract.address,
      title: nft.title,
      tokenId: nft.tokenId,
      tokenUri: nft.tokenUri?.raw,
    })
    hideModal()
  }

  return (
    <Container>
      <AvatarSetup>
        <Avatar
          onClick={openSelectNftModal}
          size={8.8}
          hoverShadow
          src={avatar?.url}
        />
        {avatar ? (
          <Button variant="tertiary" onClick={() => setAvatar(undefined)}>
            Remove
          </Button>
        ) : (
          <Button variant="tertiary" onClick={openSelectNftModal}>
            Choose avatar
          </Button>
        )}
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
      <SubmitButton onClick={handleSubmit} variant="primary">
        Continue
      </SubmitButton>
    </Container>
  )
}
