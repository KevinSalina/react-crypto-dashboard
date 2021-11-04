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
        <link rel='icon' href='/bitcoin.png' />
      </Head>

      <Box display="flex" height="auto" bgColor="gray.50" overflowX='hidden'>
        <NavBar />
        <Box ml={{ base: 0, md: '225px' }} mt={{ base: '100px', md: '0px' }} w="full">
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
