import { FileUploadButton } from '@/components/core/FileUploadButton'
import { Body2, Caption, H3 } from '@/components/core/Typography'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'
import styled from 'styled-components'
import { BannerPreview } from '../neighborhoods/edit-location/BannerPreview'
import { getImageUrlByIpfsHash } from '@/lib/image'
import { ImagesPreview } from '../neighborhoods/edit-location/ImagesPreview'

interface GalleryUploadSectionProps {
  title: string
  instructions: string
  isBanner?: boolean
  onFilesUploaded: (fileNameIpfsHashMap: FileNameIpfsHashMap) => Promise<void>
  ipfsHashList?: string[]
  onDelete?: (ipfsHash: string) => void
  onStartUploading?: VoidFunction
  uploading?: boolean
  errorMessage?: string
}

export const GalleryUploadSection = ({
  title,
  instructions,
  onFilesUploaded,
  onStartUploading,
  uploading = false,
  isBanner = false,
  ipfsHashList,
  onDelete,
  errorMessage,
}: GalleryUploadSectionProps) => {
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
        <TitleContainer>
          <H3>{title} *</H3>
          {errorMessage ? (
            <Caption emphasized $color="red600">
              {errorMessage}
            </Caption>
          ) : null}
        </TitleContainer>
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

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

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
