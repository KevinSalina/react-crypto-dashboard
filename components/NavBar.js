import React from 'react'
import { FaMoneyBillAlt } from 'react-icons/fa'
import { AiOutlineHome, AiOutlineLineChart, AiOutlineMoneyCollect, AiOutlineBulb } from 'react-icons/ai'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  Box,
  Container,
  Button,
  Flex,
  Icon,
  Heading,
  Link,
  VStack,
  HStack,
  useColorModeValue
} from '@chakra-ui/react'


const NavBar = ({ path }) => {

  const LinkItem = ({ href, children, icon }) => {
    const router = useRouter()
    const active = router.asPath === href

    const handleClick = (e) => {
      e.preventDefault()
      router.push(href)
    }

    const inactiveColor = useColorModeValue('green.500', 'green.300')

    return (
      <Box w="full" px={6} py={3} bg={active ? 'gray.500' : undefined} onClick={handleClick} _hover={{ color: 'white', cursor: 'pointer' }} transition="all .1s ease-in">
        <HStack>
          <Icon as={icon} mr={1} boxSize={5} color="white" />
          <Heading size="sm" >
            <NextLink href={href}>
              <a>{children}</a>
            </NextLink>
          </Heading>
        </HStack>
      </Box >

    )
  }


  return (
    <Box as='nav' flex={.2} position="fixed" top={0} left={0} bg="blue.900" color="blue.200" display='flex' flexDir='column' w='225px' h='full'>
      <Flex alignItems="center" p={3}>
        <Heading size="lg" color="white" >
          <NextLink href="/">
            <a>React Crypto</a>
          </NextLink>
        </Heading>
      </Flex>
      <VStack alignItems="flex-start">
        <LinkItem href='/' icon={AiOutlineHome}>
          Home
        </LinkItem>
        <LinkItem href='/cryptocurrencies' icon={AiOutlineLineChart}>
          Cryptocurrencies
        </LinkItem>
        <LinkItem href='/exchanges' icon={AiOutlineMoneyCollect} >
          Exchanges
        </LinkItem>
        <LinkItem href='/news' icon={AiOutlineBulb}>
          News
        </LinkItem>
      </VStack>
    </Box>
  )

}

export default NavBar
