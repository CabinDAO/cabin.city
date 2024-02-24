import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { prisma } from '@/lib/prisma'
import { CartFragment, PaymentStatus } from '@/utils/types/cart'
import CheckoutPageView from '@/components/checkout/CheckoutPageView'
import Error from 'next/error'

export default function CheckoutPage({
  cart,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return cart ? <CheckoutPageView cart={cart} /> : <Error statusCode={404} />
}

export const getServerSideProps = (async (context) => {
  // const { privyDID } = await privyDIDFromHeaders(context.req.headers)
  // if (!privyDID) {
  //   return { props: { cart: null } }
  // }

  const externId = context.query.externId as string
  const cart = await prisma.cart.findUnique({
    where: { externId },
    include: { partialInviteClaim: true },
  })

  const data: CartFragment | null = !cart
    ? null
    : {
        externId: cart.externId,
        amount: cart.amount.toNumber(),
        paymentStatus: cart.paymentStatus as PaymentStatus,
        partialInviteClaimExternId: cart.partialInviteClaim.externId,
      }

  return { props: { cart: data } }
}) satisfies GetServerSideProps<{ cart: CartFragment | null }>
