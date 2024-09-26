import React, { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import { useBackend } from '@/components/hooks/useBackend'
import { ProfileMappableResponse } from '@/utils/types/profile'
import { cloudflareImageUrl } from '@/lib/image'
import styled from 'styled-components'
import { h1Styles } from '@/components/core/Typography'
import { Map, MarkerData, onMoveFn } from '@/components/map/Map'

export type MapData = {
  members: number
  locations: MarkerData[]
}

export const MapSection = ({
  data,
  onMove,
}: {
  data: MapData
  onMove?: onMoveFn
}) => {
  const { width } = useWindowSize()

  // only load map profiles once
  const { get } = useBackend()
  const [profilesForMap, setProfilesForMap] = useState<MarkerData[]>([])
  useEffect(() => {
    get<ProfileMappableResponse>('api_profile_mappable').then((res) => {
      if (!res || 'error' in res) return
      setProfilesForMap(
        res['profiles'].map((p) => {
          return {
            label: p.name,
            lat: p.lat,
            lng: p.lng,
            imgUrl: cloudflareImageUrl(p.avatarCfId, 'mapAvatar'),
            linkUrl: `/profile/${p.externId}`,
          }
        })
      )
    })
  }, [])

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
        profiles={profilesForMap}
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
