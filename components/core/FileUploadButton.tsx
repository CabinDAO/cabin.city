import { FileNameIpfsHashMap } from '@/lib/file-storage/types'
import { Button } from './Button'
import { FileUpload } from './FileUpload'

interface FileUploadButtonProps {
  onFilesUploaded: (fileNameIpfsHashMap: FileNameIpfsHashMap) => Promise<void>
  preprocessFiles?: (files: FileList | File[]) => FileList | File[]
  removeEnabled?: boolean
  multiple?: boolean
  onStartUploading?: VoidFunction
}

export const FileUploadButton = (props: FileUploadButtonProps) => {
  return (
    <FileUpload {...props}>
      <Button variant="tertiary">
        {props.removeEnabled
          ? 'Remove image'
          : props.multiple
          ? 'Upload images'
          : 'Upload image'}
      </Button>
    </FileUpload>
  )
}
