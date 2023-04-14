import styled from 'styled-components'

interface CircleProps {
  source: string
  size: number
  shadowMode: 'always' | 'hover' | 'never'
}

export const Circle = styled.div<CircleProps>`
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('${({ source }) => source}');
  background-size: cover;
  background-position: center;
  border: 0.1rem solid ${({ theme }) => theme.colors.green900};

  // Based on Design, it corresponds to 6% of the size
  --shadow-size: ${({ size }) => size * 0.06}rem;
  transition: box-shadow 0.2s ease-in-out;

  ${({ shadowMode, theme }) => {
    if (shadowMode === 'always') {
      return `
        box-shadow: var(--shadow-size) var(--shadow-size) 0px ${theme.colors.green900};
      `
    } else if (shadowMode === 'hover') {
      return `
        cursor: pointer;

        &:hover {
          box-shadow: var(--shadow-size) var(--shadow-size) 0px ${theme.colors.green900};
        }
      `
    }
  }}
`
