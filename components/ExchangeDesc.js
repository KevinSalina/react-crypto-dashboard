import React, { useState, useEffect } from 'react'
import HTMLReactParser, { domToReact } from 'html-react-parser'
import {
  Text,
  Heading,
  Link
} from '@chakra-ui/react'

import { useGetExchangeDescQuery } from '../services/cryptoApi'
import Loader from './Loader'

const ExchangeDesc = ({ id }) => {
  const [exchangeData, setExchangeData] = useState(null)

  const { data, isFetching } = useGetExchangeDescQuery(id)

  useEffect(() => {
    setExchangeData(data?.data?.exchange)
  }, [data])

  if (isFetching || !exchangeData) return <Loader small />

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


  return (
    HTMLReactParser(`${exchangeData.description}`, htmlParserOptions)
  )
}

export default ExchangeDesc
