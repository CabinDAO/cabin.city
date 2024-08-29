import React, { useEffect } from 'react'
import { useGeolocation, useWindowSize } from 'react-use'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  CircleMarker,
  useMap,
  useMapEvent,
} from 'react-leaflet'
import {
  createPathComponent,
  LeafletContextInterface,
} from '@react-leaflet/core'
import { GestureHandling } from 'leaflet-gesture-handling'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'
import styled, { css } from 'styled-components'
import theme from '@/styles/theme'
import { MarkerData, onMoveFn } from '@/components/map/Map'
import { MarkerClusterGroup, pinIcon } from '@/components/map/Cluster'
import { AutoImage } from '@/components/core/AutoImage'
import Link from 'next/link'
import equal from 'react-fast-compare'

export const MapDynamic = ({
  height,
  mapRef,
  locations,
  profiles,
  onMove,
  initialZoom = 1.5,
}: {
  height: string
  mapRef?: React.Ref<L.Map>
  locations?: MarkerData[]
  profiles?: MarkerData[]
  onMove?: onMoveFn
  initialZoom?: number
}) => {
  // const mapRef = useRef(null)
  // const { latitude, longitude, error } = useGeolocation()
  // console.log('latlng', latitude, longitude, error)

  L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling)

  return (
    <MapWrapper height={height}>
      <MapContainer
        ref={mapRef}
        center={[20, -30]}
        minZoom={1.5}
        maxZoom={15}
        zoom={initialZoom}
        zoomDelta={0.1}
        zoomSnap={0.5}
        zoomControl={false}
        scrollWheelZoom={false}
        dragging={true}
        style={{ width: '100%', height: '100%', zIndex: '0' }}
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
        <Markers locations={locations} profiles={profiles} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/*{latitude && longitude && (*/}
        {/*  <CircleMarker*/}
        {/*    center={[latitude, longitude]}*/}
        {/*    radius={12}*/}
        {/*    color={theme.colors.yellow400}*/}
        {/*    fillColor={theme.colors.yellow100}*/}
        {/*  >*/}
        {/*    <StyledPopup>You are here</StyledPopup>*/}
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
        minZoom: map.getMinZoom(),
      })
    }
  })

  return null
}

// this is a memoized cluster group so that large numbers of profiles are not re-rendered on every render
const ClusterGroup = React.memo(
  ({ profiles }: { profiles: MarkerData[] }) => {
    return (
      <MarkerClusterGroup chunkedLoading>
        {profiles.map((p, i) => (
          <Marker key={i} position={[p.lat, p.lng]} icon={pinIcon}>
            {p.label && (
              <StyledPopup>
                <MaybeLink newWindow url={p.linkUrl}>
                  {p.label}
                </MaybeLink>
              </StyledPopup>
            )}
          </Marker>
        ))}
      </MarkerClusterGroup>
    )
  },
  (prevProps, nextProps) => equal(prevProps.profiles, nextProps.profiles)
)
ClusterGroup.displayName = 'ClusterGroup'

const Markers = ({
  locations = [],
  profiles = [],
}: {
  locations?: MarkerData[]
  profiles?: MarkerData[]
}) => {
  return (
    <>
      {profiles.length && <ClusterGroup profiles={profiles} />}

      {locations.map((l, i) => (
        // <Marker key={i} position={[l.lat, l.lng]} icon={neighborhoodIcon}>
        //   <StyledPopup>{l.label}</StyledPopup>
        // </Marker>
        <CircleMarker
          key={i}
          center={[l.lat, l.lng]}
          radius={12}
          color={theme.colors.green800}
          fillColor={theme.colors.green400}
        >
          {l.label && (
            <StyledPopup>
              <MaybeLink url={l.linkUrl}>
                {l.imgUrl && <AutoImage src={l.imgUrl} alt={l.label} />}
                {l.label}
              </MaybeLink>
            </StyledPopup>
          )}
        </CircleMarker>
      ))}
    </>
  )
}

const MaybeLink = ({
  url,
  newWindow,
  children,
}: {
  url?: string
  newWindow?: boolean
  children: React.ReactNode
}) => {
  return url ? (
    <Link
      style={{
        cursor: 'pointer',
        textDecoration: 'underline',
        color: theme.colors.green900,
      }}
      href={url}
      target={newWindow ? '_blank' : undefined}
      rel={newWindow ? 'noopener noreferrer' : undefined}
    >
      {children}
    </Link>
  ) : (
    <>{children}</>
  )
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

const StyledPopup = styled(Popup)`
  font-size: 1.6rem;
`

const neighborhoodIcon = L.divIcon({
  className: 'dont-show-the-default-shadow',
  html: `<div style='text-align: center;
      font-weight: 700;
      font-family: monospace;
      position:absolute;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      border-top-left-radius: 50%;
      border-top-right-radius: 50% 100%;
      border-bottom-left-radius: 100% 50%;
      border-bottom-right-radius: 0%;
      /* rotating 45deg clockwise to get the corner bottom center */
      transform: rotate(45deg); 
      
      background-color: ${theme.colors.green400}; 
      color: ${theme.colors.green800}; 
      border-color: ${theme.colors.green800}; 
      border-width: 2px; 
      border-style: solid; 
      width: 28px; 
      height: 28px; 
      margin-left: -14px; 
      margin-top: -36px;
'>icon goes here</div>`,
})
