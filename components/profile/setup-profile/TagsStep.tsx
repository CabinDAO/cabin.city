import { useEffect, useState } from 'react'
import { FormActions, StepProps } from '@/components/profile/RegistrationForm'
import { TagsInput } from '@/components/profile/TagsInput'
import { Body1, H2 } from '@/components/core/Typography'
import styled from 'styled-components'

export const TagsStep = ({
  goNext,
  goBack,
  isFirstStep,
  isLastStep,
  data,
  setData,
}: StepProps) => {
  const [tags, setTags] = useState(data.tags || [])

  // setData is async, so we do this useEffect thing to make sure data is set before proceeding
  const [shouldGoNext, setShouldGoNext] = useState(false)
  useEffect(() => {
    if (shouldGoNext) {
      setShouldGoNext(false)
      goNext()
    }
  }, [data])

  const handleNext = async () => {
    setShouldGoNext(true)
    setData({ ...data, ...{ tags } })
  }

  const handleBack = async () => {
    setData({ ...data, ...{ tags } })
    goBack()
  }

  return (
    <>
      <Container>
        <H2>Interests</H2>
        <Body1>Select all of the following which describe you:</Body1>
        <TagsInput tags={tags} onTagsChange={setTags} canShowErrors={true} />
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