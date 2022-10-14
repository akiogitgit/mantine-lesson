import { NextPage } from "next"
import { Layout } from "../components/Layout"
import { CustomCard } from "../components/CustomCard"
import { PostForm } from "../components/PostForm"
import { Center } from "@mantine/core"
import { Post } from "../types/post"
import { useQueryPosts } from "../hooks/useQueryPosts"
import { useGetApi } from "../hooks/useGetApi"

// id: number;
// created_at: string;
// title: string;
// content: string;
// status: "new" | "pickup" | "hot";
// post_url: string;
const CardDemo: NextPage = () => {
  // const { data: posts } = useQueryPosts()
  // const { data: posts } = useGetApi<Post>({ tableName: "posts" })
  // const { data: posts } = useGetApi<Post>("posts", { ascending: true })
  const { data: posts } = useGetApi<Post>("posts", {})
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

      <ul className='flex gap-3 items-center overflow-x-scroll'>
        {posts?.map((post, index) => (
          <li key={index} className='w-400px'>
            <CustomCard
              post_url={post.post_url}
              title={post.title}
              content={post.content}
              status={post.status}
            />
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default CardDemo
