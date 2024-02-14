import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InputText } from '@/components/core/InputText'
import { AvatarSetup } from '../AvatarSetup'
import { MAX_DISPLAY_NAME_LENGTH } from '../constants'
import { isValidName } from '../validations'
import { UpdateProfileProps } from './UpdateProfileProps'
import { DisplayNameInputContainer } from '../styles'
import { useExternalUser } from '@/components/auth/useExternalUser'
import { H3 } from '@/components/core/Typography'
import { AccountAction } from '../AccountAction'
import useEns from '@/components/hooks/useEns'
import { shortenedAddress } from '@/utils/display-utils'
import { usePrivy } from '@privy-io/react-auth'
import { useModal } from '@/components/hooks/useModal'
import { ChangeEmailConfirmationModal } from '@/components/core/ChangeEmailConfirmationModal'
import { useBackend } from '@/components/hooks/useBackend'
import { ProfileEditParams, ProfileEditResponse } from '@/utils/types/profile'

export const Identity = ({
  user,
  profileEditParams,
  onChange,
}: UpdateProfileProps) => {
  const { showModal } = useModal()

  const name = profileEditParams?.name ?? user?.name
  const avatar = profileEditParams?.hasOwnProperty('avatar')
    ? profileEditParams.avatar
    : user?.avatar

  const { externalUser } = useExternalUser()
  const email = externalUser?.email?.address ?? user?.email
  const { ens } = useEns(user.walletAddress)
  const walletDisplay = ens ?? shortenedAddress(user.walletAddress)
  const isEmbeddedWallet = externalUser?.wallet?.walletClient === 'privy'
  const { linkEmail, unlinkEmail, exportWallet } = usePrivy()

  const { useMutate } = useBackend()
  const { trigger: updateProfile } = useMutate<ProfileEditResponse>(
    user ? ['PROFILE', { externId: user.externId }] : null
  )

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
        profileExternId: user.externId,
        data: {
          email: externalUser.email.address,
        },
      } as ProfileEditParams)
    }
  }, [externalUser?.email?.address, updateProfile, user])

  const onDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...profileEditParams, name: e.target.value })
  }

  return (
    <AboutContainer>
      <AvatarSetup
        avatar={avatar}
        onNftSelected={(avatar) => onChange({ ...profileEditParams, avatar })}
      />
      <InputGroup>
        <DisplayNameInputContainer>
          <InputText
            id="displayName"
            error={!isValidName(name)}
            required
            label="Display Name"
            value={name}
            onChange={onDisplayNameChange}
            helperText={`${name.length ?? 0}/${MAX_DISPLAY_NAME_LENGTH}`}
          />
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
              fieldTooltip={externalUser?.wallet?.address}
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
