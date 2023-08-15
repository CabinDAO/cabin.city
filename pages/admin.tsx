import styled from 'styled-components'
import theme from '@/styles/theme'
import { useRouter } from 'next/router'
import { useModal } from '@/components/hooks/useModal'
import { useProfile } from '@/components/auth/useProfile'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { TitleCard } from '@/components/core/TitleCard'
import { Button } from '@/components/core/Button'
import { ModalTitle } from '@/components/core/modals/ModalTitle'
import { ModalContainer } from '@/components/core/modals/ModalContainer'
import { H2 } from '@/components/core/Typography'
import { useState } from 'react'
import {
  LocationItemFragment,
  LocationType,
  OfferType,
  useCreateOfferMutation,
  useGetLocationsByLocationTypeQuery,
} from '@/generated/graphql'
import { Dropdown } from '@/components/core/Dropdown'
import { FormContainer } from '@/components/neighborhoods/edit-location/styles'
import { SelectOption } from '@/components/hooks/useDropdownLogic'

const NewCabinWeekModal = () => {
  const router = useRouter()
  const { hideModal } = useModal()
  const [createOffer] = useCreateOfferMutation()
  const [selectedLocation, setSelectedLocation] = useState<
    SelectOption | undefined
  >()

  const handleConfirm = async () => {
    if (selectedLocation) {
      const { data: offer } = await createOffer({
        variables: {
          data: {
            offerType: OfferType.CabinWeek,
            locationId: `${selectedLocation.value}`,
          },
        },
      })

      if (offer?.createOffer) {
        router.push(`/experience/${offer.createOffer._id}/edit`)
      }
    }
    hideModal()
  }

  const { data } = useGetLocationsByLocationTypeQuery({
    variables: {
      locationType: LocationType.Neighborhood,
      size: 10000,
      cursor: null,
    },
  })

  const locations =
    data?.locationsByLocationType.data.filter(
      (l): l is LocationItemFragment => !!l
    ) ?? []

  const options = locations.map((l) => ({
    label: l.name,
    value: l._id,
  })) as SelectOption[]

  return (
    <NewCabinWeekModalContainer>
      <ModalTitle text="New Cabin Week" />
      <Content>
        {options.length > 0 ? (
          <OfferFormContainer>
            <InputGroup>
              <StyledDropdown
                label="Choose Location"
                options={options}
                selectedOption={selectedLocation}
                onSelect={(o: SelectOption) => {
                  setSelectedLocation(o)
                }}
              />
            </InputGroup>
            <Button onClick={handleConfirm}>Create</Button>
          </OfferFormContainer>
        ) : (
          <H2>No neighborhood locations</H2>
        )}
      </Content>
    </NewCabinWeekModalContainer>
  )
}

const AdminPage = () => {
  const { showModal } = useModal()
  const { user } = useProfile({ redirectTo: '/' })

  if (!user || !user.isAdmin) {
    return null
  }

  return (
    <SingleColumnLayout>
      <TitleCard icon="lock" title="Admin Controls" />
      <AdminContent>
        <Button
          onClick={() => {
            showModal(() => <NewCabinWeekModal />)
          }}
        >
          New Cabin Week
        </Button>
      </AdminContent>
    </SingleColumnLayout>
  )
}

export default AdminPage

const AdminContent = styled.div`
  width: 100%;
  background-color: ${theme.colors.red100};
  padding: 2rem;
  font-size: 1.4rem;
  font-family: monospace;
  white-space: pre-wrap;
  overflow-x: auto;
  tab-width: 4;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.8rem;
`

const NewCabinWeekModalContainer = styled(ModalContainer)`
  height: min-content;
`

const OfferFormContainer = styled(FormContainer)`
  align-items: flex-start;
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

const StyledDropdown = styled(Dropdown)`
  width: 100%;
`
