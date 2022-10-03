import { Badge, Button, Card, Group } from "@mantine/core"
import React, { FC } from "react"
import { Post } from "../types/post"
// import Image from "next/image"
import { Image } from "@mantine/core"

type Props = Pick<Post, "title" | "content" | "status" | "post_url">

export const CustomCard: FC<Props> = ({
  title,
  content,
  status,
  post_url = null,
}) => {
  return (
    <Card shadow='md' className='min-w-300px max-w-400px'>
      <Card.Section>
        {/* <Image height={160} width={160} alt='' src={post_url} /> */}
        {/* <Image height={160} width={160} alt='' src={post_url} withPlaceholder /> */}

        <Image
          width={200}
          height={120}
          src={undefined}
          alt='Without placeholder'
          withPlaceholder
        />
      </Card.Section>
      <Group position='apart'>
        <p className='text-xl'>{title}</p>
        <Badge variant='filled' radius='lg' color='pink'>
          {status}
        </Badge>
      </Group>
      <p className='mt-5'>{content}</p>

      <Button mt='md' className='w-full' color='gray'>
        Subscribe
      </Button>
    </Card>
  )
}
