import React from 'react'
import News from '../components/News'
import { Heading } from '@chakra-ui/react'

const news = () => {
  return (
    <div>
      <Heading as="h1" mb={10}>Crypto News</Heading>
      <News />
    </div>
  )
}

export default news