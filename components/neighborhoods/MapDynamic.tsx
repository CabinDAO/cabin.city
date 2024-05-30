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
import { onMoveFn } from '@/components/neighborhoods/Map'

export const MapDynamic = ({
  height,
  locations,
  onMove,
}: {
  height: string
  locations: {
    label: string
    lat: number
    lng: number
  }[]
  onMove?: onMoveFn
}) => {
  // const mapRef = useRef(null)
  const { width } = useWindowSize()
  // const { latitude, longitude, error } = useGeolocation()
  // console.log('latlng', latitude, longitude, error)

  L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling)

  return (
    <MapWrapper height={height}>
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
        minZoom={1.5}
        // worldCopyJump={true}
        maxBounds={[
          [90, -180],
          [-90, 180],
        ]}
        maxBoundsViscosity={1}
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

        {/*{latitude && longitude && (*/}
        {/*  <CircleMarker*/}
        {/*    center={[latitude, longitude]}*/}
        {/*    radius={12}*/}
        {/*    color={theme.colors.yellow400}*/}
        {/*    fillColor={theme.colors.yellow100}*/}
        {/*  >*/}
        {/*    <Pin>You are here</Pin>*/}
        {/*  </CircleMarker>*/}
        {/*)}*/}
      </MapContainer>
    </MapWrapper>
  )
}

// function lngClamp(degrees: number) {
//   const sign = -1 * (Math.floor(degrees / 180) % 2)
//   return Math.abs(degrees) % 360 > 180
//     ? sign * (360 - (degrees % 360))
//     : degrees % 360
// }

const Hooks = ({ onMove }: { onMove?: onMoveFn }) => {
  const map = useMap()
  useMapEvent('moveend', (e) => {
    const center = map.getCenter()
    const bounds = map.getBounds()

    if (onMove) {
      onMove({
        center: {
          lat: center.lat,
          lng: center.lng,
        },
        bounds: {
          north: bounds.getNorth(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          west: bounds.getWest(),
        },
        zoom: map.getZoom(),
      })
    }
  })
  return null
}

const MapWrapper = styled.div<{ height: string }>`
  // Important! Always set the container height explicitly
  width: 100%;
  height: ${({ height }) => height};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .leaflet-container {
    outline: 0 !important;
  }
`

const Pin = styled(Popup)`
  font-size: 1.6rem;
`
