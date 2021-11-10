import React from 'react'
import { Spinner, Center } from '@chakra-ui/react'

const Loader = ({ small }) => {
  return (
    <Center height={small ? '10vh' : '85vh'} w='full'>
      <Spinner color="blue.800" size="lg" />
    </Center>
  )
}

export default Loader
