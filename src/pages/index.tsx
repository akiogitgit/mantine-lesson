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

const Home: NextPage = () => {
  const session = useStore(state => state.session)
  const setSession = useStore(state => state.setSession)

  const count = useStore(state => state.count)
  const setCount = useStore(state => state.setCount)

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
      <Dashboard />

      <Center>{session ? <Dashboard /> : <Auth />}</Center>

      <Center mt={100}>
        {count}
        <Button onClick={() => setCount(count + 1)}>Add</Button>
      </Center>

      <Stack align='center' spacing={2} mt={20}>
        {["button", "group", "grid", "form", "dashBoard"].map(path => (
          <Link key={path} href={`/${path}`} className='text-white'>
            <a>{path}</a>
          </Link>
        ))}
      </Stack>
    </Layout>
  )
}

export default Home
