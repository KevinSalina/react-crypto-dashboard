import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = '/api'

const createRequest = (url) => ({ url })

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`)
    }),
    getSingleCrypto: builder.query({
      query: (id) => createRequest(`/coin/${id}`)
    }),
    getCryptoHistory: builder.query({
      query: ({ id, timePeriod }) => createRequest(`/coin/${id}/history/?timePeriod=${timePeriod}`)
    }),
    getExchanges: builder.query({
      query: (count) => createRequest(`/exchanges?limit=${count}`)
    }),
    getExchangeDesc: builder.query({
      query: (id) => createRequest(`/exchange/${id}`)
    })
  })
})

export const {
  useGetCryptosQuery,
  useGetSingleCryptoQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery,
  useGetExchangeDescQuery,
} = cryptoApi;


// 