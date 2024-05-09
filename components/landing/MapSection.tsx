import dynamic from 'next/dynamic'

export const MapSection = dynamic(
  () => import('./MapSectionDynamic').then((mod) => mod.MapSectionDynamic),
  { ssr: false }
)
