import { createGlobalStyle } from 'styled-components'
import { Inter } from '@next/font/google'

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
})

export default createGlobalStyle`
  html,
  body {
    font-family: ${inter.style.fontFamily}, sans-serif;
    font-weight: 400;
    font-size: 62.5%; /* base 10px */
    overscroll-behavior: none;
    -webkit-font-smoothing: antialiased;
  }

  body {
    --background-grid-color: #e8d6bb;
    --background-fill-color: #fce9cb;
    /* Vertical lines */
    background-color: var(--background-fill-color);
    background-image:
      linear-gradient(
        to right,
        var(--background-grid-color) 0,
        var(--background-grid-color) 1px,
        transparent 1px,
        transparent 100%
      ),
      linear-gradient(
        to bottom,
        var(--background-grid-color) 0,
        var(--background-grid-color) 1px,
        transparent 1px,
        transparent 100%
      )
    ;
    background-position: 100px 0, 0 0;
    background-size: 2.886rem 2.886rem, 2.886rem 2.886rem;
  }

  body {
    position: relative;
    min-height: 100vh;

    @supports (height: 100dvh) {
      min-height: 100dvh;
    }
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`
