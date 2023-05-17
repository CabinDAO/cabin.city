import styled from 'styled-components'
import { useFilesUpload } from '../neighborhoods/useFilesUpload'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'
import { Button } from './Button'
import { useRef } from 'react'
import { SUPPORTED_FILE_TYPES } from '@/lib/file-storage/configuration'
import { emptyFunction } from '@/utils/general'

interface FileUploadButtonProps {
  onFilesUploaded: (fileNameIpfsHashMap: FileNameIpfsHashMap) => Promise<void>
  preprocessFiles?: (files: FileList | File[]) => FileList | File[]
  removeEnabled?: boolean
  multiple?: boolean
  onStartUploading?: () => void
}

export const FileUploadButton = ({
  onFilesUploaded,
  preprocessFiles,
  onStartUploading = emptyFunction,
  multiple = false,
  removeEnabled = false,
}: FileUploadButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { handleChange } = useFilesUpload({
    onFilesUploaded,
    preprocessFiles,
    onStartUploading,
  })

  const handleButtonClick = () => {
    if (removeEnabled) {
      onFilesUploaded({})
    } else {
      inputRef?.current?.click()
    }
  }

  return (
    <FileUploadContainer>
      <UploadInput
        type="file"
        multiple={multiple}
        ref={inputRef}
        onChange={handleChange}
        accept={`${SUPPORTED_FILE_TYPES.join(',')}`}
      />
      <Button variant="tertiary" onClick={handleButtonClick}>
        {removeEnabled
          ? 'Remove image'
          : multiple
          ? 'Upload images'
          : 'Upload image'}
      </Button>
    </FileUploadContainer>
  )
}

const FileUploadContainer = styled.div`
  width: auto;
`

const UploadInput = styled.input`
  display: none;
`
