import styled from 'styled-components'
import { useFilesUpload } from '../neighborhoods/useFilesUpload'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'
import { Button } from './Button'
import { useRef } from 'react'
import { SUPPORTED_FILE_TYPES } from '@/lib/file-storage/configuration'

interface FileUploadButtonProps {
  onFilesUploaded: (fileNameIpfsHashMap: FileNameIpfsHashMap) => Promise<void>
  preprocessFiles?: (files: FileList | File[]) => FileList | File[]
}

export const FileUploadButton = ({
  onFilesUploaded,
  preprocessFiles,
}: FileUploadButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { handleChange } = useFilesUpload({ onFilesUploaded, preprocessFiles })

  const handleButtonClick = () => {
    inputRef?.current?.click()
  }

  return (
    <FileUploadContainer>
      <UploadInput
        type="file"
        ref={inputRef}
        onChange={handleChange}
        accept={`${SUPPORTED_FILE_TYPES.join(',')}`}
      />
      <Button variant="tertiary" onClick={handleButtonClick}>
        Upload image
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
