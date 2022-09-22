import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { Layout } from "../components/Layout"
import { Group } from "@mantine/core"

const Home: NextPage = () => {
  return (
    <Layout>
      <div>aaa</div>
      <Group direction='column' spacing={2}>
        <Link href='/button' className='text-white'>
          <a>button</a>
        </Link>
        <Link href='/group' className='text-white'>
          <a>group</a>
        </Link>
        <Link href='/grid' className='text-white'>
          <a>grid</a>
        </Link>
      </Group>
    </Layout>
  )
}

export default Home
