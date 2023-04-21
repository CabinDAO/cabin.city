import { FileUploadButton } from '@/components/core/FileUploadButton'
import { Body2, H3 } from '@/components/core/Typography'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'
import styled from 'styled-components'

interface LocationPhotoGallerySectionProps {
  title: string
  instructions: string
  onFilesUploaded: (fileNameIpfsHashMap: FileNameIpfsHashMap) => Promise<void>
}

export const LocationPhotoGallerySection = ({
  title,
  instructions,
  onFilesUploaded,
}: LocationPhotoGallerySectionProps) => {
  return (
    <Container>
      <H3>{title}</H3>
      <UploadContainer>
        <Body2>{instructions}</Body2>
        <FileUploadButton onFilesUploaded={onFilesUploaded} />
      </UploadContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
`

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 2.4rem;
`
