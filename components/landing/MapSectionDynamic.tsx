import React from 'react'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { formatValue } from '@/utils/display-utils'
import styled from 'styled-components'
import { h1Styles } from '@/components/core/Typography'
import { Map } from '@/components/neighborhoods/Map'

export type MapData = {
  members: number
  citizens: number
  locations: {
    label: string
    lat: number
    lng: number
  }[]
}

export const MapSectionDynamic = ({
  data,
  onMove,
}: {
  data: MapData
  onMove?: (top: number, bottom: number, left: number, right: number) => void
}) => {
  // const mapRef = useRef(null)
  const { deviceSize } = useDeviceSize()

  return (
    <>
      <Stats>
        <span>{formatValue(data.members, 1)} Members</span>
        {deviceSize !== 'mobile' && <span>|</span>}
        <span>{data.citizens} Citizens</span>
        {deviceSize !== 'mobile' && <span>|</span>}
        <span>{data.locations.length} Neighborhoods</span>
      </Stats>
      <Map locations={data.locations} onMove={onMove} />
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
