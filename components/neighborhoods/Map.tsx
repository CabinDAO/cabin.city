import dynamic from 'next/dynamic'

// loads MapDynamic component on client side only

export const Map = dynamic(
  () => import('./MapDynamic').then((mod) => mod.MapDynamic),
  { ssr: false }
)
