import { useRef } from 'react'
import styled from 'styled-components'
import { ContentCard } from './ContentCard'
import Icon, { IconName } from './Icon'
import { Body2, Caption } from './Typography'
import { useFilesUpload } from '../neighborhoods/useFilesUpload'
import {
  MAX_FILE_SIZE,
  SUPPORTED_FILE_TYPES,
  UploadedFilesMap,
} from '@/utils/types/image'

const bytesToMegabytes = (bytes: number) => bytes / 1024 / 1024

export const FileUploadDropzone = ({
  iconName,
  onFilesUploaded,
  preprocessFiles,
}: {
  iconName: IconName
  onFilesUploaded: (files: UploadedFilesMap) => Promise<void>
  preprocessFiles?: (files: FileList | File[]) => FileList | File[]
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { handleDrag, handleDrop, handleChange, isDragging } = useFilesUpload({
    onFilesUploaded,
    preprocessFiles,
  })

  const onButtonClick = () => {
    inputRef?.current?.click()
  }

  const fileTypesListString = SUPPORTED_FILE_TYPES.map((type, index) => {
    const typeWithoutPrefix = type.split('/')[1].toLocaleUpperCase()
    if (index === SUPPORTED_FILE_TYPES.length - 1) {
      return `or ${typeWithoutPrefix}`
    }
    return typeWithoutPrefix
  }).join(', ')

  return (
    <StyledContentCard shape="notch-all">
      <FileUploadDropzoneContainer
        onDragEnter={handleDrag}
        onClick={onButtonClick}
        onSubmit={(e) => e.preventDefault()}
      >
        <UploadInput
          type="file"
          ref={inputRef}
          multiple={true}
          onChange={handleChange}
          accept={`${SUPPORTED_FILE_TYPES.join(',')}`}
        />
        <Circle>
          <Icon name={iconName} size={2.6} color="yellow600" />
        </Circle>
        <InstructionsContainer>
          <Caption emphasized>Drop images here or select files.</Caption>
          <DescriptionContainer>
            <Body2>It must be a {fileTypesListString},</Body2>
            <Body2>no larger than {bytesToMegabytes(MAX_FILE_SIZE)} MB</Body2>
          </DescriptionContainer>
        </InstructionsContainer>
        {isDragging && (
          <DropElement
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          />
        )}
      </FileUploadDropzoneContainer>
    </StyledContentCard>
  )
}

const StyledContentCard = styled(ContentCard)`
  --border-color: ${({ theme }) => theme.colors.green900}26;
`

const FileUploadDropzoneContainer = styled.form`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 2.8rem;
  gap: 1.6rem;
  text-align: center;
`

const UploadInput = styled.input`
  display: none;
`

const DropElement = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`

const Circle = styled.div`
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.yellow300};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.8rem;
`

const InstructionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`
