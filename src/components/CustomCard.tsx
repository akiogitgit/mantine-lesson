import { Badge, Button, Card, Group, Text } from "@mantine/core"
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
    <Card shadow='md' className='w-350px' radius='lg'>
      <Card.Section>
        <Image
          width={350}
          height={150}
          src={`${
            post.post_url
              ? `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/posts/${post.post_url}`
              : ""
          }`}
          alt='Without placeholder'
          withPlaceholder
        />
      </Card.Section>
      <Group position='apart' mt='md'>
        <Text lineClamp={1} size='lg'>
          {post.title}
        </Text>
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
      <Text lineClamp={4} className='h-16 mt-5 text-sm whitespace-pre'>
        {post.content}
      </Text>

      <Button mt='md' className='w-full' color='gray'>
        Subscribe
      </Button>
    </Card>
  )
}
