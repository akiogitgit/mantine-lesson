import { NextPage } from "next"
import React from "react"
import { Auth } from "../components/Auth"
import { Layout } from "../components/Layout"

const form: NextPage = () => {
  return (
    <Layout>
      form
      <div className='mx-auto w-300px'>
        <Auth />
      </div>
    </Layout>
  )
}

export default form
