import { ChakraProvider as CProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource/dancing-script/700.css'
import '@fontsource/nunito'
import { ReactNode } from 'react'

const theme = extendTheme({
  fonts: {
    heading: 'Dancing Script',
    body: 'Nunito',
  },
  colors: {
    brand: {
      50: '#FFFAF0',
      100: '#FEEBC8',
      200: '#FBD38D',
      300: '#F6AD55',
      400: '#ED8936',
      500: '#DD6B20',
      600: '#C05621',
      700: '#9C4221',
      800: '#7B341E',
      900: '#652B19',
    },
  },
})

export const ChakraProvider = ({ children }: { children: ReactNode }) => (
  <CProvider theme={theme}>{children}</CProvider>
)
