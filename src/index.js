require('dotenv').config()

const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')
const queryString = require('query-string')

const app = express()
const PORT = 5000
const { API_KEY, BASE_URL } = process.env

app.use(cors())

app.get('/cryptocurrency/listings/latest', async (req, res) => {
  const { limit = 10, convert = 'USD' } = req.query
  const query = queryString.stringify({ limit, convert })

  try {
    const result = await fetch(`${BASE_URL}cryptocurrency/listings/latest?${query}`, {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY
      }
    })
    const json = await result.json()
    res.json(json)
  } catch (error) {
    console.log(error)
  }
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
