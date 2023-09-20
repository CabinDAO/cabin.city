import Link from 'next/link'
import styled from 'styled-components'
import { useGetOffersByIdsQuery } from '@/generated/graphql'
import { getImageUrlByIpfsHash } from '@/lib/image'
import Image from 'next/image'
import { fonts } from '@/components/core/Typography'
import Icon from '@/components/core/Icon'
import { formatShortAddress } from '@/lib/address'
import { formatRange } from '@/utils/display-utils'
import { parseISO } from 'date-fns'
import { formatOfferPrice } from '@/components/offers/Price'

const cabinWeekIDs =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? [
        '373883889220845648', // Elkenmist
        '373884974581940305', // N0
        '373885328800350288', // Mana
        '373885641076768848', // TDF
        '376233981159407697', // N0
        '376332972085739600', // N0
      ]
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' ||
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'
    ? [
        '373340699343454289',
        '373689242991198289',
        '373340554520428625',
        '373412722869534801',
      ]
    : ['373344986613154304', '373068568228528640', '373070482102026752']

export const NeighborhoodShowcase = () => {
  const { data } = useGetOffersByIdsQuery({
    variables: {
      ids: cabinWeekIDs,
    },
  })

  return (
    <Container>
      <Neighborhoods>
        {data?.getOffersByIds.map((cabinWeek, index) => {
          const imgURL = getImageUrlByIpfsHash(cabinWeek.imageIpfsHash, true)
          const price = cabinWeek.price
            ? formatOfferPrice(cabinWeek.price).join(' ')
            : '-'
          return (
            <ImageContainer key={index}>
              <Link href={`/experience/${cabinWeek._id}`}>
                <Image
                  alt={`Cabin Week at ${cabinWeek.location.name}`}
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
                    {formatRange(
                      parseISO(cabinWeek.startDate),
                      parseISO(cabinWeek.endDate)
                    )}
                  </BigText>
                  <BigText>
                    <Name>
                      {formatShortAddress(cabinWeek.location.address)}
                    </Name>
                    <Icon name={'right-arrow'} size={3} color={'white'} />
                  </BigText>
                  <SmallText>
                    {price} | {cabinWeek.title}
                  </SmallText>
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
