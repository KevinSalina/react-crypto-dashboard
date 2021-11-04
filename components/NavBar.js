import React, { useState, useEffect } from 'react'
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'


const NavBar = ({ path }) => {

  const [activeMenu, setActiveMenu] = useState(true)
  const [screenSize, setScreenSize] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  })

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
    <Box
      as='nav'
      // flex={{ base: 1, md: .2 }}
      position="fixed"
      zIndex='100'
      top={0}
      left={0}
      bg="blue.900"
      color="blue.200"
      display='flex'
      flexDir='column'
      w={{ base: 'full', md: '225px' }}
      h={{ base: 'auto', md: 'full' }}
    >
      <Flex alignItems="center" p={{ base: 5, md: 3 }} justifyContent='space-between'>
        <Heading size="lg" color="white">
          <NextLink href="/">
            <a>React Crypto</a>
          </NextLink>
        </Heading>
        <Box display={{ base: 'block', md: 'none' }}>
          <Menu isLazy id={1}>
            <MenuButton as={Button} color="blue.900">
              <HamburgerIcon />
            </MenuButton>
            <MenuList color="blue.900" zIndex='100'>
              <NextLink href='/' passHref>
                <MenuItem>
                  Home
                </MenuItem>
              </NextLink>
              <NextLink href='/cryptocurrencies' passHref>
                <MenuItem>
                  Cryptocurrencies
                </MenuItem>
              </NextLink>
              <NextLink href='/exchanges'>
                <MenuItem>
                  Exchanges
                </MenuItem>
              </NextLink>
              <NextLink href='/news'>
                <MenuItem>
                  News
                </MenuItem>
              </NextLink>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <VStack alignItems="flex-start" display={{ base: 'none', md: 'flex' }}>
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
