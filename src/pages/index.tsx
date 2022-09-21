import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { Layout } from "../components/Layout"

const Home: NextPage = () => {
  return (
    <Layout>
      <div>aaa</div>
      <Link href='/buttonDemo'>button</Link>
    </Layout>
  )
}

export default Home
