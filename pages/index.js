import { Heading, SimpleGrid, GridItem, Box, HStack, VStack, Text } from "@chakra-ui/react"
import Statistics from "../components/Statistics"
import numeral from "numeral"

import { useGetCryptosQuery } from "../services/cryptoApi"

export default function Home() {

  const { data, isFetching } = useGetCryptosQuery()
  const globalStats = data?.data?.stats

  console.log(data)

  if (isFetching) return 'Loading...'

  return (
    <>
      <Heading as="h1" mb={10}> Global Crypto Stats</Heading>
      <SimpleGrid columns={24} spacing={2}>
        <GridItem colSpan={12}>
          <Statistics title="Total Cryptocurrencies" value={globalStats.total} />
        </GridItem>
        <GridItem colSpan={12}>
          <Statistics title="Total Exchanges" value={globalStats.totalExchanges} />
        </GridItem>
        <GridItem colSpan={12}>
          <Statistics title="Total Market Cap" value={numeral(globalStats.totalMarketCap).format('0.0a')} />
        </GridItem>
        <GridItem colSpan={12}>
          <Statistics title="Total 24h Volume" value={numeral(globalStats.total24hVolume).format('0.0a')} />
        </GridItem>
        <GridItem colSpan={12}>
          <Statistics title="Total Markets" value={numeral(globalStats.totalMarkets).format('0.0a')} />
        </GridItem>
      </SimpleGrid>
    </>
  )
}
