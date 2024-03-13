import { isProd } from '@/utils/dev'
import { CartFragment } from '@/utils/types/cart'
import styled from 'styled-components'
import { Body1, H2 } from '@/components/core/Typography'
import theme, { padding } from '@/styles/theme'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { ContentCard } from '@/components/core/ContentCard'
import { PaymentForm } from '@/components/checkout/PaymentForm'
import { TitleCard } from '@/components/core/TitleCard'
import { YEARLY_PRICE_IN_USD } from '@/utils/citizenship'

const CheckoutPageView = ({ cart }: { cart: CartFragment }) => {
  return (
    <SingleColumnLayout>
      <TitleCard icon="citizen" title="Checkout" />
      <Content shape="notch" notchSize={1.6}>
        <H2>Cart</H2>
        <Body1>
          1 Year of Cabin citizenship: <Price>${YEARLY_PRICE_IN_USD}</Price>
        </Body1>
        <H2>Payment</H2>

        {!isProd && (
          <Body1
            style={{
              backgroundColor: theme.colors.yellow400,
              padding: '1rem',
              borderRadius: '10px',
            }}
          >
            This is a test environment. Use card number{' '}
            <code
              style={{
                backgroundColor: theme.colors.yellow300,
                padding: '2px 4px',
                borderRadius: '6px',
              }}
            >
              4242424242424242
            </code>
            , any future expiration date, and any CVC and zip code.
          </Body1>
        )}

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

const Price = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.green700};
`
