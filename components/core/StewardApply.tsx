import styled, { css } from 'styled-components'
import { Body1, Caption, H4 } from './Typography'
import { Button } from '@/components/core/Button'
import { NoWrap } from './NoWrap'
import { useProfile } from '@/components/auth/useProfile'
import Icon from '@/components/core/Icon'
import theme from '@/styles/theme'
import { StewardContactModal } from '@/components/core/StewardContactModal'
import { useModal } from '@/components/hooks/useModal'
import { LocationFragment } from '@/utils/types/location'

export const StewardApply = ({ location }: { location: LocationFragment }) => {
  const { showModal } = useModal()
  const { user } = useProfile()

  return (
    <Container>
      <Top flexDir={'row'}>
        <div
          style={{
            width: '7.2rem',
            height: '7.2rem',
            backgroundColor: theme.colors.yellow100,
            border: `1px solid ${theme.colors.green900}`,
            borderRadius: '50%',
            display: 'flex',
            flexShrink: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name={'silhouette'} size={4} />
        </div>

        <Info>
          <Name>
            <NoWrap>
              <H4>No Steward (yet)</H4>
            </NoWrap>
          </Name>
          <Caption>Maybe you?</Caption>
        </Info>
      </Top>

      <Body1>You can apply to steward this neighborhood and help it grow</Body1>

      <ContactContainer>
        <ContactButton
          onClick={() => {
            showModal(() => <StewardContactModal location={location} />)
          }}
          variant="tertiary"
        >
          Learn More
        </ContactButton>
      </ContactContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  gap: 1.6rem;

  ${Body1} {
    opacity: 0.75;
  }
`

const Top = styled.div<{
  flexDir: 'column' | 'row'
}>`
  display: flex;
  flex-direction: ${({ flexDir }) => flexDir};
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 1.6rem;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
`

const Name = styled.div<{
  wrapToNextLine?: boolean
}>`
  display: flex;
  gap: 0.4rem;
  flex-direction: row;
  align-items: center;

  ${H4} {
    margin-bottom: 0;
  }

  ${({ wrapToNextLine }) =>
    wrapToNextLine &&
    css`
      flex-direction: column;
      align-items: flex-start;
    `}
`

const ContactContainer = styled.div`
  margin-top: 0.8rem;
`
const ContactButton = styled(Button)`
  width: 100%;
`
