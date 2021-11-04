import React, { useState, useEffect } from 'react'
import numeral from 'numeral'
import NextLink from 'next/link'
import { Box, SimpleGrid, GridItem, VStack, HStack, Heading, Image, Divider, Text, Input } from '@chakra-ui/react'

import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;

  const { data: cryptoList, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins)
  const [searchTerm, setsearchTerm] = useState('')

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter(coin => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))

    setCryptos(filteredData)

  }, [searchTerm, cryptoList])

  if (isFetching) return 'Loading...'

  return (
    <>
      {!simplified ?
        <Box mb={10} maxW='500px'>
          <Input placeholder="Search Coins" value={searchTerm} onChange={(e) => setsearchTerm(e.target.value)} />
        </Box>
        : null}
      <SimpleGrid columns={24} spacingY={5} spacingX={{ base: 0, md: 5 }} w='full' >
        {cryptos?.map(currency => (
          <GridItem key={currency.id} p={4} bgColor="white" transition="all .1s ease-in" colSpan={{ base: 24, md: 12, xl: 8 }} boxShadow='lg' rounded="md" _hover={{ cursor: 'pointer', boxShadow: 'xl' }}>
            <NextLink href={`/cryptocurrencies/${currency.id}`} passHref>
              <VStack>
                <HStack justify="space-between" w="full">
                  <Heading as='h3' size="sm">{`${currency.rank}. ${currency.name}`}</Heading>
                  <Image src={currency.iconUrl} alt="Curreny Icon" boxSize="8"></Image>
                </HStack>
                <Divider />
                <VStack align="start" w='full'>
                  <Text> Price: {numeral(currency.price).format('$0.00a')}</Text>
                  <Text> Market Cap: {numeral(currency.marketCap).format('0.0a')}</Text>
                  <Text> Daily Change: {numeral(currency.change / 100).format('0.00%')}</Text>
                </VStack>
              </VStack>
            </NextLink>
          </GridItem>
        ))}
      </SimpleGrid>

    </>
  )
}

export default Cryptocurrencies
