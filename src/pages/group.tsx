import { NextPage } from "next"
import { Layout } from "../components/Layout"
import { Center, Button, Group } from "@mantine/core"
import { ReplyIcon } from "@heroicons/react/solid"
import Link from "next/link"

// position="center" 中央
// position="apart" justify-between
// grow で同じ比率で、widthいっぱいに大きくなる

const GroupDemo: NextPage = () => {
  return (
    <Layout title='Group'>
      {/* position */}
      <Group position='center' my='md' spacing='md'>
        <Button color='indigo'>button1</Button>
        <Button color='teal'>button2</Button>
        <Button color='orange'>button3</Button>
      </Group>

      <Group position='right' my='md'>
        <Button color='indigo'>button1</Button>
        <Button color='teal'>button2</Button>
        <Button color='orange'>button3</Button>
      </Group>

      <Group position='left' grow my='md'>
        <Button color='indigo'>button1</Button>
        <Button color='teal'>button2</Button>
        <Button color='orange'>button3</Button>
      </Group>

      <Group position='apart' my='md'>
        <Button color='indigo'>button1</Button>
        <Button color='teal'>button2</Button>
        <Button color='orange'>button3</Button>
      </Group>

      {/* direction */}
      <Group position='center' direction='column' mt='xl'>
        <Button color='indigo'>button1</Button>
        <Button color='teal'>button2</Button>
        <Button color='orange'>button3</Button>
      </Group>

      {/* align */}
      <Group position='right' my='md' align='start'>
        <Button color='indigo' className='h-10'>
          button1
        </Button>
        <Button color='teal' className='h-15'>
          button2
        </Button>
        <Button color='orange' className='h-20'>
          button3
        </Button>
      </Group>

      <Group position='right' my='md' align='end'>
        <Button color='indigo' className='h-10'>
          button1
        </Button>
        <Button color='teal' className='h-15'>
          button2
        </Button>
        <Button color='orange' className='h-20'>
          button3
        </Button>
      </Group>

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
    </Layout>
  )
}

export default GroupDemo
