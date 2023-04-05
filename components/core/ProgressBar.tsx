import styled from 'styled-components'

const Container = styled.div<{ vertical?: boolean }>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.green900};
  height: 1.6rem;
  border-radius: 10rem;

  ${({ vertical }) =>
    !!vertical &&
    `
      width: 1.6rem;
      height: 100%;
    `}
`

interface ProgressContainerProps {
  progress: number
  vertical?: boolean
}

const ProgressContainer = styled.div<ProgressContainerProps>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.green400};
  border-radius: 10rem;

  ${({ vertical, progress }) =>
    !!vertical &&
    `
      width: 100%;
      height: ${progress}%;
    `}
`

interface ProgressBarProps {
  progress: number
  vertical?: boolean
  className?: string
}

export const ProgressBar = ({
  progress,
  className,
  vertical = false,
}: ProgressBarProps) => {
  return (
    <Container className={className} vertical={vertical}>
      <ProgressContainer progress={progress} vertical={vertical} />
    </Container>
  )
}
