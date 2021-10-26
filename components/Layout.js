import React from 'react'
import Head from 'next/head'
import { Box, Container } from "@chakra-ui/react"
import NavBar from './NavBar'

const Layout = ({ children }) => {
  return (
    <Box as='main' pb={8}>
      <Head>
        <title>Cyrpto App</title>
      </Head>

      <Box display="flex" height="100vh" overflow="hidden">
        <NavBar />
        <Box flex=".8" p={5}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default Layout
