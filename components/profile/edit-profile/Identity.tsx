import React, { useEffect } from 'react'
import { Address } from 'viem'
import { useModal } from '@/components/hooks/useModal'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { usePrivy } from '@privy-io/react-auth'
import { useProfile } from '@/components/auth/useProfile'
import { useExternalUser } from '@/components/auth/useExternalUser'
import useEns from '@/components/hooks/useEns'
import { useBackend } from '@/components/hooks/useBackend'
import {
  ProfileEditParamsType,
  ProfileEditResponse,
} from '@/utils/types/profile'
import { shortenedAddress, truncate } from '@/utils/display-utils'
import styled from 'styled-components'
import { H3 } from '@/components/core/Typography'
import { UpdateProfileProps } from '../EditProfileForm'
import { Caption } from '@/components/core/Typography'
import { Button } from '@/components/core/Button'
import { ActionConfirmationModal } from '@/components/core/ActionConfirmationModal'
import { CopyToClipboard } from '@/components/core/CopyToClipboard'

// TODO: deal with creating embedded wallet
// embedded wallets cannot be unlinked, so if you have one you should still be able to link an external wallet
// so also handle the case where you have both an embedded and external wallet. eg when you unlink an external wallet, it falls back to the embedded wallet

export const Identity = ({ user, profileEditParams }: UpdateProfileProps) => {
  const { externalUser } = useExternalUser()
  const { refetchProfile } = useProfile()
  const { showModal } = useModal()

  const email = externalUser?.email?.address ?? user?.email
  const walletAddress = profileEditParams?.walletAddress ?? user?.walletAddress

  const { ens } = useEns(walletAddress)
  const hasWallet = !!externalUser?.wallet
  const isEmbeddedWallet =
    hasWallet && externalUser?.wallet?.walletClient === 'privy'
  const { updateEmail, exportWallet, linkWallet, unlinkWallet, createWallet } =
    usePrivy()

  const { useMutate } = useBackend()
  const { trigger: updateProfile } = useMutate<ProfileEditResponse>(
    user ? ['PROFILE', { externId: user.externId }] : null
  )

  useEffect(() => {
    // this happens when a user updates their email in Privy
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

  useEffect(() => {
    // this happens when a user links their wallet to Privy
    if (
      externalUser?.wallet?.address &&
      externalUser.wallet.address !== user.walletAddress
    ) {
      updateProfile({
        data: {
          walletAddress: externalUser.wallet.address as Address,
        },
      } satisfies ProfileEditParamsType).then(() => {
        refetchProfile()
      })
    }
  }, [externalUser?.wallet?.address, updateProfile, user])

  const handleWalletUnlink = async () => {
    if (!user.walletAddress) {
      return
    }

    showModal(() => (
      <ActionConfirmationModal
        title={'Unlink Wallet'}
        text={'Are you sure you want to unlink your wallet?'}
        helpText={'You can link it again at any time.'}
        confirmText={'Unlink'}
        onConfirm={async () => {
          if (!user.walletAddress) {
            return
          }
          const newUserValues = await unlinkWallet(user.walletAddress)

          if (newUserValues.wallet?.address !== user.walletAddress) {
            await updateProfile({
              data: {
                walletAddress: newUserValues.wallet?.address
                  ? (newUserValues.wallet.address as Address)
                  : null,
              },
            } satisfies ProfileEditParamsType)

            refetchProfile()
          }
        }}
      />
    ))
  }

  return (
    <AboutContainer>
      <InputGroup>
        <AccountContainer>
          <H3>Account</H3>
          <InputGroup>
            <AccountAction
              fieldTitle="Email"
              fieldValue={email}
              fieldFullValue={email}
              onClick={updateEmail}
              actionCTA={'Change Email'}
            />
            <AccountAction
              fieldTitle="Crypto Wallet"
              fieldValue={ens || shortenedAddress(walletAddress) || 'None'}
              fieldFullValue={ens || walletAddress || undefined}
              onClick={
                hasWallet
                  ? isEmbeddedWallet
                    ? exportWallet
                    : handleWalletUnlink
                  : linkWallet
              }
              actionCTA={
                hasWallet
                  ? isEmbeddedWallet
                    ? 'Export private key'
                    : 'Unlink wallet'
                  : 'Link wallet'
              }
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

const AccountAction = ({
  actionCTA,
  fieldTitle,
  fieldValue,
  fieldFullValue,
  onClick,
}: {
  onClick?: VoidFunction
  actionCTA?: string
  fieldTitle: string
  fieldValue: string
  fieldFullValue?: string
}) => {
  const { deviceSize } = useDeviceSize()

  return (
    <Container>
      <TitleValue>
        <OpaqueCaption>{fieldTitle}</OpaqueCaption>
        {fieldFullValue ? (
          <CopyToClipboard text={fieldFullValue}>
            <Caption emphasized>{truncate(fieldValue, 25)}</Caption>
          </CopyToClipboard>
        ) : (
          <Caption emphasized>{truncate(fieldValue, 25)}</Caption>
        )}
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
