import React, { useRef } from 'react'
import { useWindowSize } from 'react-use'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import * as L from 'leaflet'
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet'
import { GestureHandling } from 'leaflet-gesture-handling'
import 'leaflet/dist/leaflet.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'
import styled from 'styled-components'
import theme from '@/styles/theme'
import { h1Styles } from '@/components/core/Typography'
import { formatValue } from '@/utils/display-utils'

export type MapData = {
  members: number
  citizens: number
  locations: {
    label: string
    lat: number
    lng: number
  }[]
}

export const MapSectionDynamic = ({ data }: { data: MapData }) => {
  // const mapRef = useRef(null)
  const { width } = useWindowSize()
  const { deviceSize } = useDeviceSize()
  L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling)

  return (
    <>
      <Stats>
        <span>{formatValue(data.members, 1)} Members</span>
        {deviceSize !== 'mobile' && <span>|</span>}
        <span>{data.citizens} Citizens</span>
        {deviceSize !== 'mobile' && <span>|</span>}
        <span>{data.locations.length} Neighborhoods</span>
      </Stats>
      <Map>
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
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {data.locations.map((l, i) => (
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
        </MapContainer>
      </Map>
    </>
  )
}

const Stats = styled.div`
  ${h1Styles}

  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-size: 3rem; // repeated here to override h1Styles font size
  margin-top: 4rem;
  margin-bottom: 2rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    font-size: 2.6rem; // repeated here to override h1Styles font size
    margin-bottom: 0;
  }

  ${({ theme }) => theme.bp.lg} {
    font-size: 3rem; // repeated here to override h1Styles font size
  }
`

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
