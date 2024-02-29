import React, { RefObject, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { usePrivy } from '@privy-io/react-auth'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import { useCheckForApplePay, useCheckForGooglePay } from '@/lib/payments'
import { useProfile } from '@/components/auth/useProfile'
import { CitizenshipStatus } from '@/utils/types/profile'
import {
  InviteClaimParams,
  InviteClaimResponse,
  PaymentMethod,
} from '@/utils/types/invite'
import styled from 'styled-components'
import { Body1 } from '@/components/core/Typography'
import { Button } from '@/components/core/Button'
import { useBackend } from '@/components/hooks/useBackend'
import { useError } from '@/components/hooks/useError'
import { InputText } from '@/components/core/InputText'
import LoadingSpinner from '@/components/core/LoadingSpinner'
import {
  INVALID_NAME_MESSAGE,
  isValidAddressOrENSFormat,
  isValidEmail,
  isValidName,
} from '@/components/profile/validations'

export type Inviter = {
  name: string
  code: string
}

enum Step {
  NotStarted = 0,
  PromptLogin = 1,
  Wallet = 2,
  PaymentMethod = 3,
  LastStep = 4,
}

export default function InviteClaimFlow({
  inviter,
  onStart,
}: {
  inviter: Inviter
  onStart: () => void
}) {
  const { showError } = useError()
  const router = useRouter()
  const { login } = usePrivy()
  const { user, isUserLoading } = useProfile()

  const { useMutate } = useBackend()
  const { trigger: createClaim, isMutating } =
    useMutate<InviteClaimResponse>('INVITE_CLAIM')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [hasWallet, setHasWallet] = useState<null | true | false>(null)
  const [payMethod, setPayMethod] = useState<PaymentMethod | null>(null)
  const [step, setStep] = useState(Step.NotStarted)
  const [isAboutToRedirect, setIsAboutToRedirect] = useState(false)
  const [confirmedNoAccount, setConfirmedNoAccount] = useState(false)
  const [sendToCitizenship, setSendToCitizenship] = useState(false)

  const { applePayScriptElement, isApplePaySupported } = useCheckForApplePay()
  const { googlePayScriptElement, isGooglePaySupported } =
    useCheckForGooglePay()

  const alreadyHasAccount = !isUserLoading && !!user

  const refs: Partial<{ [key in Step]: RefObject<HTMLDivElement> }> = {
    [Step.PromptLogin]: useRef<HTMLDivElement>(null),
    [Step.Wallet]: useRef<HTMLDivElement>(null),
    [Step.PaymentMethod]: useRef<HTMLDivElement>(null),
    [Step.LastStep]: useRef<HTMLDivElement>(null),
  }

  const goToStep = (step: Step) => {
    const actualStep: Step =
      user && [Step.PromptLogin, Step.Wallet].includes(step)
        ? Step.PaymentMethod
        : step
    setStep(actualStep)
    const ref = refs[actualStep]
    setTimeout(() => {
      if (ref?.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, 50)
  }

  useEffect(() => {
    if (alreadyHasAccount) {
      if (sendToCitizenship) {
        setIsAboutToRedirect(true)
        router.push(`/citizenship`).then()
      } else {
        // fix the case where you're on a step that's invisible to logged-in users
        // and then you log yourself in
        goToStep(step)
      }
    }
  }, [alreadyHasAccount, step, sendToCitizenship, router])

  const proceedButtonReady = !isUserLoading && !isMutating && !isAboutToRedirect

  const newUserPayingThroughUnlock =
    !alreadyHasAccount && payMethod == PaymentMethod.Crypto

  const goToPayment = async () => {
    if (!proceedButtonReady) {
      return
    }

    if (payMethod === null) {
      showError('Select a payment method')
      return
    }

    if (!user) {
      if (
        !name ||
        !email ||
        hasWallet === null ||
        (hasWallet && !walletAddress)
      ) {
        showError('Fill out all fields')
        return
      }

      if (!isValidName(name)) {
        showError(INVALID_NAME_MESSAGE)
        return
      }

      if (!isValidEmail(email)) {
        showError('Email address is not valid')
        return
      }

      if (hasWallet && !isValidAddressOrENSFormat(walletAddress)) {
        showError('Wallet address is not valid')
        return
      }
    }

    const inviteClaimRes = await createClaim({
      inviteCode: inviter.code,
      paymentMethod: payMethod,
      newAccountParams: user
        ? null
        : {
            name,
            email,
            walletAddressOrENS: hasWallet ? walletAddress : '',
          },
    } as InviteClaimParams)

    if ('error' in inviteClaimRes) {
      showError(inviteClaimRes.error)
      return
    }

    // if there's a cart, go to it
    if (inviteClaimRes.cartId) {
      setIsAboutToRedirect(true)
      router.push(`/checkout/${inviteClaimRes.cartId}`).then()
      return
    }

    if (user) {
      setIsAboutToRedirect(true)
      router.push(`/citizenship`).then()
      return
    }

    if (inviteClaimRes.profileId) {
      setSendToCitizenship(true)
      login()
      return
    }

    showError(
      `Something went wrong! Contact ${EXTERNAL_LINKS.GENERAL_EMAIL_ADDRESS} for help.`
    )
  }

  return (
    <>
      {applePayScriptElement}
      {googlePayScriptElement}
      {/*{user && user.citizenshipStatus == CitizenshipStatus.Verified && (*/}
      {/*  <Body1>Your citizenship expires on</Body1>*/}
      {/*)}*/}
      <Button
        disabled={step > Step.NotStarted}
        onClick={() => {
          onStart()
          goToStep(Step.PromptLogin)
        }}
      >
        {user && user.citizenshipStatus == CitizenshipStatus.Verified
          ? 'Extend your citizenship'
          : 'Claim your invite'}
      </Button>
      {step >= Step.PromptLogin && !alreadyHasAccount && (
        <>
          <StepText ref={refs[Step.PromptLogin]}>
            Do you have a Cabin.city account?
          </StepText>
          <ButtonRow>
            <Button variant={'secondary'} onClick={login}>
              Yes, log in
            </Button>
            <Button
              variant={'secondary'}
              startAdornment={confirmedNoAccount ? '✓ ' : ''}
              onClick={() => {
                setConfirmedNoAccount(true)
                goToStep(Step.Wallet)
              }}
            >
              I do not
            </Button>
          </ButtonRow>
        </>
      )}
      {step >= Step.Wallet && !alreadyHasAccount && (
        <>
          <StepText ref={refs[Step.Wallet]}>
            Do you already have a crypto wallet?
          </StepText>
          <ButtonRow>
            <Button
              variant={'secondary'}
              startAdornment={hasWallet === true ? '✓ ' : ''}
              onClick={() => {
                setHasWallet(true)
                setPayMethod(null)
                goToStep(Step.PaymentMethod)
              }}
            >
              Yes
            </Button>
            <Button
              variant={'secondary'}
              startAdornment={hasWallet === false ? '✓ ' : ''}
              onClick={() => {
                setHasWallet(false)
                setWalletAddress('')
                setPayMethod(PaymentMethod.CreditCard)
                goToStep(Step.LastStep)
              }}
            >
              No / I&apos;m Not Sure
            </Button>
          </ButtonRow>
        </>
      )}
      {step >= Step.PaymentMethod &&
        (alreadyHasAccount || hasWallet !== false) && (
          <>
            <StepText ref={refs[Step.PaymentMethod]}>
              How do you want to pay?
            </StepText>
            <ButtonRow>
              <Button
                variant={'secondary'}
                startAdornment={payMethod == PaymentMethod.Crypto ? '✓ ' : ''}
                onClick={() => {
                  setPayMethod(PaymentMethod.Crypto)
                  goToStep(Step.LastStep)
                }}
              >
                Crypto
              </Button>
              <Button
                variant={'secondary'}
                startAdornment={
                  payMethod == PaymentMethod.CreditCard ? '✓ ' : ''
                }
                onClick={() => {
                  setPayMethod(PaymentMethod.CreditCard)
                  goToStep(Step.LastStep)
                }}
              >
                Credit Card {isApplePaySupported && ' / Apple Pay'}
                {isGooglePaySupported && ' / Google Pay'}
              </Button>
            </ButtonRow>
          </>
        )}
      {step >= Step.LastStep && (
        <>
          {!alreadyHasAccount && (
            <>
              <StepText ref={refs[Step.LastStep]}>
                Tell us a little about yourself
              </StepText>
              <Inputs>
                <InputText
                  placeholder={'Name'}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                ></InputText>
                <InputText
                  placeholder={'Email'}
                  type={'email'}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                ></InputText>
                {hasWallet && (
                  <InputText
                    placeholder={'Wallet Address or ENS'}
                    onChange={(e) => {
                      setWalletAddress(e.target.value)
                    }}
                  ></InputText>
                )}
              </Inputs>
            </>
          )}
          <ButtonRow>
            <Button onClick={goToPayment} disabled={!proceedButtonReady}>
              {!proceedButtonReady && (
                <>
                  <LoadingSpinner />
                  &nbsp; {/* this keeps the button height from collapsing */}
                </>
              )}
              {newUserPayingThroughUnlock
                ? 'Creat Account & Log In With Wallet'
                : 'Proceed to Payment'}
            </Button>
          </ButtonRow>
        </>
      )}
    </>
  )
}

const StepText = styled(Body1)`
  padding-top: 2rem;
`

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.6rem;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
  }
`

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.6rem;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: 45rem;
  }
`
