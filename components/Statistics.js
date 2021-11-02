import React from 'react'
import { VStack, Text } from '@chakra-ui/react'

const Statistics = ({ title, value }) => {
  return (
    <VStack alignItems='flex-start'>
      <Text fontSize="md" color="gray.400">{title}</Text>
      <Text fontSize="3xl">{value}</Text>
    </VStack>
  )
}

export default Statistics

