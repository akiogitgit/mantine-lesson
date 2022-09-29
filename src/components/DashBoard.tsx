import { ShieldCheckIcon } from "@heroicons/react/solid"
import { LogoutIcon } from "@heroicons/react/outline"
import {
  ActionIcon,
  AppShell,
  Center,
  Header,
  Menu,
  Navbar,
} from "@mantine/core"
import { supabase } from "../utils/supabase"
import { Layout } from "../components/Layout"
import { useCallback } from "react"

export const Dashboard = () => {
  const signOut = useCallback(() => {
    supabase.auth.signOut()
    console.log("signOut")
  }, [])

  return (
    <div>
      DashBoard
      <a href=''></a>
      <Center>
        <ShieldCheckIcon className='h-16 w-16' />
      </Center>
      <Center className='cursor-pointer' onClick={signOut}>
        <LogoutIcon className='h-16 w-16' />
      </Center>
      <AppShell
        padding='md'
        navbar={
          <Navbar width={{ base: 300 }} height={500} p='xs'>
            {/* Navbar content */}aaa
          </Navbar>
        }
        header={
          <Header height={60} p='xs'>
            {/* Header content */}
          </Header>
        }
        styles={theme => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        {/* Your application here */}
      </AppShell>
    </div>
  )
}
