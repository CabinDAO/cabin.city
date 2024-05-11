import dynamic from 'next/dynamic'

// loads MapSectionDynamic component on client side only

export const MapSection = dynamic(
  () => import('./MapSectionDynamic').then((mod) => mod.MapSectionDynamic),
  { ssr: false }
)
