import { Group } from "@mantine/core"
import React from "react"
import { FetchTodos } from "../components/FechTodos"
import { Layout } from "../components/Layout"

const FetchData = () => {
  return (
    <Layout>
      <div className='flex justify-between'>
        <FetchTodos />
        <FetchTodos />
      </div>
    </Layout>
  )
}

export default FetchData
