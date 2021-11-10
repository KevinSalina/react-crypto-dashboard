import axios from 'axios'

export default async function handler(req, res) {

  const { limit } = req.query

  try {
    const headers = {
      'x-access-token': process.env.NEXT_PUBLIC_COINRANKING_API_KEY,
    }

    const url = `https://api.coinranking.com/v2/coins?limit=${limit}`
    const data = await axios.get(url, { headers })

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.send(data.data)


  } catch (err) {
    console.log(err)
  }
}