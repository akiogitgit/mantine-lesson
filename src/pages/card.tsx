import { NextPage } from "next"
import { Layout } from "../components/Layout"
import { CustomCard } from "../components/CustomCard"
import { PostForm } from "../components/PostForm"
import { Center, ScrollArea } from "@mantine/core"
import { Post } from "../types/post"
import { useGetApi } from "../hooks/useGetApi"
import { Carousel } from "@mantine/carousel"

const CardDemo: NextPage = () => {
  // const { data: posts } = useGetApi<Post>({ tableName: "posts" })
  // const { data: posts } = useGetApi<Post>("posts", {
  //   order: "created_at",
  //   ascending: true,
  // })
  const { data: posts } = useGetApi<Post>("posts", { ascending: false })
  console.log(posts)
  // const posts: Post[] = [
  //   {
  //     id: 1,
  //     created_at: "22",
  //     title: "Norway Fjord Adventures",
  //     content:
  //       "With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway",
  //     status: "hot",
  //     post_url:
  //       "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
  //   },
  //   {
  //     id: 1,
  //     created_at: "22",
  //     title: "Norway",
  //     content:
  //       "With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway",
  //     status: "new",
  //     post_url:
  //       "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
  //   },
  //   {
  //     id: 1,
  //     created_at: "22asf",
  //     title: "Fjord Adventures",
  //     content:
  //       "With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway",
  //     status: "pickup",
  //     post_url:
  //       "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
  //   },
  //   {
  //     id: 1,
  //     created_at: "22asf",
  //     title: "Fjord Adventures",
  //     content:
  //       "With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway",
  //     status: "pickup",
  //     post_url:
  //       "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
  //   },
  // ]
  return (
    <Layout>
      <Center>
        <PostForm />
      </Center>
      <ScrollArea scrollHideDelay={500}>
        <ul className='flex gap-10 items-start '>
          {posts?.map((post, index) => (
            <li key={index}>
              <CustomCard post={post} />
            </li>
          ))}
        </ul>
      </ScrollArea>
      {posts && (
        <>
          <Carousel
            slideSize='350px'
            slideGap='lg'
            controlSize={40}
            slidesToScroll={1}
            loop
            withIndicators
          >
            {posts?.map((post, index) => (
              <Carousel.Slide key={index}>
                <CustomCard post={post} />
              </Carousel.Slide>
            ))}
          </Carousel>

          <Carousel
            withIndicators
            height={200}
            slideSize='50%'
            slideGap='md'
            loop
            align='start'
            slidesToScroll={2}
          >
            {posts.map((post, index) => (
              <Carousel.Slide key={index}>
                <CustomCard post={post} />
              </Carousel.Slide>
            ))}
          </Carousel>
        </>
      )}
    </Layout>
  )
}

export default CardDemo
