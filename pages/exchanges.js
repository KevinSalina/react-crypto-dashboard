import React from 'react'
import Exchanges from '../components/Exchanges'
import { Heading } from '@chakra-ui/react'

const exchanges = () => {
  return (
    <>
      <Heading as="h1" textAlign={{ base: 'center', md: 'left' }} mb={10}>Exchanges</Heading>
      <Exchanges />
    </>
  )
}

export default exchanges
