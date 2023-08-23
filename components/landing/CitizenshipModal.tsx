import styled from 'styled-components'
import { ModalTitle } from '../core/modals/ModalTitle'
import { ModalContainer } from '../core/modals/ModalContainer'
import { Body2, H4, Subline1 } from '../core/Typography'
import { ModalActionBar } from '../core/modals/ModalActionBar'
import { EXTERNAL_LINKS } from '@/utils/external-links'
import events from '@/lib/googleAnalytics/events'

export const CitizenshipModal = () => {
  return (
    <CitizenshipModalContainer>
      <ModalTitle text="Citizenship" />
      <CitizenshipModalContent>
        <H4>3 ways to unlock Citizenship</H4>
        <StepList>
          <Step>
            <Subline1>Obtain a Vouch & Purchase</Subline1>
            <Body2>
              Join our community events, whether online or in real life, and
              gain the endorsement of a Citizen. Once vouched for, you can
              purchase Citizenship.
            </Body2>
          </Step>
          <Step>
            <Subline1>Attend a Cabin Week</Subline1>
            <Body2>
              Participate in a 1-2 week coliving experience with fellow Cabin
              members. Find upcoming Cabin Weeks to apply for after signing into
              the app.
            </Body2>
          </Step>
          <Step>
            <Subline1>Hold 1000 ₡ABIN</Subline1>
            <Body2>
              Collect and hold 1000 ₡ABIN tokens by participating in various
              bounties across the community.
            </Body2>
          </Step>
        </StepList>
      </CitizenshipModalContent>
      <ModalActionBar
        text="Contact Us"
        locationHref={`${EXTERNAL_LINKS.CALENDLY_CALL_URL}?utm_source=cabin.city&utm_content=citizenshipmodal`}
        onActionClick={() =>
          events.externalLinkEvent(EXTERNAL_LINKS.CALENDLY_CALL_URL)
        }
      />
    </CitizenshipModalContainer>
  )
}

const CitizenshipModalContainer = styled(ModalContainer)`
  height: min-content;
  width: 40.8rem;
  height: 54rem;
  overflow-y: scroll;
`

const CitizenshipModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
  gap: 2.4rem;
  width: 100%;
  align-items: center;
  overflow-y: scroll;
  margin-bottom: 10rem;
`

const StepList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1.2rem;
`

const Step = styled.div`
  border: 1px solid rgba(29, 43, 42, 0.12);
  padding: 1.8rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  ${Body2} {
    opacity: 0.75;
  }
`
