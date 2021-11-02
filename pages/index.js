import { Heading, SimpleGrid, GridItem, Box, HStack, VStack, Text } from "@chakra-ui/react"
import Statistics from "../components/Statistics"

export default function Home() {
  return (
    <>
      <Heading as="h1" mb={10}> Global Crypto Stats</Heading>
      <SimpleGrid columns={24} spacing={2}>
        <GridItem colSpan={12}>
          <Statistics title="Total Cryptocurrencies" value='5' />
        </GridItem>
        <GridItem colSpan={12}>
          <Statistics title="Total Exchanges" value='5' />
        </GridItem>
        <GridItem colSpan={12}>
          <Statistics title="Total Market Cap" value='5' />
        </GridItem>
        <GridItem colSpan={12}>
          <Statistics title="Total 24h Volume" value='5' />
        </GridItem>
        <GridItem colSpan={12}>
          <Statistics title="Total Markets" value='5' />
        </GridItem>
      </SimpleGrid>

    </>
  )
}
