import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { prisma } from '@/lib/prisma'
import { CartFragment, PaymentStatus } from '@/utils/types/cart'
import CheckoutPageView from '@/components/checkout/CheckoutPageView'

export default function CheckoutPage({
  cart,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <CheckoutPageView cart={cart} />
}

export const getServerSideProps = (async (context) => {
  // const { privyDID } = await privyDIDFromHeaders(context.req.headers)
  // if (!privyDID) {
  //   return { props: { cart: null } }
  // }

  const externId = context.query.externId as string
  const cart = await prisma.cart.findUnique({
    where: { externId },
    include: { invite: true },
  })

  if (!cart) {
    return { notFound: true }
  }

  if (cart && cart.paymentStatus == PaymentStatus.Paid) {
    return {
      redirect: {
        destination: `/checkout/${cart.externId}/confirmation`,
        permanent: false,
      },
    }
  }

  return {
    props: {
      cart: {
        externId: cart.externId,
        amount: cart.amount.toNumber(),
        paymentStatus: cart.paymentStatus as PaymentStatus,
        // inviteExternId: cart.invite?.externId || '',
      },
    },
  }
}) satisfies GetServerSideProps<{ cart: CartFragment }>
