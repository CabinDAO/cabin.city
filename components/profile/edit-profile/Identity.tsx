import React, { useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useExternalUser } from '@/components/auth/useExternalUser'
import { useModal } from '@/components/hooks/useModal'
import useEns from '@/components/hooks/useEns'
import { useBackend } from '@/components/hooks/useBackend'
import {
  ProfileEditParamsType,
  ProfileEditResponse,
} from '@/utils/types/profile'
import { shortenedAddress } from '@/utils/display-utils'
import styled from 'styled-components'
import { MAX_DISPLAY_NAME_LENGTH } from '../constants'
import { H3 } from '@/components/core/Typography'
import { InputText } from '@/components/core/InputText'
import { ChangeEmailConfirmationModal } from '@/components/core/ChangeEmailConfirmationModal'
import { AvatarSetup } from '../AvatarSetup'
import { isValidName } from '../validations'
import { UpdateProfileProps } from '../EditProfileForm'
import { InputContainer } from '../RegistrationForm'
import { AccountAction } from '../AccountAction'

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
        data: {
          email: externalUser.email.address,
        },
      } satisfies ProfileEditParamsType)
    }
  }, [externalUser?.email?.address, updateProfile, user])

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...profileEditParams, name: e.target.value })
  }

  return (
    <AboutContainer>
      <AvatarSetup
        avatar={avatar}
        onNftSelected={(avatar) => onChange({ ...profileEditParams, avatar })}
      />
      <InputGroup>
        <InputContainer>
          <InputText
            error={!isValidName(name)}
            required
            label="Name"
            value={name}
            onChange={onNameChange}
            helperText={`${name.length ?? 0}/${MAX_DISPLAY_NAME_LENGTH}`}
          />
        </InputContainer>
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
