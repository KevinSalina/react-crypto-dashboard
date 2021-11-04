import { Heading, SimpleGrid, GridItem, Stack, Text, Button, VStack, Divider } from "@chakra-ui/react"
import NextLink from 'next/link'
import Statistics from "../components/Statistics"
import numeral from "numeral"
import Cryptocurrencies from "../components/Cryptocurrencies"
import News from "../components/News"

import { useGetCryptosQuery } from "../services/cryptoApi"

export default function Home() {

  const { data, isFetching } = useGetCryptosQuery(10)
  const globalStats = data?.data?.stats

  if (isFetching) return 'Loading...'

  return (
    <>
      <Heading as="h1" textAlign={{ base: 'center', md: 'left' }} mb={10}> Global Crypto Stats</Heading>
      <SimpleGrid columns={24} spacing={2} mb={10} maxW="900px">
        <GridItem colSpan={{ base: 24, md: 12 }}>
          <Statistics title="Total Cryptocurrencies" value={globalStats.total} />
        </GridItem>
        <GridItem colSpan={{ base: 24, md: 12 }}>
          <Statistics title="Total Exchanges" value={globalStats.totalExchanges} />
        </GridItem>
        <GridItem colSpan={{ base: 24, md: 12 }}>
          <Statistics title="Total Market Cap" value={numeral(globalStats.totalMarketCap).format('0.0a')} />
        </GridItem>
        <GridItem colSpan={{ base: 24, md: 12 }}>
          <Statistics title="Total 24h Volume" value={numeral(globalStats.total24hVolume).format('0.0a')} />
        </GridItem>
        <GridItem colSpan={{ base: 24, md: 12 }}>
          <Statistics title="Total Markets" value={numeral(globalStats.totalMarkets).format('0.0a')} />
        </GridItem>
      </SimpleGrid>
      <Divider />
      <VStack alignItems={{ base: 'center', md: 'start' }} my={10} >
        <Stack direction={{ base: 'column', md: 'row' }} align="center" textAlign="center" spacing={5} mb={10}>
          <Heading as="h2" >Top 10 Global Cryptocurrencies</Heading>
          <NextLink href="/cryptocurrencies" passHref>
            <Button size="sm">Show More</Button>
          </NextLink>
        </Stack>
        <Cryptocurrencies simplified />
      </VStack>
      <VStack alignItems={{ base: 'center', md: 'start' }} my={10} >
        <Stack direction={{ base: 'column', md: 'row' }} alignItems="center" textAlign="center" spacing={5} mb={10}>
          <Heading as="h2" >Latest Crypto News</Heading>
          <NextLink href="/news" passHref>
            <Button size="sm">Show More</Button>
          </NextLink>
        </Stack>
        <News simplified />
      </VStack>
    </>
  )
}
