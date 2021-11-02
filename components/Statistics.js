import React from 'react'
import { VStack, Text } from '@chakra-ui/react'
import commaNumber from 'comma-number'

const Statistics = ({ title, value }) => {

  return (
    <VStack alignItems='flex-start'>
      <Text fontSize="md" color="gray.400">{title}</Text>
      <Text fontSize="3xl">{commaNumber(value)}</Text>
    </VStack>
  )
}

export default Statistics

