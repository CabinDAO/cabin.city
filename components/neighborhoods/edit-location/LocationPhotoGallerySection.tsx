import { FileUploadButton } from '@/components/core/FileUploadButton'
import { Body2, H3 } from '@/components/core/Typography'
import { InputMaybe } from '@/generated/graphql'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'
import styled from 'styled-components'
import { BannerPreview } from './BannerPreview'
import { getImageUrlByIpfsHash } from '@/lib/image'
import { ImagesPreview } from './ImagesPreview'

interface LocationPhotoGallerySectionProps {
  title: string
  instructions: string
  isBanner?: boolean
  onFilesUploaded: (fileNameIpfsHashMap: FileNameIpfsHashMap) => Promise<void>
  ipfsHashList?: (InputMaybe<string> | undefined)[]
  onDelete?: (ipfsHash: InputMaybe<string> | undefined) => void
}

export const LocationPhotoGallerySection = ({
  title,
  instructions,
  onFilesUploaded,
  isBanner = false,
  ipfsHashList,
  onDelete,
}: LocationPhotoGallerySectionProps) => {
  if (!ipfsHashList) {
    return null
  }

  const imageUrls = ipfsHashList
    ?.map((ipfsHash) => getImageUrlByIpfsHash(ipfsHash, true))
    .filter(Boolean) as string[]
  const bannerImageUrl = isBanner ? imageUrls?.[0] : null

  return (
    <Container>
      <UploadContainer>
        <H3>{title}</H3>
        <UploadFormContainer>
          <Body2>{instructions}</Body2>
          <FileUploadButton
            onFilesUploaded={onFilesUploaded}
            removeEnabled={!!bannerImageUrl}
          />
        </UploadFormContainer>
      </UploadContainer>
      {bannerImageUrl ? <BannerPreview imageUrl={bannerImageUrl} /> : null}
      {imageUrls?.length && !bannerImageUrl ? (
        <ImagesPreview onDelete={onDelete} ipfsHashList={ipfsHashList} />
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2.4rem;
  align-items: center;
  justify-content: center;
`

const UploadContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
`

const UploadFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 2.4rem;
`
