import React from 'react'
import { useWindowSize } from 'react-use'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { formatValue } from '@/utils/display-utils'
import styled from 'styled-components'
import { h1Styles } from '@/components/core/Typography'
import { Map, Marker, onMoveFn } from '@/components/neighborhoods/Map'

export type MapData = {
  members: number
  profiles: {
    lat: number
    lng: number
  }[]
  locations: Marker[]
}

export const MapSection = ({
  data,
  onMove,
}: {
  data: MapData
  onMove?: onMoveFn
}) => {
  // const mapRef = useRef(null)
  const { deviceSize } = useDeviceSize()
  const { width } = useWindowSize()

  return (
    <>
      {/*<Stats>*/}
      {/*<span>{formatValue(data.members, 1)} Members</span>*/}
      {/*{deviceSize !== 'mobile' && <span>|</span>}*/}
      {/*<span>{data.locations.length} Neighborhoods</span>*/}
      {/*</Stats>*/}
      <Map
        height="80vh"
        initialZoom={width > 1200 ? 3 : 2}
        locations={data.locations}
        profiles={data.profiles}
        onMove={onMove}
      />
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
