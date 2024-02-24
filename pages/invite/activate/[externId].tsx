import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { usePrivy } from '@privy-io/react-auth'
import { prisma } from '@/lib/prisma'
import { PaymentStatus } from '@/utils/types/cart'
import { CitizenshipStatus } from '@/utils/types/profile'
import styled from 'styled-components'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { Body1, Caption, H1 } from '@/components/core/Typography'
import { ContentCard } from '@/components/core/ContentCard'
import { Button } from '@/components/core/Button'

type Invite = {
  externId: string
  hasWallet: boolean
  claimer: {
    externId: string
    citizenshipStatus: CitizenshipStatus | null
  } | null
  cart: {
    externId: string
    amount: number
    paymentStatus: PaymentStatus
  } | null
}

export default function Page({
  invite,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <SingleColumnLayout withFooter>
        <TitleCard title="Activate Your Citizenship" icon="citizen" />
        <StyledContentCard>
          {invite ? (
            <ActivateCitizenship invite={invite} />
          ) : (
            <ErrorMessage>
              <Body1>Invalid activation code</Body1>
            </ErrorMessage>
          )}
        </StyledContentCard>
      </SingleColumnLayout>
    </>
  )
}

export const getServerSideProps = (async (context) => {
  const invite = await prisma.partialInviteClaim.findUnique({
    where: {
      externId: context.query.externId as string,
    },
    include: {
      claimer: true,
      cart: true,
    },
  })

  if (invite?.claimer) {
    return {
      redirect: {
        destination: `/profile/${invite.claimer.externId}`,
        permanent: false,
      },
    }
  }

  const data: Invite | null = !invite
    ? null
    : {
        externId: invite.externId,
        hasWallet: invite.hasWallet,
        claimer: invite.claimer
          ? {
              externId: invite.claimer.externId,
              citizenshipStatus: invite.claimer
                .citizenshipStatus as CitizenshipStatus,
            }
          : null,
        cart: invite.cart
          ? {
              externId: invite.cart.externId,
              amount: invite.cart.amount.toNumber(),
              paymentStatus: invite.cart.paymentStatus as PaymentStatus,
            }
          : null,
      }

  return { props: { invite: data } }
}) satisfies GetServerSideProps<{ invite: Invite | null }>

const ActivateCitizenship = ({ invite }: { invite: Invite }) => {
  // after you connect, handleLogin() takes over

  const { ready, user, linkEmail, login, connectWallet } = usePrivy()

  return (
    <>
      <H1>One More Step</H1>
      {ready && user ? (
        <ErrorMessage>logged in to privy already</ErrorMessage>
      ) : invite.hasWallet ? (
        <>
          <Body1>
            Connect your wallet to activate your citizenship and join Cabin.
          </Body1>
          <Button onClick={login}>Connect wallet</Button>
          <Caption>
            <Button variant="link-slim" onClick={linkEmail}>
              or create a new wallet with email
            </Button>
          </Caption>
        </>
      ) : (
        <>
          <Body1>
            Create your Cabin account to activate your citizenship and join
            Cabin.
          </Body1>
          <Button onClick={linkEmail}>Sign Up with Email</Button>
          <Caption>
            <Button variant="link-slim" onClick={login}>
              or use your existing wallet
            </Button>
          </Caption>
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

const ErrorMessage = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.red100};
  padding: 1.6rem;

  ${Body1} {
    color: ${({ theme }) => theme.colors.red600};
  }
`
