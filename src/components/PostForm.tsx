import { CameraIcon } from "@heroicons/react/solid"
import {
  Avatar,
  Button,
  Center,
  Indicator,
  Loader,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { ChangeEvent, useCallback, useState } from "react"
import { useQueryClient } from "react-query"
import * as Yup from "yup"
import { useDB } from "../hooks/useDB"
import { useQueryPosts } from "../hooks/useQueryPosts"
import { Post } from "../types/post"
import { supabase } from "../utils/supabase"

const schema = Yup.object().shape({
  title: Yup.string().required("タイトルは必須項目です。"),
  content: Yup.string().required("内容は必須項目です。"),
  status: Yup.string().required("ステータスは必須項目です。"),
})

type PostFormParams = Pick<Post, "title" | "content" | "status">

export const PostForm = () => {
  const queryClient = useQueryClient()
  const { data: posts } = useQueryPosts()
  const [isLoading, setIsLoading] = useState(false)
  const [postUrl, setPostUrl] = useState("")
  const { insertDB } = useDB()

  const form = useForm<PostFormParams>({
    schema: yupResolver(schema),
    initialValues: {
      title: "",
      content: "",
      status: "",
    },
  })

  const uploadPostImg = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("Plese select the image file.")
      }

      const file = e.target.files[0]
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random()}.${fileExt}`
      setIsLoading(true)
      const { error } = await supabase.storage
        .from("posts")
        .upload(fileName, file)

      if (error) {
        throw new Error(error.message)
      }
      setPostUrl(fileName)
      setIsLoading(false)
    },
    [],
  )

  const onSubmit = useCallback(async () => {
    console.log("submit!", {
      title: form.values.title,
      content: form.values.content,
      status: form.values.status,
      post_url: postUrl,
    })
    setIsLoading(true)

    await insertDB<Post>("posts", {
      title: form.values.title,
      content: form.values.content,
      status: form.values.status,
      post_url: postUrl,
    })

    console.log("投稿に成功しました")
    setIsLoading(false)
    setPostUrl("")
    form.reset()
  }, [form, insertDB, postUrl])

  return (
    <div className='min-w-200px max-w-500px'>
      <form onSubmit={form.onSubmit(onSubmit)} className='flex flex-col gap-3'>
        <TextInput
          label='Title'
          withAsterisk
          {...form.getInputProps("title")}
        />
        <Textarea
          label='Description'
          withAsterisk
          autosize
          {...form.getInputProps("content")}
        />
        <Select
          label='status'
          withAsterisk
          data={["new", "hot", "sale"]}
          {...form.getInputProps("status")}
        />
        <Center className='flex-col'>
          {isLoading && <Loader />}
          {postUrl && (
            <Avatar
              size='lg'
              radius='sm'
              className='transform duration-300 hover:scale-105'
              src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/posts/${postUrl}`}
            />
          )}
          <label htmlFor='post'>
            <CameraIcon className='cursor-pointer h-10 w-10' />
          </label>
          <input
            type='file'
            id='post'
            accept='image/*'
            className='hidden'
            onChange={uploadPostImg}
          />
          <Button type='submit'>作成</Button>
        </Center>
      </form>
    </div>
  )
}
