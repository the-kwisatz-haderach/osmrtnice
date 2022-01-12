import { ChakraProvider as CProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource/dancing-script/700.css'
import '@fontsource/nunito'

const theme = extendTheme({
  fonts: {
    heading: 'Dancing Script',
    body: 'Nunito',
  },
})

export const ChakraProvider: React.FC = ({ children }) => (
  <CProvider theme={theme}>{children}</CProvider>
)
