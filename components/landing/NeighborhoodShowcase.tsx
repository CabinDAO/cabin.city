import Link from 'next/link'
import styled from 'styled-components'
import { useGetLocationsByIdsQuery } from '@/generated/graphql'
import { getImageUrlByIpfsHash } from '@/lib/image'
import Image from 'next/image'
import { H1, H3, fonts } from '@/components/core/Typography'
import Icon from '@/components/core/Icon'
import { formatShortAddress } from '@/lib/address'

export const NeighborhoodShowcase = () => {
  const { data, loading, error } = useGetLocationsByIdsQuery({
    variables: {
      ids:
        process.env.NODE_ENV === 'production'
          ? [
              '364553837499908173', // N0
              '365094230524166221', // Mana
              '365455154129928260', // Elkenmist
              '364890877983719504', // TDF
            ]
          : ['372776408692294144', '373424710078169600', '373425676224561664'],
    },
  })

  return (
    <Container>
      <Neighborhoods>
        {data?.getLocationsByIds.map((location, index) => {
          const imgURL = getImageUrlByIpfsHash(
            location.bannerImageIpfsHash,
            true
          )
          return (
            <ImageContainer key={index}>
              <Image
                alt={location.name ?? 'A Cabin neighborhood'}
                src={imgURL ?? 'https://placehold.it/500'}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
              <CaptionContainer>
                <Link href={`/location/${location._id}`}>
                  <Name>{location.name}</Name>
                  <Icon name={'right-arrow'} size={3} color={'white'} />
                  <Address>{formatShortAddress(location.address)}</Address>
                </Link>
              </CaptionContainer>
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
  grid-auto-rows: 100vw;
  grid-template-areas:
    'a'
    'b'
    'c'
    'd';

  ${({ theme }) => theme.bp.md} {
    grid-auto-rows: 50vw;
    //grid-auto-columns: minmax(5rem, 50vw);
    grid-template-areas:
      'a b'
      'c d';
  }
`

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
`

const CaptionContainer = styled.div`
  position: absolute;
  bottom: 10%;
  left: 10%;
  width: 80%;
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 0px 0px 50px ${({ theme }) => theme.colors.black};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  span + span {
    // align the icon
    margin-left: 1.6rem;
    display: inline-block;
    vertical-align: text-bottom;
  }
`
const Name = styled.span`
  font-family: ${fonts.poppins};
  font-weight: 600;
  line-height: 6.7rem;
  font-size: 2.4rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${({ theme }) => theme.bp.lg} {
    font-size: 3.2rem;
  }
`

const Address = styled.div`
  font-family: ${fonts.ibmPlexMono};
  font-size: 1.4rem;
`
