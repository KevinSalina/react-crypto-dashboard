import React, { useState, useEffect } from 'react'
import {
  AiOutlineMoneyCollect,
  AiOutlineDollarCircle,
  AiOutlineFund,
  AiOutlineExclamationCircle,
  AiOutlineStop,
  AiOutlineTrophy,
  AiOutlineCheck,
  AiOutlineNumber,
  AiOutlineThunderbolt
} from 'react-icons/ai'
import {
  Box,
  Icon,
  Heading,
  Text,
  HStack,
  VStack,
  Divider,
  Select,
  Flex,
  Spacer,
  Link
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import HTMLReactParser, { domToReact } from 'html-react-parser'
import numeral, { options } from 'numeral'

import { useGetSingleCryptoQuery } from '../services/cryptoApi'

const CryptoDetails = ({ coinId }) => {
  const [timePeriod, setTimePeriod] = useState('7d')
  const [cryptoCoin, setcryptoCoin] = useState(null)

  const { data, isFetching } = useGetSingleCryptoQuery(coinId)

  useEffect(() => {
    setcryptoCoin(data?.data?.coin)
  }, [data])


  const millify = (num, type) => {
    return numeral(num).format(type || '0.0a')
  }

  if (isFetching || !cryptoCoin) return 'Loading...'

  const times = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y']

  const stats = [
    {
      title: 'Price', value: `${cryptoCoin.price && millify(cryptoCoin.price, '$0, 0.00')}`, icon: AiOutlineDollarCircle
    },
    { title: 'Rank', value: cryptoCoin.rank, icon: AiOutlineNumber },
    { title: '24h Volume', value: `$${cryptoCoin.volume && millify(cryptoCoin.volume)}`, icon: AiOutlineThunderbolt },
    { title: 'Market Cap', value: `$${cryptoCoin.marketCap && millify(cryptoCoin.marketCap)}`, icon: AiOutlineDollarCircle },
    { title: 'All-time-high(daily avg.)', value: `$${millify(cryptoCoin.allTimeHigh.price)}`, icon: AiOutlineTrophy },
  ]

  const genericStats = [
    { title: 'Number Of Markets', value: millify(cryptoCoin.numberOfMarkets, '0,0'), icon: AiOutlineFund },
    { title: 'Number Of Exchanges', value: millify(cryptoCoin.numberOfExchanges, '0,0'), icon: AiOutlineMoneyCollect },
    { title: 'Aprroved Supply', value: cryptoCoin.approvedSupply ? <AiOutlineCheck /> : <AiOutlineStop />, icon: AiOutlineExclamationCircle },
    { title: 'Total Supply', value: `$${millify(cryptoCoin.totalSupply)}`, icon: AiOutlineExclamationCircle },
    { title: 'Circulating Supply', value: `$${millify(cryptoCoin.circulatingSupply)}`, icon: AiOutlineExclamationCircle },
  ];

  const htmlParserOptions = {
    replace: domNode => {
      if (domNode.name === 'p') {
        return <Text mb={3} color="blue.500" fontWeight='medium'>{domToReact(domNode.children, htmlParserOptions)}</Text>
      } else if (domNode.name === 'h3') {
        return <Heading as='h4' size='lg' mb={3}>{domToReact(domNode.children)}</Heading>
      } else if (domNode.name === 'a') {
        return <Link isExternal color="blue.800" href={domNode.attribs.href}>{domToReact(domNode.children)} <ExternalLinkIcon mx="2px" /></Link>
      }
    }
  }


  return (
    <>
      <VStack mb={5} align="flex-start">
        <Heading as="h1" >{cryptoCoin.name} ({cryptoCoin.slug}) Price </Heading>
        <Text> {cryptoCoin.name} live price is USD. View value statistics, market cap and supply</Text>
      </VStack>
      <Divider />
      <Select placeholder={timePeriod} mt={5} mb={10} maxW='200px'>
        {times.map(time => (
          <option key={time} value={time}>{time}</option>
        ))}
      </Select>
      {/* Line Chart */}
      {/* Stats */}
      <Flex direction={{ base: 'column', lgxl: 'row' }} maxW='1000px' mb={10}>
        <Flex direction='column' w='full' maxW='400px' mx='auto' mb={{ base: 10, lgxl: 0 }}>
          <VStack mb={5}>
            <Heading as="h3" size='lg'>{cryptoCoin.name} Value Stats</Heading>
            <Text fontSize='md'>Stats overview of {cryptoCoin.name} (USD)</Text>
          </VStack>
          {stats.map(({ title, value, icon }, index) => (
            <Flex key={index} direction='column' w='full'>
              <Flex direction='row' alignItems='center' key={index} py={3} px={1} w='full' _hover={{ bg: 'white', boxShadow: 'sm' }} transition="all .1s ease-in" >
                <Icon key={index} as={icon} boxSize='25px' />
                <Text fontSize='sm' ml={2}>{title}</Text>
                <Text ml='auto' fontWeight='bold'>{value}</Text>
              </Flex>
              <Divider />
            </Flex>
          ))}
        </Flex>
        <Spacer />
        {/* General Stats */}
        <Flex direction='column' w='full' maxW='400px' mx='auto'>
          <VStack mb={5}>
            <Heading as="h3" size='lg'>Other Stats</Heading>
            <Text fontSize='md'>Stats overview of all cryptocurrencies (USD)</Text>
          </VStack>
          {genericStats.map(({ title, value, icon }, index) => (
            <Flex key={index} direction='column' w='full'>
              <Flex direction='row' alignItems='center' key={index} py={3} px={1} w='full' _hover={{ bg: 'white', boxShadow: 'sm' }} transition="all .1s ease-in" >
                <Icon key={index} as={icon} boxSize='25px' />
                <Text fontSize='sm' ml={2}>{title}</Text>
                <Text ml='auto' fontWeight='bold'>{value}</Text>
              </Flex>
              <Divider />
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Box w='full' maxW='1000px'>
        <Heading mb={5} as='h3' size='xl'>What is {cryptoCoin.name}?</Heading>
        {HTMLReactParser(cryptoCoin.description, htmlParserOptions)}
      </Box>
    </>
  )
}

export default CryptoDetails
