import { NextPage } from "next"
import { Layout } from "../components/Layout"
import { CustomCard } from "../components/CustomCard"
import { PostForm } from "../components/PostForm"

const CardDemo: NextPage = () => {
  return (
    <Layout>
      <div>
        <PostForm />
        <CustomCard
          post_url='https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
          title='Norway Fjord Adventures'
          content='With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway'
          status='hot'
        />
      </div>
    </Layout>
  )
}

export default CardDemo
