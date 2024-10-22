import Link from 'next/link'
import { useUser } from '@/components/auth/useUser'
import { useBackend } from '@/components/hooks/useBackend'
import { ProfileFragment } from '@/utils/types/profile'
import { LocationFragment, LocationListResponse } from '@/utils/types/location'
import { formatShortAddress } from '@/lib/address'
import { cloudflareImageUrl } from '@/lib/image'
import { expandRoute } from '@/utils/routing'
import { EMPTY } from '@/utils/display-utils'
import analytics from '@/lib/googleAnalytics/analytics'
import styled from 'styled-components'
import { Caption, H2, H3 } from '@/components/core/Typography'
import Icon from '@/components/core/Icon'
import { ContentCard } from '@/components/core/ContentCard'
import { ImageFlex } from '@/components/core/gallery/ImageFlex'
import { canEditLocation } from '@/lib/permissions'
import { RichTextRender } from '@/components/editor/RichText'

export const ProfileStewardSection = ({
  profile,
}: {
  profile: ProfileFragment
}) => {
  const { user } = useUser()
  const { useGet } = useBackend()

  const { data } = useGet<LocationListResponse>('api_location_list', {
    stewardExternId: profile.externId,
  })

  if (!data || 'error' in data) {
    return null
  }

  const stewardedNeighborhoods = data.locations.filter(
    (n) => n.publishedAt || canEditLocation(user, n)
  )

  const showSection = stewardedNeighborhoods.length > 0

  if (!showSection) {
    return null
  }

  return (
    <ContentCard shape="notch">
      <Container>
        <H3>Neighborhood</H3>
        <Neighborhoods>
          {stewardedNeighborhoods.map((n) => (
            <Neighborhood key={n.externId} neighborhood={n} />
          ))}
        </Neighborhoods>
      </Container>
    </ContentCard>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
  padding: 2.4rem;
`

const Neighborhoods = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
  width: 100%;
`

const Neighborhood = ({ neighborhood }: { neighborhood: LocationFragment }) => {
  const truncatedName =
    (!neighborhood.publishedAt ? '[DRAFT] ' : '') + neighborhood.name

  return (
    <ContainerLink
      href={expandRoute(['n_id', { id: neighborhood.externId }])}
      shallow
      passHref
      style={{ opacity: neighborhood.publishedAt ? 1 : 0.5 }}
      onClick={() => analytics.viewCityDirectoryEvent(neighborhood.externId)}
    >
      <ImageContainer>
        {neighborhood.bannerImageCfId ? (
          <ImageFlex
            sizes={`300px`}
            aspectRatio={4 / 3}
            src={cloudflareImageUrl(neighborhood.bannerImageCfId)}
            alt={neighborhood.name}
          />
        ) : (
          <EmptyImage>
            <Icon name="mountain" size={6} color="yellow500" />
          </EmptyImage>
        )}
      </ImageContainer>
      <Description>
        <H2>{truncatedName}</H2>
        <Caption>{formatShortAddress(neighborhood.address) ?? EMPTY}</Caption>
        <RichTextRender
          initialContent={neighborhood.description}
          maxHeight={10}
        />
      </Description>
    </ContainerLink>
  )
}

const EmptyImage = styled.div`
  display: flex;
  min-height: 20rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.yellow300};
  border: solid 1px ${({ theme }) => theme.colors.green900};
`

const ContainerLink = styled(Link)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1.6rem;
  width: 100%;
  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  border: solid 1px ${({ theme }) => theme.colors.green900};

  ${({ theme }) => theme.bp.md} {
    max-width: 300px;
  }

  img {
    object-fit: cover;
  }
`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
`
