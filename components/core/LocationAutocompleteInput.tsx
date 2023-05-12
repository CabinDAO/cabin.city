import { InputText } from '@/components/core/InputText'
import { LocationAddressInput } from '@/generated/graphql'
import Script from 'next/script'
import { useEffect, useRef } from 'react'

interface LocationAutocompleteInputProps {
  onLocationChange: (value: LocationAddressInput) => void
  initialValue?: LocationAddressInput | null
}

export const LocationAutocompleteInput = ({
  onLocationChange,
  initialValue,
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
        ref={inputRef}
        label="Location"
        bottomHelpText="Your precise location will not be shown publicly"
      />
    </>
  )
}

const getLocationInputFromPlaceResult = (
  place: google.maps.places.PlaceResult
): LocationAddressInput => {
  const lat = place.geometry?.location?.lat()
  const lng = place.geometry?.location?.lng()

  return {
    formattedAddress: place.formatted_address,
    lat,
    lng,
    admininstrativeAreaLevel1: getValueFromPlaceResult(
      place,
      'administrative_area_level_1'
    ),
    admininstrativeAreaLevel1Short: getShortValueFromPlaceResult(
      place,
      'administrative_area_level_1'
    ),
    country: getValueFromPlaceResult(place, 'country'),
    countryShort: getShortValueFromPlaceResult(place, 'country'),
    streetNumber: getValueFromPlaceResult(place, 'street_number'),
    postalCode: getValueFromPlaceResult(place, 'postal_code'),
    route: getValueFromPlaceResult(place, 'route'),
    routeShort: getShortValueFromPlaceResult(place, 'route'),
    locality: getValueFromPlaceResult(place, 'locality'),
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
