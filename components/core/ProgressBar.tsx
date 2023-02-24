import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.green900};
  height: 1.6rem;
  border-radius: 10rem;
`

interface ProgressContainerProps {
  progress: number
}

const ProgressContainer = styled.div<ProgressContainerProps>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.green400};
  border-radius: 10rem;
`

interface ProgressBarProps {
  progress: number
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <Container>
      <ProgressContainer progress={progress} />
    </Container>
  )
}
