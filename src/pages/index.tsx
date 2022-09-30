import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { Layout } from "../components/Layout"
import { Button, Center, Stack } from "@mantine/core"
import useStore from "../store"
import { useEffect } from "react"
import { supabase } from "../utils/supabase"
import { Dashboard } from "../components/DashBoard"
import { Auth } from "../components/Auth"
import { useQueryTodos } from "../hooks/useQueryTodos"
import { FetchTodos } from "../components/FechTodos"

const Home: NextPage = () => {
  const session = useStore(state => state.session)
  const setSession = useStore(state => state.setSession)
  const count = useStore(state => state.count)
  const setCount = useStore(state => state.setCount)
  // const { getTodos } = useQueryTodos()
  // console.log(getTodos)

  useEffect(() => {
    setSession(supabase.auth.session())
    // 最新のSessionで更新
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    console.log(session)
  }, [setSession, count, session])

  return (
    <Layout>
      <Center>{session ? <Dashboard /> : <Auth />}</Center>

      <Center mt={100}>
        {count}
        <Button onClick={() => setCount(count + 1)}>Add</Button>
      </Center>
    </Layout>
  )
}

export default Home
