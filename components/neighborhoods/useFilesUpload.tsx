import React, { useState } from 'react'
import axios from 'axios'
import {
  MAX_FILE_SIZE,
  SUPPORTED_FILE_TYPES,
  UploadedFilesMap,
} from '@/utils/types/image'
import { ImageNewResponse } from '@/utils/types/image'
import { useModal } from '@/components/hooks/useModal'
import { useBackend } from '@/components/hooks/useBackend'
import { useError } from '@/components/hooks/useError'
import { ErrorModal } from '@/components/ErrorModal'
import { randomUploadName } from '@/utils/random'

type CloudflareUploadResponse = {
  success: boolean
  // errors: []
  // messages: []
  result: {
    id: string
    filename: string
    uploaded: string
    requireSignedURLs: boolean
    variants: string[]
  }
}

export const useFilesUpload = ({
  onFilesUploaded,
  preprocessFiles,
  onStartUploading,
}: {
  onFilesUploaded: (files: UploadedFilesMap) => Promise<void>
  preprocessFiles?: (files: FileList | File[]) => FileList | File[]
  onStartUploading?: VoidFunction
}) => {
  const { showModal } = useModal()
  const { showError } = useError()
  const { post } = useBackend()

  const [isDragging, setIsDragging] = useState(false)

  const handleDrag = (e: React.DragEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true)
    } else if (e.type === 'dragleave') {
      setIsDragging(false)
    }
  }

  const validateFiles = (files: FileList | File[]) => {
    const filtered = Array.from(files).filter(
      (file) =>
        file.type &&
        SUPPORTED_FILE_TYPES.includes(file.type) &&
        file.size < MAX_FILE_SIZE
    )

    if (filtered.length !== files.length) {
      showModal(() => (
        <ErrorModal
          title="File Upload Error"
          description="One or more files are invalid"
        />
      ))
      return []
    }

    if (filtered.length > 10) {
      showModal(() => (
        <ErrorModal
          title="File Upload Error"
          description="You can upload up to 10 files at a time"
        />
      ))
      return []
    }

    return filtered
  }

  const uploadFiles = async (files: FileList | File[]) => {
    const filteredFiles = validateFiles(files)

    if (filteredFiles.length === 0) {
      return {}
    }

    const processedFiles = preprocessFiles ? preprocessFiles(files) : files

    const mapping: UploadedFilesMap = {}

    for (const file of processedFiles as File[]) {
      const uploadUrl = await post<ImageNewResponse>('IMAGE_NEW', {})
      if (!uploadUrl || 'error' in uploadUrl) {
        showError(`Failed to upload image: ${uploadUrl?.error}`)
        continue
      }

      const formData = new FormData()
      formData.append('file', file, randomUploadName(file.name))

      const { data } = await axios<CloudflareUploadResponse>({
        method: 'post',
        url: uploadUrl.url,
        data: formData,
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGES_API_TOKEN}`,
          // 'Content-Type': 'multipart/form-data',
        },
      })

      // mapping[file.name] = {
      //   id: data.result.id,
      //   name: data.result.filename,
      // }
      mapping[file.name] = data.result.id
    }

    return mapping
  }

  const handleDrop = async (
    e: React.DragEvent<HTMLFormElement | HTMLDivElement>
  ) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const result = await uploadFiles(e.dataTransfer.files)
      await onFilesUploaded(result)
    }
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      onStartUploading && onStartUploading()
      const result = await uploadFiles(e.target.files)
      await onFilesUploaded(result)
    }
  }

  return { uploadFiles, handleDrag, handleDrop, handleChange, isDragging }
}
