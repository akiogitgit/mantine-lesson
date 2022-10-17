import { LightningBoltIcon } from "@heroicons/react/solid"
import { Text, Loader, Stack } from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import axios from "axios"
import { getDate, getMonth, getYear } from "date-fns"
import { useCallback, useEffect, useState } from "react"
import { Layout } from "../components/Layout"

type Coin = {
  market_data: {
    current_price: { jpy: string }
  }
}

const Crypto = () => {
  const [date, setDate] = useState<Date | null>(new Date())
  const [btc, setBtc] = useState<Coin | null>(null)
  const [eth, setEth] = useState<Coin | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const getCoinHistory = useCallback(
    async (coinId: string, dateParam: string) => {
      // const res = await axios.get(
      //   "https://api.coingecko.com/api/v3/coins/bitcoin/history?" + dateParam,
      // )
      // axios
      //   .get(
      //     "https://api.coingecko.com/api/v3/coins/bitcoin/history?" + dateParam,
      //   )
      //   .then(res => {
      //     console.log(res.data)
      //   })

      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/history?${dateParam}`,
      ).then(res => res.json())
      console.log(res)

      // fetch("https://api.coingecko.com/api/v3/coins/bitcoin/history?" + dateParam)
      //   .then(res => res.json())
      //   .then(data => {
      //     console.log(data)
      //   })

      return res
    },
    [],
  )

  useEffect(() => {
    // coingeckoのparamsに合わせる
    const dateParam = date
      ? `date=${getDate(date!)}-${getMonth(date!) + 1}-${getYear(date!)}`
      : ""
    const setCoinHistory = async () => {
      // coingecko で仮想通貨のレートを取得
      if (dateParam) {
        setIsLoading(true)
        setBtc(await getCoinHistory("bitcoin", dateParam))
        setEth(await getCoinHistory("ethereum", dateParam))
        setIsLoading(false)
      }
    }
    setCoinHistory()
  }, [date, getCoinHistory])

  return (
    <Layout>
      <Stack justify='center' align='center'>
        <LightningBoltIcon className='h-10 mb-4 text-blue-500 w-10' />
        {isLoading && <Loader size='xl' variant='bars' />}
        <Text mt='md'>
          <Text color='blue' component='span'>
            Bitcoin
          </Text>{" "}
          {Math.round(Number(btc?.market_data?.current_price.jpy) * 100) / 100}
        </Text>
        <Text mt='md'>
          <Text color='cyan' component='span'>
            Ethereum
          </Text>{" "}
          {Math.round(Number(eth?.market_data?.current_price.jpy) * 100) / 100}
        </Text>
        <DatePicker
          mt='xl'
          placeholder='Pick date'
          label='Event date'
          withAsterisk
          onChange={setDate}
        />
      </Stack>
    </Layout>
  )
}

export default Crypto
