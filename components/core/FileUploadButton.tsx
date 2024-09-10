import { UploadedFilesMap } from '@/utils/types/image'
import { Button } from './Button'
import { FileUpload } from './FileUpload'

export const FileUploadButton = (props: {
  onFilesUploaded: (files: UploadedFilesMap) => Promise<void>
  preprocessFiles?: (files: FileList | File[]) => FileList | File[]
  removeEnabled?: boolean
  multiple?: boolean
  onStartUploading?: VoidFunction
}) => {
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
