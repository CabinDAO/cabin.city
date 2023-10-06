import styled from 'styled-components'
import { ModalTitle } from '../core/modals/ModalTitle'
import { ModalContainer } from '../core/modals/ModalContainer'
import { Body2, H4 } from '../core/Typography'

export const LiabilityPolicyModal = () => {
  return (
    <Container>
      <ModalTitle text="Liability Policy" />
      <Content>
        <H4>RELEASE OF LIABILITY</H4>

        <H4>READ CAREFULLY - THIS AFFECTS YOUR LEGAL RIGHTS</H4>
        <Body2>
          In exchange for participation in this activity organized by CabinDAO
          and/or use of the property, facilities and services of any
          neighborhood, outpost, or organization operating in the Cabin network
          (hereafter collectively referred to as “Cabin organizations”), I agree
          to the following:
        </Body2>

        <H4>1. AGREEMENT TO FOLLOW DIRECTIONS</H4>
        <Body2>
          I agree to observe and obey all posted rules and warnings, and further
          agree to follow any oral instructions or directions given by Cabin
          organizations, or the employees, representatives or agents of Cabin
          organizations.
        </Body2>

        <H4>2. ASSUMPTION OF THE RISKS AND RELEASE</H4>
        <Body2>
          I recognize that there are certain inherent risks associated with the
          activity and I assume full responsibility for personal injury to
          myself, and further release and discharge Cabin organizations for
          injury, loss or damage arising out of my use of or presence upon the
          facilities of Cabin organizations, whether caused by the fault of
          myself, my family, Cabin organizations, or other third parties.
        </Body2>

        <H4>3. INDEMNIFICATION</H4>
        <Body2>
          I agree to indemnify and defend Cabin organizations against all
          claims, causes of action, damages, judgments, costs or expenses,
          including attorney fees and other litigation costs, which may in any
          way arise from my use of or presence upon the facilities of Cabin
          organizations.
        </Body2>

        <H4>4. FEES</H4>
        <Body2>
          I agree to pay for all damages to the facilities of Cabin
          organizations caused by any negligent, reckless, or willful actions by
          me.
        </Body2>

        <H4>5. APPLICABLE LAW</H4>
        <Body2>
          Any legal or equitable claim that may arise from participation in the
          above shall be resolved under Wyoming law.
        </Body2>

        <H4>6. NO DURESS</H4>
        <Body2>
          I agree and acknowledge that I am under no pressure or duress and that
          I have been given a reasonable opportunity to review this Agreement. I
          further agree and acknowledge that I am free to have my own legal
          counsel review this Agreement if I so desire. I further agree and
          acknowledge that Cabin organizations have offered to refund any fees I
          have paid to use its facilities if I choose not to sign this
          Agreement.
        </Body2>

        <H4>7. ARM&apos;S LENGTH AGREEMENT</H4>
        <Body2>
          This Agreement and each of its terms are the product of an arm&apos;s
          length negotiation between the Parties. In the event any ambiguity is
          found to exist in the interpretation of this Agreement, or any of its
          provisions, the Parties, and each of them, explicitly reject the
          application of any legal or equitable rule of interpretation which
          would lead to a construction either &quot;for&quot; or
          &quot;against&quot; a particular party based upon their status as the
          drafter of a specific term, language, or provision giving rise to such
          ambiguity.
        </Body2>

        <H4>8. ENFORCEABILITY</H4>
        <Body2>
          The invalidity or unenforceability of any provision of this Agreement,
          whether standing alone or as applied to a particular occurrence or
          circumstance, shall not affect the validity or enforceability of any
          other provision of this Agreement or of any other applications of such
          provision, as the case may be, and such invalid or unenforceable
          provision shall be deemed not to be a part of this Agreement.
        </Body2>

        <Body2>
          I HAVE READ THIS AGREEMENT AND UNDERSTAND IT. I FURTHER UNDERSTAND
          THAT BY AGREEING TO THIS RELEASE, I VOLUNTARILY SURRENDER CERTAIN
          LEGAL RIGHTS.
        </Body2>
      </Content>
    </Container>
  )
}

const Container = styled(ModalContainer)`
  overflow-y: auto;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2.4rem;
  gap: 2.4rem;
  width: 100%;
`
