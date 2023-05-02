import { HorizontalDivider } from '@/components/core/Divider'
import { InputText } from '@/components/core/InputText'
import { SlateEditor } from '@/components/core/slate/SlateEditor'
import { Descendant } from 'slate'
import styled from 'styled-components'
import { Availability } from './Availability'
import { Eligibility } from './Eligibility'
import { OfferFragment, OfferType } from '@/generated/graphql'

interface EditOfferFormProps {
  offer: OfferFragment
}

export const EditOfferForm = ({ offer }: EditOfferFormProps) => {
  const handleEditorChange = (val: Descendant[]) => {
    // setLocationInput({ ...locationInput, description: JSON.stringify(val) })
  }

  const handleEligibilityChange = (checked: boolean) => {
    // setEligibility(checked)
  }

  return (
    <Container>
      <InputText label="Title" placeholder="Name" helperText="12 / 48" />
      <EditorContainer>
        <SlateEditor
          placeholder="Share a description of your neighborhood here"
          onChange={handleEditorChange}
        />
      </EditorContainer>
      <HorizontalDivider />
      <Availability />
      <HorizontalDivider />
      {offer.offerType !== OfferType.PaidColiving && (
        <Eligibility checked onEligibilityChange={handleEligibilityChange} />
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2.4rem;
  align-items: flex-start;
`

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
