import styled from 'styled-components'
import { InputText } from '@/components/core/InputText'
import { AvatarSetup } from '../AvatarSetup'
import { MAX_DISPLAY_NAME_LENGTH } from '../constants'
import { validName } from '../validations'
import { UpdateProfileProps } from './UpdateProfileProps'
import { DisplayNameInputContainer } from '../styles'
import { FieldAvailability } from '@/components/core/FieldAvailability'
import {
  useGetProfileByNameLazyQuery,
  useUpdateProfileMutation,
} from '@/generated/graphql'
import { useEffect, useState } from 'react'
import { useExternalUser } from '@/components/auth/useExternalUser'
import { H3 } from '@/components/core/Typography'
import { AccountAction } from '../AccountAction'
import useEns from '@/components/hooks/useEns'
import { shortenedAddress } from '@/utils/display-utils'
import { usePrivy } from '@privy-io/react-auth'
import { useModal } from '@/components/hooks/useModal'
import { ChangeEmailConfirmationModal } from '@/components/core/ChangeEmailConfirmationModal'

export const Identity = ({
  editProfileInput,
  onChange,
  user,
}: UpdateProfileProps) => {
  const avatar = editProfileInput?.hasOwnProperty('avatar')
    ? editProfileInput.avatar
    : user?.avatar
  const { externalUser } = useExternalUser()
  const email = externalUser?.email?.address ?? user?.email
  const name = editProfileInput?.name ?? user?.name
  const [getProfileByName] = useGetProfileByNameLazyQuery()
  const [available, setAvailable] = useState(true)
  const [displayAvailability, setDisplayAvailability] = useState(false)
  const { ens } = useEns(externalUser?.wallet?.address)
  const walletDisplay = ens ?? shortenedAddress(externalUser?.wallet?.address)
  const isEmbeddedWallet = externalUser?.wallet?.walletClient === 'privy'
  const { linkEmail, unlinkEmail, exportWallet } = usePrivy()
  const [updateProfile] = useUpdateProfileMutation()
  const { showModal } = useModal()

  const handleEmailRelink = async () => {
    showModal(() => (
      <ChangeEmailConfirmationModal onConfirm={confirmEmailRelink} />
    ))
  }

  const confirmEmailRelink = async () => {
    if (externalUser?.email?.address && !isEmbeddedWallet) {
      // TODO: do not unlink prematurely
      await unlinkEmail(externalUser?.email?.address)
    }
    linkEmail()
  }

  useEffect(() => {
    if (
      externalUser?.email?.address &&
      user.email &&
      externalUser.email.address !== user.email
    ) {
      updateProfile({
        variables: {
          id: user._id,
          data: {
            email: externalUser.email.address,
          },
        },
      })
    }
  }, [externalUser?.email?.address, updateProfile, user])

  const onDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayAvailability(false)
    onChange({ ...editProfileInput, name: e.target.value })
  }

  const handleDisplayNameValidation = async () => {
    setDisplayAvailability(false)
    const displayName = editProfileInput?.name ?? ''

    if (!validName(displayName) || displayName === user.name) {
      setAvailable(true)
      return
    }

    const response = await getProfileByName({
      variables: { name: displayName.trim() },
    })

    const existingName = response.data?.profileByName?.name

    if (existingName !== user?.name) {
      setDisplayAvailability(true)
      setAvailable(!response.data?.profileByName?._id)
    } else {
      setDisplayAvailability(false)
      setAvailable(true)
    }
  }

  return (
    <AboutContainer>
      <AvatarSetup
        avatar={avatar}
        onNftSelected={(avatar) => onChange({ ...editProfileInput, avatar })}
      />
      <InputGroup>
        <DisplayNameInputContainer>
          <InputText
            id="displayName"
            error={!validName(name, !available)}
            required
            label="Display Name"
            onBlur={handleDisplayNameValidation}
            value={name}
            onChange={onDisplayNameChange}
            helperText={`${name.length ?? 0}/${MAX_DISPLAY_NAME_LENGTH}`}
          />
          {displayAvailability && <FieldAvailability available={available} />}
        </DisplayNameInputContainer>
      </InputGroup>
      <InputGroup>
        <AccountContainer>
          <H3>Account</H3>
          <InputGroup>
            <AccountAction
              fieldTitle="Email"
              fieldValue={email}
              onClick={handleEmailRelink}
              actionCTA={!isEmbeddedWallet ? 'Change Email' : undefined}
            />
            <AccountAction
              fieldTitle="Wallet"
              fieldValue={walletDisplay ?? ''}
              onClick={exportWallet}
              actionCTA={isEmbeddedWallet ? 'Export wallet' : undefined}
            />
          </InputGroup>
        </AccountContainer>
      </InputGroup>
    </AboutContainer>
  )
}

const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 2.4rem;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 1.6rem;

  ${({ theme }) => theme.bp.lg} {
    flex-direction: row;
    gap: 2.4rem;
  }
`
