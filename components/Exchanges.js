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
  Collapse
} from '@chakra-ui/react'

import HTMLReactParser, { domToReact } from 'html-react-parser'

import { useGetExchangesQuery } from '../services/cryptoApi'
import Loader from './Loader'


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
        <Table variant="simple">
          <TableCaption>Exchanges</TableCaption>
          <Thead>
            <Tr border='1px' borderColor="gray.200">
              <Th>Exchange</Th>
              <Th>24h Trade Volume</Th>
              <Th>Markets</Th>
              <Th>Market Share</Th>
            </Tr>
          </Thead>
          <Tbody>
            {exchangeData.exchanges.map(exchange => (
              <>
                <Tr key={exchange.rank} bgColor="gray.100" border='1px' borderColor="gray.200" onClick={() => handleOpenExchange(exchange.id)} _hover={{ cursor: 'pointer' }}>
                  <Td>
                    <HStack>
                      <Text>{exchange.rank}.</Text>
                      <Image alt='Exchange Icon' src={exchange.iconUrl} boxSize={5} />
                      <Text fontWeight='semibold'>{exchange.name}</Text>
                    </HStack>
                  </Td>
                  <Td>
                    {`$${numeral(exchange.volume).format('0.0a')}`}
                  </Td>
                  <Td>
                    {`${numeral(exchange.numberOfMarkets).format('0.0a')}`}
                  </Td>
                  <Td>
                    {numeral(exchange.marketShare / 100).format('0.0%')}
                  </Td>
                </Tr>
                <Tr key={exchange.id} visibility={exchangeOpen === exchange.id ? 'visible' : 'collapse'} transition='all .125s'>
                  <Td colSpan={4}>
                    <Collapse in={exchangeOpen === exchange.id}>
                      {HTMLReactParser(`${exchange.description}`, htmlParserOptions)}
                    </Collapse>
                  </Td>
                </Tr>
              </>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  )
}

export default Exchanges
