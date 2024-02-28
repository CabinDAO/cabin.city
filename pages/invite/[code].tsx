import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { prisma } from '@/lib/prisma'
import React, { RefObject, useEffect, useRef, useState } from 'react'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { TitleCard } from '@/components/core/TitleCard'
import {
  Body1,
  Caption,
  captionStyles,
  H1,
  h1Styles,
} from '@/components/core/Typography'
import styled, { css } from 'styled-components'
import { Button } from '@/components/core/Button'
import { ContentCard } from '@/components/core/ContentCard'
import {
  InviteClaimParams,
  InviteClaimResponse,
  PaymentMethod,
} from '@/utils/types/invite'
import { useBackend } from '@/components/hooks/useBackend'
import { useRouter } from 'next/router'
import { useError } from '@/components/hooks/useError'
import { InputText } from '@/components/core/InputText'
import {
  INVALID_NAME_MESSAGE,
  isValidAddressOrENSFormat,
  isValidEmail,
  isValidName,
} from '@/components/profile/validations'
import LoadingSpinner from '@/components/core/LoadingSpinner'
import { usePrivy } from '@privy-io/react-auth'
import { padding } from '@/styles/theme'
import { YEARLY_PRICE_IN_USD } from '@/utils/citizenship'
import Image from 'next/image'

type PayMethod = PaymentMethod | null

type Inviter = {
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

export default function Page({
  inviter,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <SingleColumnLayout withFooter>
        <TitleCard title="Citizenship" icon="citizen" />
        <StyledContentCard shape={'notch'} notchSize={1.6}>
          {inviter ? (
            <InviteClaim inviter={inviter} />
          ) : (
            <ErrorMessage>
              <Body1>Invalid invite code</Body1>
            </ErrorMessage>
          )}
        </StyledContentCard>
      </SingleColumnLayout>
    </>
  )
}

export const getServerSideProps = (async (context) => {
  const inviteCode = context.query.code as string
  const inviter = await prisma.profile.findUnique({
    where: {
      inviteCode: inviteCode,
    },
  })

  const data: Inviter | null = !inviter
    ? null
    : {
        name: inviter.name,
        code: inviteCode,
      }

  return { props: { inviter: data } }
}) satisfies GetServerSideProps<{ inviter: Inviter | null }>

const InviteClaim = ({ inviter }: { inviter: Inviter }) => {
  const { showError } = useError()
  const router = useRouter()
  const { ready: privyReady, user, login } = usePrivy()

  const { useMutate } = useBackend()
  const { trigger: createClaim, isMutating } =
    useMutate<InviteClaimResponse>('INVITE_CLAIM')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [hasWallet, setHasWallet] = useState<null | true | false>(null)
  const [payMethod, setPayMethod] = useState<PayMethod>(null)
  const [step, setStep] = useState(Step.NotStarted)
  const [isAboutToRedirect, setIsAboutToRedirect] = useState(false)
  const [confirmedNoAccount, setConfirmedNoAccount] = useState(false)

  const alreadyHasAccount = privyReady && !!user

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
    // fix the case where you're on a step that's invisible to logged-in users
    // and then you log yourself in
    if (alreadyHasAccount) {
      goToStep(step)
    }
  }, [alreadyHasAccount, step])

  const proceedButtonReady = privyReady && !isMutating && !isAboutToRedirect

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

    // make them log in, then take them to the mint page

    showError('login, then go to /citizenship')
  }

  return (
    <>
      <Image
        src={'/images/citizenship-campfire.jpg'}
        alt={'around a campfire'}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      />

      <Content>
        <Top>
          <H1>Feel at home anywhere in the world</H1>
          <StyledPrice>
            <Amount>${YEARLY_PRICE_IN_USD}</Amount>
            <Unit>per year</Unit>
          </StyledPrice>
          <Body1>
            Connect with Citizens around the world, participate in our
            community, and get Citizen benefits.
          </Body1>
        </Top>
        <Button
          disabled={step > Step.NotStarted}
          onClick={() => {
            goToStep(Step.PromptLogin)
          }}
        >
          Claim your invite
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
                  Credit Card
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
                Proceed to Payment
              </Button>
            </ButtonRow>
          </>
        )}
      </Content>
    </>
  )
}

const StyledContentCard = styled(ContentCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  width: 100%;
`

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

const ErrorMessage = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.red100};
  padding: 1.6rem;

  ${Body1} {
    color: ${({ theme }) => theme.colors.red600};
  }
`

const Top = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 2.4rem;
  justify-content: space-between;
  margin-bottom: 1.6rem;

  ${({ theme }) => theme.bp.md} {
    width: 45rem;
  }
`

const Amount = styled.span`
  ${h1Styles}
`
const Unit = styled.span`
  ${captionStyles}
`
const StyledPrice = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
  gap: 0.8rem;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
  width: 100%;
  ${padding('md', 'sm')};
`
