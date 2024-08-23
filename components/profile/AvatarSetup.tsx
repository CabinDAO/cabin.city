import React, { useState } from 'react'
import { ProfileEditParamsType } from '@/utils/types/profile'
import { FileNameIpfsHashMap } from '@/lib/file-storage/types'
import { getImageUrlByIpfsHash } from '@/lib/image'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { useModal } from '@/components/hooks/useModal'
import styled from 'styled-components'
import { Avatar } from '@/components/core/Avatar'
import { Button } from '@/components/core/Button'
import { Caption } from '@/components/core/Typography'
import { FileUpload } from '@/components/core/FileUpload'

export const AvatarSetup = ({
  avatarUrl,
  onSelected,
  error = false,
  required = false,
}: {
  avatarUrl: ProfileEditParamsType['data']['avatarUrl']
  onSelected: (
    avatarUrl: NonNullable<ProfileEditParamsType['data']['avatarUrl']>
  ) => void
  error?: boolean
  required?: boolean
}) => {
  const { deviceSize } = useDeviceSize()
  const [uploading, setUploading] = useState(false)
  const { hideModal } = useModal()

  const handleStartUpload = () => {
    setUploading(true)
    hideModal()
  }

  const handlePhotoUploaded = async (
    fileNameIpfsHashMap: FileNameIpfsHashMap
  ) => {
    const ipfsHash = Object.values(fileNameIpfsHashMap)[0]

    if (ipfsHash) {
      setUploading(false)

      onSelected(getImageUrlByIpfsHash(ipfsHash, true) as string)

      hideModal()
    }
  }

  return (
    <Container>
      <Avatar
        isLoading={uploading}
        size={deviceSize === 'mobile' ? 9.6 : 8.8}
        src={avatarUrl}
      />
      {avatarUrl ? (
        <AvatarButton
          variant={deviceSize === 'mobile' ? 'secondary' : 'tertiary'}
          onClick={() => onSelected('')}
        >
          Remove photo
        </AvatarButton>
      ) : (
        <FileUpload
          multiple={false}
          onStartUploading={handleStartUpload}
          onFilesUploaded={handlePhotoUploaded}
          isFullWidth={deviceSize === 'mobile'}
        >
          <AvatarButton
            variant={deviceSize === 'mobile' ? 'secondary' : 'tertiary'}
            isFullWidth
          >
            Upload profile photo {required ? '*' : ''}
          </AvatarButton>
        </FileUpload>
      )}
      {error && (
        <Caption $color="red600" emphasized>
          Profile photo required
        </Caption>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1.6rem;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;
    gap: 2.4rem;
  }
`

const AvatarButton = styled(Button)`
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: auto;
  }
`
