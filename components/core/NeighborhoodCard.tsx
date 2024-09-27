import styled from 'styled-components'
import { Caption, H2, Subline1 } from './Typography'
import Icon from './Icon'
import { EMPTY, truncate } from '@/utils/display-utils'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import Link from 'next/link'
import { ImageFlex } from './gallery/ImageFlex'
import { HorizontalDivider } from './Divider'
import analytics from '@/lib/googleAnalytics/analytics'
import { LocationFragment } from '@/utils/types/location'
import { formatShortAddress } from '@/lib/address'
import { cloudflareImageUrl } from '@/lib/image'
import { expandRoute } from '@/utils/routing'

type CardVariant = 'home' | 'city-directory'

const bannerImageHeight = 258

export const NeighborhoodCard = ({
  location,
  variant = 'city-directory',
}: {
  location: LocationFragment
  variant?: CardVariant
}) => {
  const name = location.name ?? 'New Neighborhood'

  const { deviceSize } = useDeviceSize()

  const truncatedName =
    (!location.publishedAt ? '[DRAFT] ' : '') +
    (deviceSize === 'tablet' ? truncate(name, 30) : name)

  const cardWidth = variant === 'home' ? 412 : 388

  return (
    <OuterContainer
      variant={variant}
      widthPx={cardWidth}
      style={{ opacity: location.publishedAt ? 1 : 0.5 }}
    >
      <ContainerLink
        href={expandRoute(['n_id', { id: location.externId }])}
        shallow
        passHref
        onClick={() => analytics.viewCityDirectoryEvent(location.externId)}
      >
        <ImageContainer widthPx={cardWidth}>
          {location.bannerImageCfId ? (
            <ImageFlex
              sizes={`${cardWidth}px`}
              quality={40}
              aspectRatio={cardWidth / bannerImageHeight}
              src={cloudflareImageUrl(location.bannerImageCfId)}
              alt={name}
            />
          ) : (
            <EmptyImageContainer>
              <Icon name="mountain" size={6} color="yellow500" />
            </EmptyImageContainer>
          )}
        </ImageContainer>
        <ContentContainer>
          <SummaryContainer>
            <NameH2>{truncatedName}</NameH2>
            <Caption>{formatShortAddress(location.address) ?? EMPTY}</Caption>
          </SummaryContainer>
        </ContentContainer>
        <HorizontalDivider />
      </ContainerLink>
    </OuterContainer>
  )
}

const ListingTypeTag = ({ position }: { position: number }) => {
  return (
    <LocationTagContainer>
      <Icon color={'green400'} size={1.1} name={'logo-cabin'} />
      <Caption $color="yellow100">#{position}</Caption>
    </LocationTagContainer>
  )
}

const EmptyImageContainer = styled.div`
  display: flex;
  min-height: 20rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.yellow300};
  border: solid 1px ${({ theme }) => theme.colors.green900};
`

const OuterContainer = styled.div<{ widthPx: number; variant: CardVariant }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.yellow200};
  max-width: ${({ widthPx }) => widthPx}px;

  ${({ variant, widthPx, theme }) => {
    if (variant === 'home') {
      return `
        ${theme.bp.lg} {
          width: ${widthPx}px;
        }
        `
    }
  }}
`

const ContainerLink = styled(Link)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1.6rem;
`

const ImageContainer = styled.div<{ widthPx: number }>`
  position: relative;
  width: 100%;
  border: solid 1px ${({ theme }) => theme.colors.green900};
  ${({ theme }) => theme.bp.md} {
    max-width: ${({ widthPx }) => widthPx}px;
  }
  img {
    object-fit: cover;
  }
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1.6rem;
  width: 100%;
`

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
`

const NameH2 = styled(H2)`
  margin-bottom: 0.4rem;
  ${({ theme }) => theme.bp.md} {
    max-width: 80%;
  }
`

const TagContainer = styled.div`
  position: absolute;
  bottom: 0.9rem;
  left: 0.9rem;
  background-color: ${({ theme }) => theme.colors.yellow100};
  padding: 0.7rem 1.2rem;
  border-radius: 0.4rem;
  width: max-content;
`

const LocationTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.4rem 1rem;
  border-radius: 6rem;
  background-color: ${({ theme }) => theme.colors.green900};
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`
