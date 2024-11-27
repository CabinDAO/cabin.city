import styled from 'styled-components'

// more ideas: https://jxnblk.io/loading/

const LoadingSpinner = styled.div`
  position: relative;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4rem;
    height: 4rem;
    margin-top: -2rem;
    margin-left: -2rem;
    border-radius: 50%;
    border: 0.4rem solid transparent;
    border-top-color: ${(props) => props.theme.colors.green900};
    animation: spinner 0.6s linear infinite;
  }
`

export default LoadingSpinner
