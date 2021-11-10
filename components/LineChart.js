import React from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'
import {
  Box,
  Spacer,
  Heading,
  Text,
  Flex,
  useTheme
} from '@chakra-ui/react'
import { flushSync } from 'react-dom'

const LineChart = ({ coinHistory, currentPrice, coinName }) => {

  const theme = useTheme()

  const coinPrice = []
  const coinTimestamp = []

  for (let ele of coinHistory?.history) {
    coinPrice.push(ele.price)
    coinTimestamp.push(new Date(ele.timestamp * 1000).toLocaleDateString('en-US'))
  }

  const data = {
    labels: coinTimestamp,
    datasets: [{
      label: 'Price USD',
      data: coinPrice,
      fill: false,
      borderColor: coinHistory.change >= 0 ? theme.colors.green[500] : theme.colors.red[500],
      backgroundColor: coinHistory.change >= 0 ? theme.colors.green[500] : theme.colors.red[500],
      tension: 0.5
    }]
  }


  return (
    <>
      <Box w='full' maxW="1200px" mx='auto' mb={10}>
        <Flex direction={{ base: 'column', md: 'row' }} justifyContent='space-between' mb={3}>
          <Heading>{coinName} Price Chart</Heading>
          <Flex direction={{ base: 'column', md: 'row' }} fontWeight="medium" align='center'>
            <Text mr={3} color={coinHistory.change >= 0 ? 'green.500' : 'red.500'} >{numeral(coinHistory.change / 100).format('0.00%')}</Text>
            <Text>{coinName} Current Price: {numeral(currentPrice).format('$0,0.00')}</Text>
          </Flex>
        </Flex>
        <Box w='full'>
          <Line data={data} />
        </Box>
      </Box>
    </>
  )
}

export default LineChart
