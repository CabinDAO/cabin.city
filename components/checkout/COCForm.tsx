import { Body2, H4 } from '@/components/core/Typography'
import Icon from '@/components/core/Icon'
import { Button } from '@/components/core/Button'
import styled from 'styled-components'
import { CartFragment, useUpdateCartMutation } from '@/generated/graphql'
import { ApolloError } from '@apollo/client'
import { FAUNA_ERROR_TO_MESSAGE_MAPPING } from '@/utils/profile-submission'
import { useError } from '@/components/hooks/useError'

export const COCForm = ({
  cart,
  onComplete,
}: {
  cart: CartFragment
  onComplete: () => void
}) => {
  const { showError } = useError()
  const [updateCart] = useUpdateCartMutation()

  const handleAccept = async () => {
    try {
      await updateCart({
        variables: {
          id: cart._id,
          data: {
            agreedToCOC: true,
          },
        },
      })
      onComplete()
    } catch (e: unknown) {
      if (e instanceof ApolloError) {
        const { graphQLErrors } = e
        const [graphQLError] = graphQLErrors

        if (graphQLError) {
          const { extensions } = graphQLError
          const mappedError =
            FAUNA_ERROR_TO_MESSAGE_MAPPING[extensions?.code as string]

          if (mappedError) {
            showError(`error: ${mappedError}`)
          } else {
            showError(`error updating cart`)
          }
        }
      } else {
        showError(`error updating cart`)
      }
    }
  }

  return (
    <>
      <Body2>
        Welcome to Cabin, where we’re guided by a passion for community,
        integrating with nature, and creating together. By signing up, you’re
        agreeing to the following commitments:
      </Body2>

      <COCRow>
        <Icon name={'hand'} size={2} />
        <COCText>
          <H4>Mutual respect</H4>
          <Body2>
            By entering our community’s container, you agree to not be a jerk at
            Cabin events, locations, and online. Cabin is dedicated to fostering
            an inclusive and respectful environment for all. We do not tolerate
            any form of racism, sexism, or discriminatory behavior.
          </Body2>
        </COCText>
      </COCRow>

      <COCRow>
        <Icon name={'shield'} size={2} />
        <COCText>
          <H4>Safety</H4>
          <Body2>
            There is no space for physical, sexual, or verbal harassment in our
            community. All reported cases will be investigated and dealt with
            depending on the severity of the situation. Consequences can include
            mediation, formal warnings, termination of coliving experience and
            in extreme cases, removal from the community. The offender may also
            be asked to leave during the period of the investigation.
          </Body2>
          <Body2>
            Using abusive language towards members of the community or damage to
            property belonging to others is not acceptable under any
            circumstances. We reserve the right to deny or remove access from
            anyone who we have reasonable grounds to believe has engaged in
            alcohol abuse or illegal drug activity which in any way endangers
            the wellbeing of our community.
          </Body2>
        </COCText>
      </COCRow>

      <COCRow>
        <Icon name={'flower'} size={2} />
        <COCText>
          <H4>Co-creation builds culture</H4>
          <Body2>
            We bring people together to practice co-creation, cooperation, and
            reciprocity that builds a positive-sum culture. By joining our
            community, you will have the opportunity to help co-create this
            culture through the relationships you build with others. You can
            learn more about our guiding principles here.
          </Body2>
        </COCText>
      </COCRow>

      <Button onClick={handleAccept}>Agree & Continue</Button>
    </>
  )
}

const COCRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;

  > :first-child {
    flex-shrink: 0;
  }

  ${({ theme }) => theme.bp.md} {
    gap: 2.4rem;
  }
`

const COCText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`
