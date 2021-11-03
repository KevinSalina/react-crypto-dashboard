import React from 'react'
import Head from 'next/head'
import { Box, Container } from "@chakra-ui/react"
import NavBar from './NavBar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <Box as='main' height='100vh'>
      <Head>
        <title>Cyrpto App</title>
      </Head>

      <Box display="flex" height="100vh" bgColor="gray.50">
        <NavBar />
        <Box ml='225px' w="full">
          <Box p={{ base: '5%', md: 10 }}>
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  )
}

export default Layout
