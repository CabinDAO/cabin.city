import React, { useEffect } from 'react'
import { useGeolocation, useWindowSize } from 'react-use'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import iconRetinaUrl from '@/public/images/marker-icon-2x.png'
import iconUrl from '@/public/images/marker-icon-2x.png'
import shadowUrl from '@/public/images/marker-shadow.png'
import {
  MapContainer,
  TileLayer,
  Popup,
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
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster/dist/leaflet.markercluster.js'
import styled, { css } from 'styled-components'
import theme from '@/styles/theme'
import { Marker, onMoveFn } from '@/components/neighborhoods/Map'
import { AutoImage } from '@/components/core/AutoImage'
import Link from 'next/link'

export const MapDynamic = ({
  height,
  locations,
  profiles,
  onMove,
  initialZoom = 1.5,
}: {
  height: string
  locations?: Marker[]
  profiles?: Marker[]
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
        // ref={mapRef}
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

const Markers = ({
  locations = [],
  profiles = [],
}: {
  locations?: Marker[]
  profiles?: Marker[]
}) => {
  const map = useMap()

  const pinIcon = L.icon({
    iconRetinaUrl: iconRetinaUrl.src,
    iconUrl: iconUrl.src,
    shadowUrl: shadowUrl.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  })

  if (profiles.length) {
    const profileMarkers = L.markerClusterGroup()
    profiles.forEach((p) => {
      const marker = L.marker([p.lat, p.lng], { icon: pinIcon })
      // marker.bindPopup()
      profileMarkers.addLayer(marker)
    })
    map.addLayer(profileMarkers)
  }

  return (
    <>
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
          <StyledPopup>
            <MaybeLink url={l.linkUrl}>
              {l.imgUrl && <AutoImage src={l.imgUrl} alt={l.label} />}
              {l.label}
            </MaybeLink>
          </StyledPopup>
        </CircleMarker>
      ))}
    </>
  )
}

const MaybeLink = ({
  url,
  children,
}: {
  url?: string
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

//----------------------------------------------
//
//       CLUSTERING react component attempt
//
//----------------------------------------------

//webpack failing when loading leaflet marker icon
// delete (L.Icon.Default as any).prototype._getIconUrl
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
//   iconUrl: require('leaflet/dist/images/marker-icon.png').default,
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
// })

// type ClusterType = { [key in string]: any }
//
// type ClusterEvents = {
//   onClick?: L.LeafletMouseEventHandlerFn
//   onDblClick?: L.LeafletMouseEventHandlerFn
//   onMouseDown?: L.LeafletMouseEventHandlerFn
//   onMouseUp?: L.LeafletMouseEventHandlerFn
//   onMouseOver?: L.LeafletMouseEventHandlerFn
//   onMouseOut?: L.LeafletMouseEventHandlerFn
//   onContextMenu?: L.LeafletMouseEventHandlerFn
// }
//
// type MarkerClusterControl = L.MarkerClusterGroupOptions & {
//   children: React.ReactNode
// } & ClusterEvents
//
// function getPropsAndEvents(props: MarkerClusterControl) {
//   let clusterProps: ClusterType = {}
//   let clusterEvents: ClusterType = {}
//   const { children, ...rest } = props
//   // Splitting props and events to different objects
//   Object.entries(rest).forEach(([propName, prop]) => {
//     if (propName.startsWith('on')) {
//       clusterEvents = { ...clusterEvents, [propName]: prop }
//     } else {
//       clusterProps = { ...clusterProps, [propName]: prop }
//     }
//   })
//   return [clusterProps, clusterEvents]
// }
//
// function createMarkerCluster(
//   props: MarkerClusterControl,
//   context: LeafletContextInterface
// ) {
//   const [clusterProps, clusterEvents] = getPropsAndEvents(props)
//   const clusterGroup = new L.MarkerClusterGroup(clusterProps)
//
//   useEffect(() => {
//     Object.entries(clusterEvents).forEach(([eventAsProp, callback]) => {
//       const clusterEvent = `cluster${eventAsProp.substring(2).toLowerCase()}`
//       clusterGroup.on(clusterEvent, callback)
//     })
//     return () => {
//       Object.entries(clusterEvents).forEach(([eventAsProp]) => {
//         const clusterEvent = `cluster${eventAsProp.substring(2).toLowerCase()}`
//         clusterGroup.removeEventListener(clusterEvent)
//       })
//     }
//   }, [clusterEvents, clusterGroup])
//
//   return {
//     instance: clusterGroup,
//     context: { ...context, layerContainer: clusterGroup },
//   }
// }
//
// const updateMarkerCluster = (
//   instance: L.MarkerClusterGroup,
//   props: MarkerClusterControl,
//   prevProps: MarkerClusterControl
// ) => {
//   //TODO when prop change update instance
//   if (props.showCoverageOnHover !== prevProps.showCoverageOnHover) {
//   }
// }
//
// // const MarkerClusterGroup = createPathComponent<
// //   L.MarkerClusterGroup,
// //   MarkerClusterControl
// // >(createMarkerCluster, updateMarkerCluster)
//
// const MarkerForCluster = ({ lat, lng }: { lat: number; lng: number }) => {
//   return null
// }
//
// const MarkerClusterGroup = ({
//   locations,
//   children,
// }: {
//   locations: { lat: number; lng: number }[]
//   children: React.ReactNode
// }) => {
//   React.Children.forEach(children, (child) => {
//     // Ensure child is a valid React element
//     if (React.isValidElement(child)) {
//       // Access child props
//       console.log(child.props)
//     }
//   })
//
//   return (
//     <MarkerClusterGroup>
//       {locations.map((l, i) => (
//         <MarkerForCluster key={i} lat={l.lat} lng={l.lng} />
//       ))}
//     </MarkerClusterGroup>
//   )
// }
