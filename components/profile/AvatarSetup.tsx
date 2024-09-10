import React, { useState } from 'react'
import { ProfileEditParamsType } from '@/utils/types/profile'
import { UploadedFilesMap } from '@/utils/types/image'
import { imageUrlForId } from '@/lib/cloudflareImages'
import { useDeviceSize } from '@/components/hooks/useDeviceSize'
import { useModal } from '@/components/hooks/useModal'
import styled from 'styled-components'
import { Avatar } from '@/components/profile/Avatar'
import { Button } from '@/components/core/Button'
import { Caption } from '@/components/core/Typography'
import { FileUpload } from '@/components/core/FileUpload'

export const AvatarSetup = ({
  avatarUrl,
  onSelected,
  error = false,
  required = false,
  disabled = false,
}: {
  avatarUrl: ProfileEditParamsType['data']['avatarUrl']
  onSelected: (
    avatarUrl: NonNullable<ProfileEditParamsType['data']['avatarUrl']>
  ) => void
  error?: boolean
  required?: boolean
  disabled?: boolean
}) => {
  const { deviceSize } = useDeviceSize()
  const [uploading, setUploading] = useState(false)
  const { hideModal } = useModal()

  const handleStartUpload = () => {
    if (disabled) return

    setUploading(true)
    hideModal()
  }

  const handlePhotoUploaded = async (files: UploadedFilesMap) => {
    if (disabled) return

    const imageId = Object.values(files)[0]

    if (imageId) {
      setUploading(false)

      onSelected(imageUrlForId(imageId))

      hideModal()
    }
  }

  const clearSelection = () => {
    if (disabled) return
    onSelected('')
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
          onClick={() => clearSelection()}
        >
          Remove photo
        </AvatarButton>
      ) : (
        <FileUpload
          multiple={false}
          onStartUploading={handleStartUpload}
          onFilesUploaded={handlePhotoUploaded}
          isFullWidth={deviceSize === 'mobile'}
          disabled={disabled}
        >
          <AvatarButton
            variant={deviceSize === 'mobile' ? 'secondary' : 'tertiary'}
            isFullWidth
            disabled={disabled}
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
