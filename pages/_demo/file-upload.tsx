import { FileUploadDropzone } from '@/components/core/FileUploadDropzone'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'
import { getImageUrlByIpfsHash } from '@/lib/image'
import Image from 'next/image'
import { useState } from 'react'

const FileUploadDropzonePage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileNameIpfsHashMap>({})

  const handleUploadedFiles = async (
    fileNameIpfsHashMap: FileNameIpfsHashMap
  ) => {
    // TODO: store the uploaded files in the database
    setUploadedFiles(fileNameIpfsHashMap)
  }

  return (
    <SingleColumnLayout>
      <FileUploadDropzone
        onFilesUploaded={handleUploadedFiles}
        iconName="close"
      />
      {Object.keys(uploadedFiles).map((fileName) => (
        <Image
          key={fileName}
          alt={fileName}
          src={getImageUrlByIpfsHash(uploadedFiles[fileName])}
          width={200}
          height={200}
        />
      ))}
    </SingleColumnLayout>
  )
}

export default FileUploadDropzonePage
