import React from 'react'
import { Box, Text } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box
      d='flex'
      w="full"
      h='100px'
      bg='blue.800'
      color="white"
      alignItems='center'
      justifyContent='center'
    >
      <Text fontSize="smaller" align="center">Made by Kevin Salina <br /> 2021</Text>
    </Box>
  )
}

export default Footer
