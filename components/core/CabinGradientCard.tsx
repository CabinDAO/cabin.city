import styled from 'styled-components'

interface CabinGradientCardProps {
  children: React.ReactNode
}

export const CabinGradientCard = ({ children }: CabinGradientCardProps) => {
  return <BaseContainer>{children}</BaseContainer>
}

const BaseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.yellow200};
  min-height: 30rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: radial-gradient(
      circle at 50% 50%,
      ${({ theme }) => theme.colors.yellow200} 30%,
      #deae6a0d 100%
    ),
    url('/images/background.svg'), url('/images/background.svg'),
    url('/images/background.svg');
`
