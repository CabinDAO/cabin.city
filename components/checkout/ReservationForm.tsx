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

export const ReservationForm = ({
  onComplete,
  cart,
}: {
  onComplete: () => void
  cart: CartFragment
}) => {
  const { user } = useProfile()
  const [updateProfile] = useUpdateProfileMutation()
  const [updateCart] = useUpdateCartMutation()

  const [errorMessage, setErrorMessage] = useState('')
  const [updateProfileInput, setUpdateProfileInput] =
    useState<UpdateProfileInput>({})
  const [updateCartInput, setUpdateCartInput] = useState<UpdateCartInput>({})

  const name = updateProfileInput?.name ?? user?.name
  const notes = updateCartInput?.notes ?? cart?.notes

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateProfileInput((prev) => ({
      ...prev,
      ...{ ...updateProfileInput, name: e.target.value },
    }))
  }

  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateCartInput((prev) => ({
      ...prev,
      ...{ ...updateCartInput, notes: e.target.value },
    }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!user || !updateProfileInput) return

    if (!validateProfileInput(updateProfileInput)) {
      setErrorMessage(`invalid profile input`)
      return
    }

    try {
      await updateProfile({
        variables: {
          id: user._id,
          data: updateProfileInput,
        },
      })
      await updateCart({
        variables: {
          id: cart._id,
          data: updateCartInput,
        },
      })
      onComplete()
    } catch (error: unknown) {
      if (error instanceof ApolloError) {
        const { graphQLErrors } = error
        const [graphQLError] = graphQLErrors

        if (graphQLError) {
          const { extensions } = graphQLError
          const mappedError =
            FAUNA_ERROR_TO_MESSAGE_MAPPING[extensions?.code as string]

          if (mappedError) {
            setErrorMessage(`error: ${mappedError}`)
          } else {
            setErrorMessage(`error updating profile or cart`)
          }
        }
      } else {
        setErrorMessage(`error updating profile or cart`)
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {errorMessage && <div>{errorMessage}</div>}
      <InputGroup>
        <InputText
          required
          label="Name"
          value={name}
          onChange={handleNameChange}
        />
        <InputText
          required
          label="Notes"
          value={notes}
          onChange={handleNotesChange}
        />
      </InputGroup>
      <Button>Continue</Button>
    </Form>
  )
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

  button {
    width: 100%;
  }

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;

    button {
      width: auto;
    }
  }
`
