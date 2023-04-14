import styled from 'styled-components'

interface ImageProps {
  src: string
  alt: string
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  text-align: center;
`

export const AutofitImage = ({ src, alt }: ImageProps) => (
  <Container>
    <StyledImg src={src} alt={alt} />
  </Container>
)
