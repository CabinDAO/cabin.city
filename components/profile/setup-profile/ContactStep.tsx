import { useState } from 'react'
import { FormActions, StepProps } from '@/components/profile/RegistrationForm'
import { ContactInput } from '@/components/profile/ContactInput'
import { Body1, H2 } from '@/components/core/Typography'
import styled from 'styled-components'
import { useError } from '@/components/hooks/useError'

export const ContactStep = ({
  goNext,
  goBack,
  isFirstStep,
  isLastStep,
  data,
  setData,
}: StepProps) => {
  const { showError } = useError()
  const [contactList, setContactList] = useState(data.contactFields || [])
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const handleNext = async () => {
    if (hasUnsavedChanges) {
      showError(
        `You have an unsaved contact method. Either add it or erase it.`
      )
      return
    }
    setData({ ...data, ...{ contactFields: contactList } })
    goNext()
  }

  const handleBack = async () => {
    setData({ ...data, ...{ contactFields: contactList } })
    goBack()
  }

  return (
    <>
      <Container>
        <H2>Contact & Socials</H2>
        <div>
          <Body1 style={{ marginBottom: '0.5rem' }}>
            Add some ways for Cabin members to connect with you
          </Body1>
        </div>
        <ContactInput
          contactList={contactList}
          setContactList={setContactList}
          setHasUnsavedChanges={setHasUnsavedChanges}
        />
      </Container>
      <FormActions
        handleNext={handleNext}
        handleBack={handleBack}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`
