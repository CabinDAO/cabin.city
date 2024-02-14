import { useEffect, useRef } from 'react'
import Script from 'next/script'
import { AddressFragment } from '@/utils/types/location'
import { InputText } from '@/components/core/InputText'

interface LocationAutocompleteInputProps {
  onLocationChange: (value: AddressFragment) => void
  initialValue?: AddressFragment | null
  error: boolean
  errorMessage?: string
}

export const LocationAutocompleteInput = ({
  onLocationChange,
  initialValue,
  error,
  errorMessage,
}: LocationAutocompleteInputProps) => {
  const autoCompleteRef = useRef<google.maps.places.Autocomplete>()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = initialValue?.formattedAddress ?? ''
    }

    if (!window.initMap) {
      window.initMap = () => {
        const options = {
          fields: ['address_components', 'geometry', 'formatted_address'],
        }

        if (inputRef.current) {
          autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
          )

          autoCompleteRef.current.addListener(
            'place_changed',
            async function () {
              if (!autoCompleteRef.current) return
              const place = autoCompleteRef.current.getPlace()

              onLocationChange(getLocationInputFromPlaceResult(place))
            }
          )
        }
      }
    }
  }, [initialValue?.formattedAddress, onLocationChange])

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`}
        async
      />
      <InputText
        required
        ref={inputRef}
        label="Location"
        bottomHelpText="Your precise location will not be shown publicly"
        error={error}
        errorMessage={errorMessage}
      />
    </>
  )
}

const getLocationInputFromPlaceResult = (
  place: google.maps.places.PlaceResult
): AddressFragment => {
  const lat = place.geometry?.location?.lat() || null
  const lng = place.geometry?.location?.lng() || null

  return {
    formattedAddress: place.formatted_address || null,
    lat,
    lng,
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
