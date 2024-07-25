import { useState } from 'react'
import { usePlacesWidget } from 'react-google-autocomplete'
import { AddressFragmentType } from '@/utils/types/location'
import { InputText } from '@/components/core/InputText'

export const LocationAutocompleteInput = ({
  onLocationChange,
  initialValue,
  preciseLocation,
  error,
  errorMessage,
  bottomHelpText,
  disabled,
  placeholder,
}: {
  onLocationChange: (value: AddressFragmentType) => void
  initialValue?: AddressFragmentType | null
  preciseLocation?: boolean
  error: boolean
  errorMessage?: string
  bottomHelpText?: string
  disabled?: boolean
  placeholder?: string
}) => {
  const [value, setValue] = useState(initialValue?.formattedAddress || '')
  const { ref: inputRef } = usePlacesWidget<HTMLInputElement>({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    options: {
      fields: ['address_components', 'geometry.location', 'formatted_address'],
      // https://developers.google.com/maps/documentation/javascript/supported_types
      types: preciseLocation
        ? ['geocode']
        : [
            // 'geocode',
            // 'address',
            // '(regions)',
            '(cities)',
          ],
    },
    onPlaceSelected: (place) => {
      const addr = getFragment(place)
      setValue(addr.formattedAddress || '')
      onLocationChange(addr)
    },
  })

  return (
    <>
      <InputText
        ref={inputRef}
        label="Location"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        required
        disabled={disabled}
        bottomHelpText={bottomHelpText}
        error={error}
        errorMessage={errorMessage}
      />
    </>
  )
}

const getFragment = (
  place: google.maps.places.PlaceResult
): AddressFragmentType => {
  return {
    formattedAddress: place.formatted_address || null,
    lat: place.geometry?.location?.lat() || null,
    lng: place.geometry?.location?.lng() || null,
    admininstrativeAreaLevel1:
      getValueFromPlaceResult(place, 'administrative_area_level_1') || null,
    admininstrativeAreaLevel1Short:
      getShortValueFromPlaceResult(place, 'administrative_area_level_1') ||
      null,
    country: getValueFromPlaceResult(place, 'country') || null,
    countryShort: getShortValueFromPlaceResult(place, 'country') || null,
    streetNumber: getValueFromPlaceResult(place, 'street_number') || null,
    postalCode: getValueFromPlaceResult(place, 'postal_code') || null,
    route: getValueFromPlaceResult(place, 'route') || null,
    routeShort: getShortValueFromPlaceResult(place, 'route') || null,
    locality: getValueFromPlaceResult(place, 'locality') || null,
  }
}

const getValueFromPlaceResult = (
  place: google.maps.places.PlaceResult,
  field: string
) => {
  return place.address_components?.find((component) =>
    component.types.includes(field)
  )?.long_name
}

const getShortValueFromPlaceResult = (
  place: google.maps.places.PlaceResult,
  field: string
) => {
  return place.address_components?.find((component) =>
    component.types.includes(field)
  )?.short_name
}
