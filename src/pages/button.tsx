import { Button, Stack, Group, Dialog } from "@mantine/core"
import { Layout } from "../components/Layout"
import { BrandGithub, ThreeDCubeSphere } from "tabler-icons-react"
import Link from "next/link"
import { ReplyIcon } from "@heroicons/react/solid"
import { NextPage } from "next"

// Stack は、position, gap, alignItems
// Button は色々カスタマイズ出来る
// classNames で、内部の階層のスタイルを当てられる

const ButtonDemo: NextPage = () => {
  return (
    <Layout>
      <Stack align='center' spacing={5}>
        <Link href='/'>
          <ReplyIcon className='h-6 mt-4 text-gray-100 w-6' />
        </Link>
        <Button onClick={() => alert("anpan")}>Press!</Button>
        <Button
          uppercase
          radius='md'
          color='cyan'
          leftIcon={<BrandGithub size={20} />}
          rightIcon={<ThreeDCubeSphere size={20} />}
          classNames={{ rightIcon: "text-red-500" }}
        >
          Send
        </Button>
        <Button
          uppercase
          radius='md'
          color='cyan'
          rightIcon={<ThreeDCubeSphere size={20} />}
        >
          Send
        </Button>
      </Stack>

      {/* 大きさ・丸み・色 */}
      <Button size='lg' radius='lg' color='lime'>
        Settings
      </Button>
      {/* compact: padding小さい、uppercase: 全大文字 */}
      <Button color='yellow' radius='md' compact uppercase>
        Settings
      </Button>
      {/* variant: ボタンデザインの種類 mtは全てのコンポーネントで使える */}
      <Button variant='outline' mt={10} p='xl'>
        Button
      </Button>
      {/* gradient: グラデーション */}
      <Button variant='gradient' gradient={{ from: "yellow", to: "red" }}>
        Settings
      </Button>
    </Layout>
  )
}

export default ButtonDemo
