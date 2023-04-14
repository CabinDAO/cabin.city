import { useRef, useState } from 'react'
import styled from 'styled-components'
import { ContentCard } from './ContentCard'
import Icon, { IconName } from './Icon'
import { Body2, Caption } from './Typography'
import { useFilesUpload } from './listings/useFilesUpload'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'
import {
  MAX_FILE_SIZE,
  SUPPORTED_FILE_TYPES,
  fileTypesListString,
} from '@/lib/file-storage/configuration'
import { bytesToMegabytes } from '@/lib/file'

interface FileUploadProps {
  iconName: IconName
  onFilesUploaded: (fileNameIpfsHashMap: FileNameIpfsHashMap) => Promise<void>
}

export const FileUpload = ({ iconName, onFilesUploaded }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { uploadFiles } = useFilesUpload()

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      const result = (await uploadFiles(e.target.files)) as FileNameIpfsHashMap
      onFilesUploaded(result)
    }
  }

  const onButtonClick = () => {
    inputRef?.current?.click()
  }

  const handleDrag = (e: React.DragEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true)
    } else if (e.type === 'dragleave') {
      setIsDragging(false)
    }
  }

  const handleDrop = async (
    e: React.DragEvent<HTMLFormElement | HTMLDivElement>
  ) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const result = (await uploadFiles(
        e.dataTransfer.files
      )) as FileNameIpfsHashMap
      onFilesUploaded(result)
    }
  }

  return (
    <StyledContentCard shape="notch-all">
      <FileUploadContainer
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
      </FileUploadContainer>
    </StyledContentCard>
  )
}

const StyledContentCard = styled(ContentCard)`
  --border-color: ${({ theme }) => theme.colors.green900}26;
`

const FileUploadContainer = styled.form`
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
