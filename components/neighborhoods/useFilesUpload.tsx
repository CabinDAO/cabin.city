import { ErrorModal } from '@/components/ErrorModal'
import { useModal } from '@/components/hooks/useModal'
import {
  MAX_FILE_SIZE,
  SUPPORTED_FILE_TYPES,
} from '@/lib/file-storage/configuration'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'
import { useState } from 'react'
import axios from 'axios'

interface UseFilesUploadProps {
  onFilesUploaded: (fileNameIpfsHashMap: FileNameIpfsHashMap) => Promise<void>
  preprocessFiles?: (files: FileList | File[]) => FileList | File[]
  onStartUploading?: VoidFunction
}

export const useFilesUpload = ({
  onFilesUploaded,
  preprocessFiles,
  onStartUploading,
}: UseFilesUploadProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const { showModal } = useModal()

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

    const processedFiles = preprocessFiles
      ? await preprocessFiles(files)
      : files

    const mapping: FileNameIpfsHashMap = {}

    for (const file of processedFiles as File[]) {
      const formData = new FormData()
      formData.append('file', file)

      mapping[file.name] = ''

      const { data } = await axios<{ IpfsHash: string }>({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        data: formData,
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY as string,
          pinata_secret_api_key: process.env
            .NEXT_PUBLIC_PINATA_API_SECRET as string,
          'Content-Type': 'multipart/form-data',
        },
      })

      mapping[file.name] = data.IpfsHash
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
      const result = (await uploadFiles(
        e.dataTransfer.files
      )) as FileNameIpfsHashMap
      onFilesUploaded(result)
    }
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      onStartUploading && onStartUploading()
      const result = (await uploadFiles(e.target.files)) as FileNameIpfsHashMap
      onFilesUploaded(result)
    }
  }

  return { uploadFiles, handleDrag, handleDrop, handleChange, isDragging }
}
