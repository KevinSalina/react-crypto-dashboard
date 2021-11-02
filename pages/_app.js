import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from 'react-redux'
import store from '../app/store'
import theme from '../styles/theme'
import Layout from "../components/Layout"

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
