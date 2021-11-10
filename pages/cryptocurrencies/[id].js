import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Heading } from '@chakra-ui/react'
import CryptoDetails from '../../components/CryptoDetails'

export default function Post() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <CryptoDetails coinId={id} />
    </div>
  )
}

