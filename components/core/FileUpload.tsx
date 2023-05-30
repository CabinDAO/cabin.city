import styled from 'styled-components'
import { useFilesUpload } from '../neighborhoods/useFilesUpload'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'
import { useRef } from 'react'
import { SUPPORTED_FILE_TYPES } from '@/lib/file-storage/configuration'
import { emptyFunction } from '@/utils/general'

interface FileUploadProps {
  onFilesUploaded: (fileNameIpfsHashMap: FileNameIpfsHashMap) => Promise<void>
  preprocessFiles?: (files: FileList | File[]) => FileList | File[]
  removeEnabled?: boolean
  multiple?: boolean
  onStartUploading?: () => void
  children: React.ReactNode
  className?: string
}

export const FileUpload = ({
  onFilesUploaded,
  preprocessFiles,
  onStartUploading = emptyFunction,
  children,
  multiple = false,
  removeEnabled = false,
  className,
}: FileUploadProps) => {
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
    <>
      <UploadInput
        type="file"
        multiple={multiple}
        ref={inputRef}
        onChange={handleChange}
        accept={`${SUPPORTED_FILE_TYPES.join(',')}`}
      />
      <Wrapper className={className} onClick={handleButtonClick}>
        {children}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const UploadInput = styled.input`
  display: none;
`
