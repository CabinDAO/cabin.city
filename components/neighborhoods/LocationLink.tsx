import styled from 'styled-components'
import { LocationAddress } from '@/generated/graphql'
import Image from 'next/image'
import Link from 'next/link'
import { padding } from '@/styles/theme'
import { getImageUrlByIpfsHash } from '@/lib/image'
import { Caption, H4 } from '@/components/core/Typography'

interface LocationLinkProps {
  location: {
    _id: string
    name: string
    shortAddress: string
    bannerImageIpfsHash: string
  }
}

export const LocationLink = ({ location }: LocationLinkProps) => {
  return (
    <Container href={`/location/${location._id}`}>
      <Image
        src={getImageUrlByIpfsHash(location.bannerImageIpfsHash) ?? ''}
        alt={location.name}
        width={72}
        height={72}
      ></Image>
      <Info>
        <FaintCaption>Location</FaintCaption>
        <H4>{location.name}</H4>
        <Caption>{location.shortAddress}</Caption>
      </Info>
    </Container>
  )
}

const Container = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  gap: 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.green900}12;
  ${padding('xs')}
`
const FaintCaption = styled(Caption)`
  opacity: 0.75;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  width: 100%;

  ${H4} {
    margin: 0;
  }
`
