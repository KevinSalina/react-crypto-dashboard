import React from 'react'
import Head from 'next/head'
import { Box, Container } from "@chakra-ui/react"
import NavBar from './NavBar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <Box as='main' pb={8} overflow="hidden">
      <Head>
        <title>Cyrpto App</title>
      </Head>

      <Box display="flex" height="100vh" overflow="hidden">
        <NavBar />
        <Box flex=".8">
          <Box p={3}>
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  )
}

export default Layout
