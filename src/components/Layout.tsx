import React, { FC, ReactElement, ReactNode } from "react"
import Head from "next/head"

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

      <footer></footer>
    </div>
  )
}
