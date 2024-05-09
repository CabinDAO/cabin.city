import React, { useRef } from 'react'
import * as L from 'leaflet'
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet'
import { GestureHandling } from 'leaflet-gesture-handling'
import 'leaflet/dist/leaflet.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'
import styled from 'styled-components'

export const MapSectionDynamic = () => {
  const neighborhoods: {
    label: string
    lat: number
    lng: number
  }[] = [
    { label: 'Neighborhood Zero', lat: 30.2457, lng: -98.2526 },
    { label: 'Traditional Dream Factory', lat: 38.00311, lng: -8.5599 },
    { label: 'Roots and Water', lat: 18.2087, lng: -67.1038 },
    { label: 'Montaia Basecamp', lat: 37.5079, lng: -118.6378 },
    { label: 'Casa Chironja', lat: 18.4511, lng: -66.0492 },
    { label: 'Elkenmist', lat: 46.2958, lng: -123.4231 },
    { label: 'Cobana', lat: 45.5645, lng: 25.3221 },

    // TODO: real locations with approx lat/lng: select l.name, a."formattedAddress", a.lat, a.lng from "Location" l inner join "Address" a on l.id = a."locationId" where l.type = 'Neighborhood'

    { label: 'Spy Pond', lat: 42.4153, lng: -71.1564729 },
    { label: 'Larkspur, CA', lat: 37.9340915, lng: -122.5352539 },
    { label: 'North Boulder Park', lat: 40.0149856, lng: -105.2705456 },
    { label: 'Oakland, CA', lat: 37.8043514, lng: -122.2711639 },
    { label: 'Eden Forest Collective', lat: 34.4480495, lng: -119.242889 },
    { label: 'Curiosity Courtyard', lat: 33.9850469, lng: -118.4694832 },
  ]

  const mapRef = useRef(null)

  L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling)

  return (
    <Map>
      <MapContainer
        ref={mapRef}
        center={[20, 0]}
        zoom={3}
        zoomDelta={0.1}
        zoomSnap={0.5}
        zoomControl={false}
        scrollWheelZoom={false}
        dragging={true}
        style={{ width: '100%', height: '100%', zIndex: '0' }}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        gestureHandling={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {neighborhoods.map((n, i) => (
          <CircleMarker key={i} center={[n.lat, n.lng]} radius={12}>
            <Pin>{n.label}</Pin>
          </CircleMarker>
        ))}
      </MapContainer>
    </Map>
  )
}

const Map = styled.div`
  // Important! Always set the container height explicitly
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.md} {
    height: 60vh;
    gap: 4.8rem;
  }
`

const Pin = styled(Popup)`
  font-size: 1.6rem;
`
