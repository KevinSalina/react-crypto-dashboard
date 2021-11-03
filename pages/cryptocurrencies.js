import React, { useState, useEffect } from 'react'
import Cryptocurrencies from '../components/Cryptocurrencies'
import { Heading } from '@chakra-ui/react'

const CryptocurrenciesPage = () => {

  return (
    <>
      <Heading as="h1" mb={10}>Top 100 Global Cryptocurrencies</Heading>
      <Cryptocurrencies />
    </>
  )
}

export default CryptocurrenciesPage