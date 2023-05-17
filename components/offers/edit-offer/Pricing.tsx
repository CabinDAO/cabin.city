import { Dropdown } from '@/components/core/Dropdown'
import { InputText } from '@/components/core/InputText'
import { H3 } from '@/components/core/Typography'
import { SelectOption } from '@/components/hooks/useDropdownLogic'
import { OfferPrice, OfferPriceUnit } from '@/generated/graphql'
import { labelByOfferPriceUnit } from '@/utils/offer'
import { ChangeEvent } from 'react'
import styled from 'styled-components'

const options = Object.values(OfferPriceUnit).map((unit) => ({
  label: labelByOfferPriceUnit(unit),
  value: unit,
}))

interface PricingProps {
  price?: OfferPrice
  onPriceChange?: (value: OfferPrice) => void
}

export const Pricing = ({ price, onPriceChange }: PricingProps) => {
  const handlePriceChange = async (e: ChangeEvent<HTMLInputElement>) => {
    let parsedValue = 0

    if (e.target.value !== '') {
      parsedValue = parseInt(e.target.value)
      if (isNaN(parsedValue)) {
        return
      }
    }

    if (onPriceChange) {
      onPriceChange({
        amountCents: (parsedValue * 100) as number,
        unit: price?.unit as OfferPriceUnit,
      })
    }
  }

  const handlePriceUnitSelect = (option: SelectOption) => {
    if (onPriceChange) {
      onPriceChange({
        amountCents: price?.amountCents as number,
        unit: option.value as OfferPriceUnit,
      })
    }
  }

  return (
    <Container>
      <H3>Pricing</H3>
      <InputPair>
        <InputText
          placeholder="$ Value"
          label="Price"
          onChange={handlePriceChange}
          value={
            price && price.amountCents > 0
              ? (price.amountCents / 100).toString()
              : ''
          }
        />
        <Dropdown
          label="Unit"
          options={options}
          onSelect={handlePriceUnitSelect}
          selectedOption={options.find(
            (option) => option.value === price?.unit
          )}
        />
      </InputPair>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 50%;
`

const InputPair = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.8rem;
  width: 100%;
  justify-content: center;
  align-items: center;
`
