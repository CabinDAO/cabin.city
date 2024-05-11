import React, { useRef } from 'react'
import { useWindowSize } from 'react-use'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { useBackend } from '@/components/hooks/useBackend'
import { ProfileStatsResponse } from '@/utils/types/profile'
import {
  LocationSort,
  LocationListParamsType,
  LocationListResponse,
} from '@/utils/types/location'
import * as L from 'leaflet'
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet'
import { GestureHandling } from 'leaflet-gesture-handling'
import 'leaflet/dist/leaflet.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'
import styled from 'styled-components'
import theme from '@/styles/theme'
import { h1Styles } from '@/components/core/Typography'
import { formatValue } from '@/utils/display-utils'

export const MapSectionDynamic = () => {
  // const mapRef = useRef(null)
  const { width } = useWindowSize()
  const { deviceSize } = useDeviceSize()
  const { useGet } = useBackend()

  const { data: stats } = useGet<ProfileStatsResponse>('PROFILE_STATS')
  const { data: locationData } = useGet<LocationListResponse>('LOCATION_LIST', {
    sort: LocationSort.votesDesc,
  } as LocationListParamsType)

  const neighborhoods: {
    [key: string]: {
      lat: number
      lng: number
    }
  } = {
    'Spy Pond': { lat: 42.4153, lng: -71.1564729 },
    'Larkspur, CA': { lat: 37.9340915, lng: -122.5352539 },
    'North Boulder Park': { lat: 40.0149856, lng: -105.2705456 },
    'Oakland, CA': { lat: 37.8043514, lng: -122.2711639 },
    'Eden Forest Collective': { lat: 34.4480495, lng: -119.242889 },
    'Curiosity Courtyard': { lat: 33.9850469, lng: -118.4694832 },
  }

  if (!(!locationData || 'error' in locationData)) {
    for (const location of locationData.locations) {
      if (location.address && location.address.lat && location.address.lng) {
        neighborhoods[location.name] = {
          lat: location.address.lat,
          lng: location.address.lng,
        }
      }
    }
  }

  L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling)

  return (
    <>
      {!(!stats || 'error' in stats) && (
        <Stats>
          <span>{formatValue(stats.profiles, 1)} Members</span>
          {deviceSize !== 'mobile' && <span>|</span>}
          <span>{stats.citizens} Citizens</span>
          {deviceSize !== 'mobile' && <span>|</span>}
          <span>{Object.keys(neighborhoods).length} Neighborhoods</span>
        </Stats>
      )}
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

          {Object.keys(neighborhoods).map((key) => (
            <CircleMarker
              key={key}
              center={[neighborhoods[key].lat, neighborhoods[key].lng]}
              radius={12}
              color={theme.colors.green800}
              fillColor={theme.colors.green400}
            >
              <Pin>{key}</Pin>
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
