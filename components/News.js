import React, { useState, useEffect } from 'react'
import { Box, SimpleGrid, GridItem, HStack, Heading, Image, Divider, Text, Flex, Select } from '@chakra-ui/react'
import moment from 'moment'
import NextLink from 'next/link'


import { useGetNewsQuery } from '../services/newsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const [cryptoNews, setCryptoNews] = useState(null)
  const [cryptoCoins, setCryptoCoins] = useState(null)

  const count = simplified ? 6 : 20

  const { data: cryptoNewsData, isFetching } = useGetNewsQuery({ newsCategory, count })
  const { data: cryptoList } = useGetCryptosQuery(100)

  const fallbackNewsImg = 'https://images.pexels.com/photos/4808279/pexels-photo-4808279.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  const fallbackProviderImg = 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'

  useEffect(() => {
    setCryptoNews(cryptoNewsData?.value)
    setCryptoCoins(cryptoList?.data?.coins)
  }, [cryptoNewsData, cryptoList])

  if (isFetching) return (
    <>
      {!simplified ?
        <>
          <Box mb={10} maxW='500px'>
            <Select placeholder={newsCategory}>
            </Select>
          </Box>
          <Text>Loading...</Text>
        </> :
        <Text>Loading...</Text>
      }
    </>
  )

  return (
    <>
      {!simplified ? <Box mb={10} maxW='500px'>
        <Select
          placeholder={newsCategory}
          onChange={(e) => setNewsCategory(e.target.value)}
        >
          <option value='Cryptocurrency'>Cryptocurrency</option>
          {cryptoCoins?.map(coin => (
            <option key={coin.id} value={coin.name}>{coin.name}</option>
          ))}
        </Select>
      </Box> : null}

      <SimpleGrid columns={24} spacing={5} w='full' >
        {cryptoNews?.map((story, index) => (
          <GridItem key={`cryptoNews-${index}`} p={4} bgColor="white" transition="all .1s ease-in" colSpan={{ base: 24, md: 12, xl: 8 }} boxShadow='lg' rounded="md" _hover={{ cursor: 'pointer', boxShadow: 'xl' }}>
            <Box as='a' href={story.url} rel="noopener noreferrer" target="_blank" h="full">
              <Flex direction="column" h='full'>
                <HStack align="flex-start" justifyContent="space-between">
                  <Heading as='h3' size="md">{story.name}</Heading>
                  <Image src={story?.image?.thumbnail?.contentUrl || fallbackNewsImg} fallbackSrc={fallbackNewsImg} alt="News Thumbnail" boxSize={{ base: '0px', mdlg: '75px' }} fit="contain"></Image>
                </HStack>
                <Text my={5}>{`${story.description.substring(0, 100)}... `}</Text>
                <Divider />
                <HStack justifyContent="space-between" w="full" marginTop="auto">
                  <HStack>
                    <Image src={story?.provider[0]?.image?.thumbnail?.contentUrl || fallbackProviderImg} fallbackSrc={fallbackProviderImg} alt="News Provider" boxSize="25px" ></Image>
                    <Text fontSize="xs">{story.provider[0].name}</Text>
                  </HStack>
                  <Text fontSize="sm">{moment(story.datePublished).startOf('ss').fromNow()}</Text>
                </HStack>
              </Flex>
            </Box>
          </GridItem>
        ))}
      </SimpleGrid>
    </>
  )
}

export default News
