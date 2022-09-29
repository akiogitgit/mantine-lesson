import { Navbar, Header, AppShell } from "@mantine/core"
import React from "react"
import { Layout } from "../components/Layout"

const AppShellDemo = () => {
  return (
    <Layout>
      <AppShell
        padding='md'
        navbar={
          <Navbar
            className='bg-yellow-700 text-white'
            width={{ base: 300 }}
            height={500}
            p='xs'
          >
            {[...Array(10)].map((_, i) => (
              <Navbar.Section key={i}>menu{i}</Navbar.Section>
            ))}
            <Navbar.Section grow mt='md'>
              aa
            </Navbar.Section>
            <Navbar.Section>ff</Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={60}>
            <header className='bg-emerald-300 w-full py-3'>Header</header>
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
        <div className='h-full bg-red-100 w-full'>a</div>
        this is my App
      </AppShell>
    </Layout>
  )
}

export default AppShellDemo
