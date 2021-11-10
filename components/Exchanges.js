import React, { useState, useEffect } from 'react'
import numeral from 'numeral'
import {
  Box,
  HStack,
  Image,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Link,
  Heading,
  Collapse,
  SimpleGrid,
  GridItem,
  Divider
} from '@chakra-ui/react'

import HTMLReactParser, { domToReact } from 'html-react-parser'

import { useGetExchangesQuery } from '../services/cryptoApi'
import Loader from './Loader'
import ExchangeDesc from './ExchangeDesc'


const Exchanges = () => {
  const [exchangeData, setExchangeData] = useState(null)
  const [exchangeOpen, setExchangeOpen] = useState(null)

  const { data, isFetching } = useGetExchangesQuery(50)

  const handleOpenExchange = (id) => {
    if (exchangeOpen === id) return setExchangeOpen(null)
    return setExchangeOpen(id)
  }

  useEffect(() => {
    setExchangeData(data?.data)
  }, [data])

  const htmlParserOptions = {
    replace: domNode => {
      if (domNode.name === 'p') {
        return <Text mb={3} color="blue.500" fontWeight='light'>{domToReact(domNode.children, htmlParserOptions)}</Text>
      } else if (domNode.name === 'h3') {
        return <Heading as='h4' size='md' mb={3}>{domToReact(domNode.children)}</Heading>
      } else if (domNode.name === 'a') {
        return <Link isExternal color="blue.800" href={domNode.attribs.href}>{domToReact(domNode.children)}</Link>
      }
    }
  }

  if (isFetching || !exchangeData) return <Loader />

  return (
    <>
      <Box>
        <SimpleGrid columns={24} fontSize={{ base: 'xs', sm: 'md' }} border='1px' borderColor='gray.300'>
          <GridItem colSpan={24} p={3} bgColor='gray.200' fontWeight='bold'>
            <SimpleGrid columns={24}>
              <GridItem colSpan={6}>
                EXCHANGE
              </GridItem>
              <GridItem colSpan={6} textAlign="right">
                24H TRADE VOLUME
              </GridItem>
              <GridItem colSpan={6} textAlign="right">
                MARKETS
              </GridItem>
              <GridItem colSpan={6} textAlign="right">
                MARKET SHARE
              </GridItem>
            </SimpleGrid>
          </GridItem>
          {exchangeData.exchanges.map(exchange => (
            <>
              <GridItem p={3} bgColor="gray.100" colSpan={24} key={exchange.uuid} py={3} onClick={() => handleOpenExchange(exchange.uuid)} _hover={{ cursor: 'pointer' }}>
                <SimpleGrid columns={24}>
                  <GridItem colSpan={6}>
                    <HStack>
                      <Text key={`rank-${exchange.rank}`}>{exchange.rank}.</Text>
                      <Image key={exchange.iconUrl} alt='Exchange Icon' src={exchange.iconUrl} boxSize={{ base: 3, sm: 5 }} />
                      <Text fontWeight='semibold' key={exchange.name}>{exchange.name}</Text>
                    </HStack>
                  </GridItem>
                  <GridItem colSpan={6} textAlign="right">
                    {`$${numeral(exchange.volume).format('0.0a')}`}
                  </GridItem>
                  <GridItem colSpan={6} textAlign="right">
                    {`${numeral(exchange.numberOfMarkets).format('0.[0]a')}`}
                  </GridItem>
                  <GridItem colSpan={6} textAlign="right">
                    {numeral(exchange.marketShare).format('0.0%')}
                  </GridItem>
                </SimpleGrid>
              </GridItem>
              <GridItem colSpan={24} p={exchangeOpen === exchange.id ? 3 : 0}>
                <Collapse key={`collapse-${exchange.uuid}`} in={exchangeOpen === exchange.uuid}>
                  {exchangeOpen === exchange.uuid ? <ExchangeDesc id={exchange.uuid} /> : null}
                </Collapse>
              </GridItem>
            </>
          ))}
        </SimpleGrid>
      </Box>
    </>
  )
}

export default Exchanges
