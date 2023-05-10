import Icon from '@/components/core/Icon'
import { InputMaybe } from '@/generated/graphql'
import { getImageUrlByIpfsHash } from '@/lib/image'
import Image from 'next/image'
import styled from 'styled-components'

interface ImagesPreviewProps {
  ipfsHashList: (InputMaybe<string> | undefined)[]
  onDelete?: (ipfsHash: InputMaybe<string> | undefined) => void
}

export const ImagesPreview = ({
  ipfsHashList,
  onDelete,
}: ImagesPreviewProps) => {
  return (
    <Container>
      {ipfsHashList.map((ipfsHash) => (
        <ImageContainer key={ipfsHash}>
          <Image
            src={getImageUrlByIpfsHash(ipfsHash, true) ?? ''}
            width={152}
            height={152}
            alt="Media Item Preview"
          />
          <DeleteContainer
            onClick={() => (onDelete ? onDelete(ipfsHash) : null)}
          >
            <Icon name="trash" size={1.8} color="green900" />
          </DeleteContainer>
        </ImageContainer>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  grid-gap: 0.79rem;
`

const DeleteContainer = styled.div`
  display: none;
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  background: ${({ theme }) => theme.colors.yellow100};
  border: 0.1rem solid ${({ theme }) => theme.colors.green900};
  cursor: pointer;
`

const ImageContainer = styled.div`
  position: relative;

  &:hover {
    ${DeleteContainer} {
      display: flex;
    }
  }
`
