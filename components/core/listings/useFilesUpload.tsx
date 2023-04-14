import { ErrorModal } from '@/components/ErrorModal'
import { useModal } from '@/components/hooks/useModal'
import {
  MAX_FILE_SIZE,
  SUPPORTED_FILE_TYPES,
} from '@/lib/file-storage/configuration'

export const useFilesUpload = () => {
  const { showModal } = useModal()

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

    return filtered
  }

  const uploadFiles = async (files: FileList | File[]) => {
    const filteredFiles = validateFiles(files)

    if (filteredFiles.length === 0) {
      return {}
    }

    const formData = new FormData()
    for (let i = 0; i < filteredFiles.length; i++) {
      formData.append('files', files[i])
    }
    const response = await fetch('/api/upload-files', {
      method: 'POST',
      body: formData,
    })
    return response.json()
  }

  return { uploadFiles }
}
