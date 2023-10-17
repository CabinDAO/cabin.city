import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import {
  LocationItemFragment,
  useGetLocationsSortedByVoteCountQuery,
} from '@/generated/graphql'
import { getImageUrlByIpfsHash } from '@/lib/image'
import { formatShortAddress } from '@/lib/address'
import { fonts } from '@/components/core/Typography'
import Icon from '@/components/core/Icon'

export const NeighborhoodShowcase = () => {
  const { data } = useGetLocationsSortedByVoteCountQuery({
    variables: { size: 4, cursor: null },
  })

  const locations =
    data?.locationsSortedByVoteCount.data.filter(
      (l): l is LocationItemFragment => !!l
    ) ?? []

  return (
    <Container>
      <Neighborhoods>
        {locations.map((location, index) => {
          const imgURL = getImageUrlByIpfsHash(
            location.bannerImageIpfsHash,
            true
          )
          return (
            <ImageContainer key={index}>
              <Link href={`/location/${location._id}`}>
                <Image
                  alt={location.name ?? 'A Cabin neighborhood'}
                  src={imgURL ?? 'https://fakeimg.pl/500/'}
                  fill={true}
                  sizes="100vw"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
                <TextContainer>
                  <BigText>
                    <Name>{location.name}</Name>
                    <Icon name={'right-arrow'} size={3} color={'white'} />
                  </BigText>
                  <SmallText>{formatShortAddress(location.address)}</SmallText>
                </TextContainer>
              </Link>
            </ImageContainer>
          )
        })}
      </Neighborhoods>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  H1 {
    margin: 4rem;
    font-family: ${fonts.poppins};
  }
`

const Neighborhoods = styled.div`
  display: grid;
  gap: 0;
  width: 100%;
  grid-template-columns: 100vw; // there's exactly one column of 100vw
  grid-auto-rows: 100vw; // infinite rows at 100vw each

  ${({ theme }) => theme.bp.md} {
    grid-template-columns: repeat(2, 50vw); // exactly 2 columns of 50vw each
    grid-auto-rows: 50vw; // infinite rows at 50vw each
  }
`

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
`

const TextContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 30% 10% 8%;
  color: ${({ theme }) => theme.colors.white};

  text-shadow: 2px 2px 3px rgba(0, 0, 0, 20%), -1px -1px 0 rgba(0, 0, 0, 20%),
    1px -1px 0 rgba(0, 0, 0, 20%), -1px 1px 0 rgba(0, 0, 0, 20%),
    1px 1px 0 rgba(0, 0, 0, 20%);
  background-image: linear-gradient(
    hsla(0, 0%, 35.29%, 0) 0%,
    hsla(0, 0%, 34.53%, 0.034375) 16.36%,
    hsla(0, 0%, 32.42%, 0.125) 33.34%,
    hsla(0, 0%, 29.18%, 0.253125) 50.1%,
    hsla(0, 0%, 24.96%, 0.4) 65.75%,
    hsla(0, 0%, 19.85%, 0.546875) 79.43%,
    hsla(0, 0%, 13.95%, 0.675) 90.28%,
    hsla(0, 0%, 7.32%, 0.765625) 97.43%,
    hsla(0, 0%, 0%, 0.8) 100%
  );
`
const BigText = styled.div`
  // need this wrapper so we can do the arrow icon AND the ellipses

  display: flex;
  align-items: center;
  width: 100%;

  // font styles go on wrapper so they affect the ellipses too
  font-family: ${fonts.poppins};
  font-weight: 600;
  font-size: 2.4rem;
  line-height: 4.8rem;

  ${({ theme }) => theme.bp.lg} {
    font-size: 3.2rem;
  }

  span {
    // arrow icon
    flex: none;
    margin-left: 1.6rem;
  }
`

const Name = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const SmallText = styled.div`
  font-family: ${fonts.ibmPlexMono};
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 2.1rem;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
