import React from 'react'
import { useGeolocation, useWindowSize } from 'react-use'
import * as L from 'leaflet'
import {
  MapContainer,
  TileLayer,
  Popup,
  CircleMarker,
  useMap,
  useMapEvent,
} from 'react-leaflet'
import { GestureHandling } from 'leaflet-gesture-handling'
import 'leaflet/dist/leaflet.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'
import styled from 'styled-components'
import theme from '@/styles/theme'

export const MapDynamic = ({
  locations,
  onMove,
}: {
  locations: {
    label: string
    lat: number
    lng: number
  }[]
  onMove?: (top: number, bottom: number, left: number, right: number) => void
}) => {
  // const mapRef = useRef(null)
  const { width } = useWindowSize()
  const { latitude, longitude, error } = useGeolocation()
  console.log('latlng', latitude, longitude, error)

  L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling)

  return (
    <MapWrapper>
      <MapContainer
        // ref={mapRef}
        center={[20, -30]}
        zoom={width > 1200 ? 3 : 2}
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
        <Hooks onMove={onMove} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((l, i) => (
          <CircleMarker
            key={i}
            center={[l.lat, l.lng]}
            radius={12}
            color={theme.colors.green800}
            fillColor={theme.colors.green400}
          >
            <Pin>{l.label}</Pin>
          </CircleMarker>
        ))}

        {latitude && longitude && (
          <CircleMarker
            center={[latitude, longitude]}
            radius={12}
            color={theme.colors.yellow400}
            fillColor={theme.colors.yellow100}
          >
            <Pin>You are here</Pin>
          </CircleMarker>
        )}
      </MapContainer>
    </MapWrapper>
  )
}

function lngClamp(degrees: number) {
  return Math.abs(degrees) % 360 > 180
    ? 360 - (Math.abs(degrees) % 360)
    : degrees % 360
}

const Hooks = ({
  onMove,
}: {
  onMove?: (top: number, bottom: number, left: number, right: number) => void
}) => {
  const map = useMap()
  useMapEvent('moveend', (e) => {
    const bounds = map.getBounds()
    const leftLng = lngClamp(bounds.getWest())
    const rightLng = lngClamp(bounds.getEast())

    if (onMove) {
      onMove(bounds.getNorth(), bounds.getSouth(), leftLng, rightLng)
    }
  })
  return null
}

const MapWrapper = styled.div`
  // Important! Always set the container height explicitly
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.bp.md} {
    height: 60vh;
  }
`

const Pin = styled(Popup)`
  font-size: 1.6rem;
`
