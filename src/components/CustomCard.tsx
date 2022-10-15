import { Badge, Button, Card, Group } from "@mantine/core"
import React, { FC } from "react"
import { Post } from "../types/post"
// import Image from "next/image"
import { Image } from "@mantine/core"
import { useQueryPosts } from "../hooks/useQueryPosts"
import { useDB } from "../hooks/useDB"

type Props = { post: Post }

export const CustomCard: FC<Props> = ({ post }) => {
  const { deleteDB } = useDB()

  return (
    <Card shadow='md' className='min-w-300px max-w-400px'>
      <Card.Section>
        {/* <Image height={160} width={160} alt='' src={post_url} /> */}
        {/* <Image height={160} width={160} alt='' src={post_url} withPlaceholder /> */}

        <Image
          width={200}
          height={120}
          src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/posts/${post.post_url}`}
          alt='Without placeholder'
          withPlaceholder
        />
      </Card.Section>
      <Group position='apart'>
        <p className='text-xl'>{post.title}</p>
        <Badge
          variant='filled'
          radius='lg'
          color='pink'
          className='hover:bg-blue-400'
          onClick={() => deleteDB("posts", { value: post.id })}
        >
          {post.status}
        </Badge>
      </Group>
      <p className='mt-5'>{post.content}</p>

      <Button mt='md' className='w-full' color='gray'>
        Subscribe
      </Button>
    </Card>
  )
}
