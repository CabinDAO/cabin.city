import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { prisma } from '@/utils/prisma'
import { RefObject, useRef, useState } from 'react'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { Body1, H1 } from '@/components/core/Typography'
import styled from 'styled-components'
import { Button } from '@/components/core/Button'
import { ContentCard } from '@/components/core/ContentCard'
import {
  InviteClaimParams,
  InviteClaimResponse,
  PaymentMethod,
} from '@/utils/types/partialInviteClaim'
import { useBackend } from '@/components/hooks/useBackend'
import { useRouter } from 'next/router'
import { useError } from '@/components/hooks/useError'
import { InputText } from '@/components/core/InputText'
import {
  INVALID_NAME_MESSAGE,
  isValidEmail,
  isValidName,
} from '@/components/profile/validations'
import { isLocalDev } from '@/utils/dev'

type PayMethod = PaymentMethod | null

type Inviter = {
  name: string
  code: string
}

export default function Page({
  inviter,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <SingleColumnLayout withFooter>
        <TitleCard title="Join Cabin" icon="citizen" />
        <StyledContentCard>
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

  const { useMutate } = useBackend()
  const { trigger: createClaim } =
    useMutate<InviteClaimResponse>('INVITE_CLAIM')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [hasWallet, setHasWallet] = useState<null | true | false>(null)
  const [payMethod, setPayMethod] = useState<PayMethod>(null)
  const [step, setStep] = useState(0)

  const refs: { [key: number]: RefObject<HTMLDivElement> } = {
    1: useRef<HTMLDivElement>(null),
    2: useRef<HTMLDivElement>(null),
    3: useRef<HTMLDivElement>(null),
  }

  const goToStep = (step: number) => {
    setStep(step)
    const ref = refs[step]
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, 50)
  }

  const goToPayment = async () => {
    if (payMethod === null || hasWallet === null || !name || !email) {
      showError('Please fill out all fields')
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

    const claimRes = await createClaim({
      inviteCode: inviter.code,
      name: name,
      email: email,
      hasWallet: hasWallet,
      paymentMethod: payMethod,
    } as InviteClaimParams)

    if ('error' in claimRes) {
      showError(claimRes.error)
      return
    }

    // set cookie so we can create a new account later
    document.cookie = `cabinClaimExternId=${claimRes.externId}; Expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=Strict; Path=/`

    // if there's a cart, go to it
    if (claimRes.cartId) {
      router.push(`/checkout/${claimRes.cartId}`).then()
      return
    }

    showError('unlock checkout should happen now but its not implemented')

    // redirect to partial claim page to do unlock checkout???
  }

  return (
    <>
      <H1>{inviter.name} invited you to become a Citizen</H1>
      <Body1>
        Citizenship is a X Y Z thing that you must be invited to so its very
        special. It costs $money and you can pay with crypto or credit card.
      </Body1>
      <Button
        disabled={step >= 1}
        onClick={() => {
          setPayMethod(null)
          setHasWallet(null)
          goToStep(1)
        }}
      >
        Claim your invite
      </Button>

      {step >= 1 && (
        <>
          <StepText ref={refs[1]}>
            Do you already have a crypto wallet?
          </StepText>
          <ButtonRow>
            <Button
              variant={'secondary'}
              startAdornment={hasWallet === true ? '✓ ' : ''}
              onClick={() => {
                setHasWallet(true)
                setPayMethod(null)
                goToStep(2)
              }}
            >
              Yes
            </Button>
            <Button
              variant={'secondary'}
              startAdornment={hasWallet === false ? '✓ ' : ''}
              onClick={() => {
                setHasWallet(false)
                setPayMethod(PaymentMethod.CreditCard)
                goToStep(3)
              }}
            >
              No / I&apos;m Not Sure
            </Button>
          </ButtonRow>
        </>
      )}

      {step >= 2 && hasWallet !== false && (
        <>
          <StepText ref={refs[2]}>How do you want to pay?</StepText>
          <ButtonRow>
            <Button
              variant={'secondary'}
              startAdornment={payMethod == PaymentMethod.Crypto ? '✓ ' : ''}
              onClick={() => {
                setPayMethod(PaymentMethod.Crypto)
                goToStep(3)
              }}
            >
              Crypto
            </Button>
            <Button
              variant={'secondary'}
              startAdornment={payMethod == PaymentMethod.CreditCard ? '✓ ' : ''}
              onClick={() => {
                setPayMethod(PaymentMethod.CreditCard)
                goToStep(3)
              }}
            >
              Credit Card
            </Button>
            {/*<Button variant={'secondary'}>Apple Pay</Button>*/}
          </ButtonRow>
        </>
      )}

      {step >= 3 && (
        <>
          <StepText ref={refs[3]}>Tell us a little about yourself</StepText>
          <Inputs>
            <InputText
              placeholder={'Name'}
              onChange={(e) => {
                setName(e.target.value)
              }}
            ></InputText>
            <InputText
              placeholder={'Email'}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            ></InputText>
          </Inputs>
          <ButtonRow>
            <Button onClick={goToPayment}>Proceed to Payment</Button>
          </ButtonRow>
        </>
      )}
    </>
  )
}

const StyledContentCard = styled(ContentCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  padding: 2.4rem 1.6rem;

  ${({ theme }) => theme.bp.md} {
    padding: 2.4rem;
  }
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
