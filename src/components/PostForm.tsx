import { Button, Textarea, TextInput } from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { useCallback } from "react"
import * as Yup from "yup"
import { Post } from "../types/post"
export const PostForm = () => {
  const schema = Yup.object().shape({
    title: Yup.string().required("タイトルは必須項目です。"),
    content: Yup.string().required("内容は必須項目です。"),
    status: Yup.string().required("ステータスは必須項目です。"),
  })

  const form = useForm<Post>({
    schema: yupResolver(schema),
    initialValues: {
      title: "adsf",
      content: "",
      status: "",
      post_url: "",
    },
  })

  const onSubmit = useCallback(() => {
    console.log("submit!", form.values)
  }, [form.values])

  return (
    <div className='min-w-200px max-w-500px'>
      {JSON.stringify(form.values)}
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
        <TextInput
          label='Status'
          withAsterisk
          {...form.getInputProps("status")}
        />{" "}
        <TextInput
          label='url'
          withAsterisk
          {...form.getInputProps("post_url")}
        />
        <div className='flex justify-end'>
          <Button type='submit'>作成</Button>
        </div>
      </form>
    </div>
  )
}
