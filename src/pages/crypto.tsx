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

  const setCoinHistory = useCallback(async () => {
    // coingeckoのparamsに合わせる
    const dateParam = date
      ? `date=${getDate(date!)}-${getMonth(date!) + 1}-${getYear(date!)}`
      : ""

    // coingecko で仮想通貨のレートを取得
    if (dateParam) {
      setBtc(await getCoinHistory("bitcoin", dateParam))
      setEth(await getCoinHistory("ethereum", dateParam))
    }
  }, [date, getCoinHistory])

  useEffect(() => {
    setCoinHistory()
  }, [setCoinHistory])

  return (
    <Layout>
      {/* {date && JSON.stringify(date)} */}
      <DatePicker
        placeholder='Pick date'
        label='Event date'
        withAsterisk
        onChange={setDate}
      />
      <p>{btc && btc.market_data?.current_price?.jpy}</p>
    </Layout>
  )
}

export default Crypto
