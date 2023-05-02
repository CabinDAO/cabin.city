import { Dropdown } from '@/components/core/Dropdown'
import { InputText } from '@/components/core/InputText'
import { Body2, H4 } from '@/components/core/Typography'
import { SelectOption } from '@/components/hooks/useDropdownLogic'
import { ChangeEvent, useState } from 'react'
import styled from 'styled-components'

export const EligibilityRequirements = () => {
  const [citizenshipSelectedOption, setCitizenshipSelectedOption] = useState<
    SelectOption | undefined
  >(undefined)
  const [minimumCabinBalance, setMinimumCabinBalance] = useState<number | null>(
    null
  )

  const citizenshipOptions = [
    { label: 'Required', value: true },
    { label: 'Not required', value: false },
  ]

  const handleCabinTokenBalanceChange = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    let parsedValue = 0

    if (e.target.value !== '') {
      parsedValue = parseInt(e.target.value)
      if (isNaN(parsedValue)) {
        return
      }
    }
    setMinimumCabinBalance(parsedValue)
  }

  return (
    <Container>
      <Requirement>
        <RequirementDescription>
          <H4>Applicants must meet all requirements you set here.</H4>
          <OpaqueBody2>
            Leave the fields blank that you don’t wish to constrain.
          </OpaqueBody2>
        </RequirementDescription>
        <InputPair>
          <StyledDropdown
            label="Citizenship"
            placeholder="Select"
            options={citizenshipOptions}
            onSelect={(option: SelectOption) =>
              setCitizenshipSelectedOption(option)
            }
            selectedOption={citizenshipSelectedOption}
          />
          <InputText
            label="₡ABIN holding minimum"
            placeholder="Value"
            onChange={handleCabinTokenBalanceChange}
            value={minimumCabinBalance ? minimumCabinBalance.toString() : ''}
          />
        </InputPair>
      </Requirement>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
`

const Requirement = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
`

const RequirementDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
`

const OpaqueBody2 = styled(Body2)`
  opacity: 0.75;
`

const InputPair = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-direction: row;
  grid-gap: 2.4rem;
  width: 100%;
  align-items: center;
`

const StyledDropdown = styled(Dropdown)`
  width: 100%;
`
