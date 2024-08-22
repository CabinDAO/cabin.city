import dynamic from 'next/dynamic'

// loads MapDynamic component on client side only

export const Map = dynamic(
  () => import('./MapDynamic').then((mod) => mod.MapDynamic),
  { ssr: false }
)

export type MarkerData = {
  lat: number
  lng: number
  label?: string
  imgUrl?: string
  linkUrl?: string
}

export type onMoveParams = {
  center: {
    lat: number
    lng: number
  }
  bounds: {
    north: number
    south: number
    east: number
    west: number
  }
  zoom: number
  minZoom: number
}

export type onMoveFn = (params: onMoveParams) => void
