import React, { FC, ReactNode } from "react"
import Head from "next/head"
import { Center, Group } from "@mantine/core"
import Link from "next/link"
import { ReplyIcon } from "@heroicons/react/solid"

type Props = {
  children: ReactNode
  title?: string
}

export const Layout: FC<Props> = ({ title = "Mantine Lesson", children }) => {
  return (
    <div className='min-h-screen'>
      <Head>
        <title>{title}</title>
      </Head>

      <header></header>

      <main className='p-4'>{children}</main>

      <footer>
        {/* 中央寄せ */}
        <Center>
          <Link href='/'>
            <ReplyIcon className='cursor-pointer h-6 w-6' />
          </Link>
        </Center>

        <div className='flex justify-center'>
          <Link href='/'>
            <ReplyIcon className='cursor-pointer h-6 w-6' />
          </Link>
        </div>

        <Group position='center'>
          <Link href='/'>
            <ReplyIcon className='cursor-pointer h-6 w-6' />
          </Link>
        </Group>
      </footer>
    </div>
  )
}
