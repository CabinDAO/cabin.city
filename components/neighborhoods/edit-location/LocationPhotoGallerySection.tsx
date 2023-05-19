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
  onStartUploading?: () => void
  uploading?: boolean
}

export const LocationPhotoGallerySection = ({
  title,
  instructions,
  onFilesUploaded,
  onStartUploading,
  uploading = false,
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
            onStartUploading={onStartUploading}
            multiple={!isBanner}
            onFilesUploaded={onFilesUploaded}
            removeEnabled={!!bannerImageUrl}
          />
        </UploadFormContainer>
      </UploadContainer>
      {isBanner ? (
        <BannerPreview uploading={uploading} imageUrl={bannerImageUrl} />
      ) : null}
      {(uploading || imageUrls?.length) && !isBanner ? (
        <ImagesPreview
          uploading={uploading}
          onDelete={onDelete}
          ipfsHashList={ipfsHashList}
        />
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
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.6rem;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
  }
`

const UploadFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2.4rem;

  ${({ theme }) => theme.bp.md} {
    width: 50%;
  }
`
