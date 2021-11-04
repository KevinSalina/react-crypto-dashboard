import React from 'react'
import { Spinner, Center } from '@chakra-ui/react'

const Loader = () => {
  return (
    <Center height='85vh' w='full'>
      <Spinner color="blue.800" size="lg" />
    </Center>
  )
}

export default Loader
