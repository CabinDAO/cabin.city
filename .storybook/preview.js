import * as NextImage from "next/image";
import { addDecorator } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import { RouterContext } from "next/dist/shared/lib/router-context";
import { ModalProvider } from '@/components/contexts/ModalContext'

import theme from '../styles/theme'
import GlobalStyles from '../styles/global'

addDecorator(storyFn => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <ModalProvider>
      {storyFn()}
    </ModalProvider>
  </ThemeProvider>
))

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
