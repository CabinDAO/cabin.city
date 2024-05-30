import dynamic from 'next/dynamic'

// loads MapDynamic component on client side only

export const Map = dynamic(
  () => import('./MapDynamic').then((mod) => mod.MapDynamic),
  { ssr: false }
)

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
}

export type onMoveFn = (params: onMoveParams) => void
