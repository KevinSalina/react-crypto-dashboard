import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Heading } from '@chakra-ui/react'
import CryptoDetails from '../../components/CryptoDetails'




export default function Post() {
  const router = useRouter()
  const { id } = router.query



  return (
    <div>
      {/* <Heading as="h1" mb={10}> Crypto Details Page - {id}</Heading> */}
      <CryptoDetails coinId={id} />
    </div>
  )
}

