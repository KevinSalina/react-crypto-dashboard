import React from 'react'
import { VStack, Text } from '@chakra-ui/react'
import commaNumber from 'comma-number'

const Statistics = ({ title, value }) => {

  return (
    <VStack alignItems='flex-start' >
      <Text textAlign={{ base: 'center', md: 'left' }} w={{ base: '100%' }} fontSize="md" color="gray.400">{title}</Text>
      <Text textAlign={{ base: 'center', md: 'left' }} w={{ base: '100%' }} fontSize="3xl">{commaNumber(value)}</Text>
    </VStack>
  )
}

export default Statistics

