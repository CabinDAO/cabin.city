import { ChangeEvent } from 'react'
import { OfferEditParams, OfferPriceInterval } from '@/utils/types/offer'
import { REQUIRED_FIELD_ERROR } from '@/utils/validate'
import styled from 'styled-components'
import { SelectOption } from '@/components/hooks/useDropdownLogic'
import { Dropdown } from '@/components/core/Dropdown'
import { InputText } from '@/components/core/InputText'
import { H3 } from '@/components/core/Typography'
import { Pair } from './EditOfferForm'

const labelByOfferPriceInterval = (unit: OfferPriceInterval): string => {
  switch (unit) {
    case OfferPriceInterval.Hourly:
      return 'Per Hour'
    case OfferPriceInterval.Daily:
      return 'Per Day'
    case OfferPriceInterval.Weekly:
      return 'Per Week'
    case OfferPriceInterval.Monthly:
      return 'Per Month'
    case OfferPriceInterval.FlatFee:
    default:
      return 'Total Cost'
  }
}

const options = Object.values(OfferPriceInterval).map((interval) => ({
  label: labelByOfferPriceInterval(interval),
  value: interval,
}))

interface PricingProps {
  price?: OfferEditParams['price']
  priceInterval?: OfferEditParams['priceInterval']
  onPriceChange?: (
    price: OfferEditParams['price'],
    priceInterval: OfferEditParams['priceInterval']
  ) => void
  highlightErrors?: boolean
}

export const Pricing = ({
  price,
  priceInterval,
  onPriceChange,
  highlightErrors,
}: PricingProps) => {
  const handlePriceChange = async (e: ChangeEvent<HTMLInputElement>) => {
    let parsedValue = 0

    if (e.target.value !== '') {
      parsedValue = parseInt(e.target.value)
      if (isNaN(parsedValue)) {
        return
      }
    }

    if (onPriceChange) {
      onPriceChange(parsedValue as number, priceInterval as OfferPriceInterval)
    }
  }

  const handlePriceUnitSelect = (option: SelectOption) => {
    if (onPriceChange) {
      onPriceChange(price as number, option.value as OfferPriceInterval)
    }
  }

  return (
    <Pair>
      <H3>Pricing</H3>
      <InputPair>
        <InputText
          required
          placeholder="$ Value"
          label="Price"
          onChange={handlePriceChange}
          value={price && (price ?? 0) > 0 ? price.toString() : ''}
          error={highlightErrors && !price}
          errorMessage={REQUIRED_FIELD_ERROR}
        />
        <Dropdown
          label="Unit"
          required
          options={options}
          onSelect={handlePriceUnitSelect}
          selectedOption={
            options.find((option) => option.value === priceInterval) ??
            options[0]
          }
        />
      </InputPair>
    </Pair>
  )
}

const InputPair = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.8rem;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
`
