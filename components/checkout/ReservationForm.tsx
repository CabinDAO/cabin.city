import React, { FormEvent, useState } from 'react'
import { Button } from '@/components/core/Button'
import styled from 'styled-components'
import { InputText } from '@/components/core/InputText'
import { validateProfileInput } from '@/components/profile/validations'
import {
  CartFragment,
  UpdateCartInput,
  UpdateProfileInput,
  useUpdateCartMutation,
  useUpdateProfileMutation,
} from '@/generated/graphql'
import { ApolloError } from '@apollo/client'
import { FAUNA_ERROR_TO_MESSAGE_MAPPING } from '@/utils/profile-submission'
import { useProfile } from '@/components/auth/useProfile'
import { InputTextArea } from '@/components/core/InputTextArea'
import { Body1, Subline1 } from '@/components/core/Typography'
import { Checkbox } from '@/components/core/Checkbox'
import { useError } from '@/components/hooks/useError'

export const ReservationForm = ({
  onComplete,
  cart,
}: {
  onComplete: () => void
  cart: CartFragment
}) => {
  throw new Error('Not implemented')

  // const { user } = useProfile()
  // const [updateProfile] = useUpdateProfileMutation()
  // const [updateCart] = useUpdateCartMutation()
  // const { showError } = useError()
  //
  // const [updateProfileInput, setUpdateProfileInput] = useState({
  //   name: user?.name,
  //   location: user?.location,
  //   mailingListOptIn: user?.mailingListOptIn,
  // } as UpdateProfileInput)
  // const [updateCartInput, setUpdateCartInput] = useState({
  //   notes: cart.notes,
  // } as UpdateCartInput)
  //
  // if (!user) {
  //   return null
  // } else if (updateProfileInput.name === undefined) {
  //   // if user doesn't load til later, this can get stuck on empty
  //   setUpdateProfileInput({
  //     ...updateProfileInput,
  //     name: user.name,
  //     location: user.location,
  //     mailingListOptIn: user.mailingListOptIn,
  //   })
  // }
  //
  // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setUpdateProfileInput((prev) => ({
  //     ...prev,
  //     ...{ ...updateProfileInput, name: e.target.value },
  //   }))
  // }
  //
  // const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setUpdateProfileInput((prev) => ({
  //     ...prev,
  //     ...{ ...updateProfileInput, location: e.target.value },
  //   }))
  // }
  //
  // const handleMailingListOptInChange = () => {
  //   setUpdateProfileInput((prev) => ({
  //     ...prev,
  //     ...{
  //       ...updateProfileInput,
  //       mailingListOptIn: !updateProfileInput.mailingListOptIn,
  //     },
  //   }))
  // }
  //
  // const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setUpdateCartInput((prev) => ({
  //     ...prev,
  //     ...{ ...updateCartInput, notes: e.target.value },
  //   }))
  // }
  //
  // const handleSubmit = async (event: FormEvent) => {
  //   event.preventDefault()
  //
  //   if (!user || !updateProfileInput) return
  //
  //   if (!validateProfileInput(updateProfileInput, true)) {
  //     showError(`Name and Location are required`)
  //     return
  //   }
  //
  //   try {
  //     await updateProfile({
  //       variables: {
  //         id: user.externId,
  //         data: updateProfileInput,
  //       },
  //     })
  //     await updateCart({
  //       variables: {
  //         id: cart._id,
  //         data: updateCartInput,
  //       },
  //     })
  //     onComplete()
  //   } catch (error: unknown) {
  //     if (error instanceof ApolloError) {
  //       const { graphQLErrors } = error
  //       const [graphQLError] = graphQLErrors
  //
  //       if (graphQLError) {
  //         const { extensions } = graphQLError
  //         const mappedError =
  //           FAUNA_ERROR_TO_MESSAGE_MAPPING[extensions?.code as string]
  //
  //         if (mappedError) {
  //           showError(`error: ${mappedError}`)
  //         } else {
  //           showError(`error updating profile or cart`)
  //         }
  //       }
  //     } else {
  //       showError(`error updating profile or cart`)
  //     }
  //   }
  // }
  //
  // return (
  //   <Form onSubmit={handleSubmit}>
  //     <InputGroup>
  //       <InputText
  //         required
  //         label="Name"
  //         value={updateProfileInput?.name ?? ''}
  //         onChange={handleNameChange}
  //       />
  //     </InputGroup>
  //     <InputText
  //       required
  //       label="Location"
  //       value={updateProfileInput?.location ?? ''}
  //       onChange={handleLocationChange}
  //     />
  //     <InputGroup></InputGroup>
  //     <InputGroup>
  //       <InputTextArea
  //         rows={4}
  //         label="Notes"
  //         placeholder={'Dietary restrictions, housing preferences, etc.'}
  //         value={updateCartInput?.notes ?? ''}
  //         onChange={handleNotesChange}
  //       />
  //     </InputGroup>
  //     <Subline1>Email Preference</Subline1>
  //     <InputGroup>
  //       <CheckboxRow>
  //         <Checkbox
  //           selected={!!updateProfileInput.mailingListOptIn}
  //           onClick={handleMailingListOptInChange}
  //         />
  //         <Body1>
  //           <span onClick={handleMailingListOptInChange}>
  //             Email me about future Cabin opportunities
  //           </span>
  //         </Body1>
  //       </CheckboxRow>
  //     </InputGroup>
  //     <InputGroup>
  //       <Button>Continue</Button>
  //     </InputGroup>
  //   </Form>
  // )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: flex-end;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
  }
`

const CheckboxRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 1.6rem;

  > :first-child {
    flex-shrink: 0;
  }
`
