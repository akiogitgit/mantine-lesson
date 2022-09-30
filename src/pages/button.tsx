import { Button, Stack, Text } from "@mantine/core"
import { Layout } from "../components/Layout"
import { BrandGithub, ThreeDCubeSphere } from "tabler-icons-react"
import Link from "next/link"
import { ReplyIcon } from "@heroicons/react/solid"
import { NextPage } from "next"

// Stack は、position, gap, alignItems
// Button は色々カスタマイズ出来る
// classNames で、内部の階層のスタイルを当てられる

const ButtonDemo: NextPage = () => {
  const variants: ("filled" | "outline" | "light" | "subtle" | "white")[] = [
    "filled",
    "outline",
    "light",
    "subtle",
    "white",
  ]
  return (
    <Layout>
      <Stack align='center' spacing={50}>
        <Link href='/'>
          <ReplyIcon className='h-6 mt-4 text-gray-100 w-6' />
        </Link>

        <Button onClick={() => alert("anpan")}>Press!</Button>

        <Button color='dark' radius='xl' size='xl'>
          Settings
        </Button>

        <div className='flex flex-wrap gap-3 justify-center'>
          {variants.map(variant => (
            <Button key={variant} color='red' radius='xs' variant={variant}>
              <Text transform='capitalize'>{variant}</Text>
            </Button>
          ))}
        </div>

        <div className='flex flex-wrap gap-3 justify-center'>
          <Button
            uppercase
            radius='md'
            color='cyan'
            leftIcon={<BrandGithub size={20} />}
            rightIcon={<ThreeDCubeSphere size={20} />}
            classNames={{ rightIcon: "text-red-500" }}
          >
            leftIcon
          </Button>
          <Button
            uppercase
            radius='md'
            color='cyan'
            rightIcon={<ThreeDCubeSphere size={20} />}
          >
            rightIcon
          </Button>
        </div>

        {/* 大きさ・丸み・色 */}
        <div className='flex flex-wrap gap-3 justify-center'>
          {[
            "blue",
            "cyan",
            "dark",
            "grape",
            "green",
            "indigo",
            "lime",
            "orange",
            "pink",
            "red",
            "teal",
            "violet",
            "yellow",
          ].map(color => (
            <Button key={color} color={color}>
              <Text transform='capitalize'>{color}</Text>
            </Button>
          ))}
        </div>

        <div className='flex flex-wrap gap-3 items-center justify-center'>
          {/* compact: padding小さい、uppercase: 全大文字 */}
          <Button color='yellow' radius='md'>
            Default
          </Button>
          <Button color='orange' radius='md' uppercase>
            Uppercase
          </Button>
          <Button color='red' radius='md' compact>
            Compact
          </Button>
        </div>

        {/* gradient: グラデーション */}
        <div className='flex flex-wrap gap-3 justify-center'>
          <Button variant='gradient' gradient={{ from: "indigo", to: "cyan" }}>
            Indigo cyan
          </Button>
          <Button
            variant='gradient'
            gradient={{ from: "teal", to: "lime", deg: 105 }}
          >
            Lime green
          </Button>
          <Button
            variant='gradient'
            gradient={{ from: "teal", to: "blue", deg: 60 }}
          >
            Teal blue
          </Button>
          <Button variant='gradient' gradient={{ from: "orange", to: "red" }}>
            Orange red
          </Button>
          <Button
            variant='gradient'
            gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
          >
            Peach
          </Button>
        </div>
      </Stack>
    </Layout>
  )
}

export default ButtonDemo
