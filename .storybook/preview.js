import * as NextImage from "next/image";
import { addDecorator } from '@storybook/react'
import { ThemeProvider } from 'styled-components'

import theme from '../styles/theme'
import GlobalStyles from '../styles/global'

addDecorator(storyFn => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    {storyFn()}
  </ThemeProvider>
))

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
