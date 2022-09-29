import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { Layout } from "../components/Layout"
import { Stack } from "@mantine/core"

const Home: NextPage = () => {
  return (
    <Layout>
      <div>aaa</div>
      <Stack align='center' spacing={2}>
        <Link href='/button' className='text-white'>
          <a>button</a>
        </Link>
        <Link href='/group' className='text-white'>
          <a>group</a>
        </Link>
        <Link href='/grid' className='text-white'>
          <a>grid</a>
        </Link>
        <Link href='/table' className='text-white'>
          <a>table</a>
        </Link>
        <Link href='/form' className='text-white'>
          <a>form</a>
        </Link>
      </Stack>
    </Layout>
  )
}

export default Home
