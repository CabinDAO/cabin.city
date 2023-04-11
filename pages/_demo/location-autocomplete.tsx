import { InputText } from '@/components/core/InputText'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { NextPage } from 'next'
import Script from 'next/script'
import { useEffect, useRef } from 'react'

const LocationAutoCompleteDemo: NextPage = () => {
  const autoCompleteRef = useRef<google.maps.places.Autocomplete>()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
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
              const place = await autoCompleteRef.current.getPlace()
              console.log({ place })
              const lat = place.geometry?.location?.lat()
              const lng = place.geometry?.location?.lng()
              console.log({ lat, lng })
            }
          )
        }
      }
    }
  }, [])

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`}
        async
      />
      <SingleColumnLayout>
        <InputText ref={inputRef} />
      </SingleColumnLayout>
    </>
  )
}

export default LocationAutoCompleteDemo
