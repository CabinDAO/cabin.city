import React, { useRef } from 'react'
import { useFilesUpload } from '../neighborhoods/useFilesUpload'
import { SUPPORTED_FILE_TYPES, UploadedFilesMap } from '@/utils/types/image'
import styled from 'styled-components'

const doNothing = () => {
  return
}

export const FileUpload = ({
  onFilesUploaded,
  preprocessFiles,
  onStartUploading = doNothing,
  children,
  multiple = false,
  removeEnabled = false,
  className,
  isFullWidth,
  disabled = false,
}: {
  onFilesUploaded: (files: UploadedFilesMap) => Promise<void>
  preprocessFiles?: (files: FileList | File[]) => FileList | File[]
  removeEnabled?: boolean
  multiple?: boolean
  onStartUploading?: VoidFunction
  children: React.ReactNode
  className?: string
  isFullWidth?: boolean
  disabled?: boolean
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { handleChange } = useFilesUpload({
    onFilesUploaded,
    preprocessFiles,
    onStartUploading,
  })

  const handleButtonClick = () => {
    if (disabled) return
    if (removeEnabled) {
      onFilesUploaded({}).then()
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
      <Wrapper
        className={className}
        onClick={handleButtonClick}
        style={{ width: isFullWidth ? '100%' : 'min-content' }}
      >
        {children}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
`

const UploadInput = styled.input`
  display: none;
`
