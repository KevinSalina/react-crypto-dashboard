import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': '158524c042msh1189b7774f2c178p18016fjsndd7ba281b234'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url) => ({ url, headers: cryptoHeaders })

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
      query: ({ id, timePeriod }) => createRequest(`/coin/${id}/history/${timePeriod}`)
    }),
    getExchanges: builder.query({
      query: (count) => createRequest(`/exchanges?limit=${count}`)
    })

  })
})

export const {
  useGetCryptosQuery,
  useGetSingleCryptoQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery
} = cryptoApi;