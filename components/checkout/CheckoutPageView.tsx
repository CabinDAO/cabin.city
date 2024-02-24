import { CartFragment } from '@/utils/types/cart'
import styled from 'styled-components'
import { H2 } from '@/components/core/Typography'
import { padding } from '@/styles/theme'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { ContentCard } from '@/components/core/ContentCard'
import { PaymentForm } from '@/components/checkout/PaymentForm'
import { TitleCard } from '@/components/core/TitleCard'

const CheckoutPageView = ({ cart }: { cart: CartFragment }) => {
  return (
    <SingleColumnLayout withFooter>
      <TitleCard icon="citizen" title="Checkout" />
      <Content shape="notch" notchSize={1.6}>
        <H2>Payment</H2>
        <FormContainer>
          <PaymentForm cart={cart} />
        </FormContainer>
      </Content>
    </SingleColumnLayout>
  )
}

export default CheckoutPageView

const Content = styled(ContentCard)`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  ${padding('md', 'sm')};

  ${({ theme }) => theme.bp.lg_max} {
    order: 2;
  }
`

const FormContainer = styled.div`
  display: flex;
  width: 100%;
`
