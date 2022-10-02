import { ChangeEvent, useState, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  Avatar,
  Button,
  Center,
  FileInput,
  Group,
  Indicator,
  Loader,
} from "@mantine/core"
import { ReplyIcon, CameraIcon } from "@heroicons/react/solid"
import { supabase } from "../utils/supabase"
import { Layout } from "../components/Layout"
import Image from "next/image"

const AvatarDemo = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState("")

  // FileInputからは取得できない
  const uploadAvatarImg = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      console.log("file: ", e, e.target.files)
      if (!e.target.files || !e.target.files.length) {
        throw new Error("Please select the image file")
      }

      const file = e.target.files[0] // 内容
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random()}.${fileExt}` // storageに保存する名前
      setIsLoading(true)

      const { error } = await supabase.storage
        .from("avatars") // storageのavatarsにfileをupload
        .upload(fileName, file)
      if (error) {
        throw new Error(error.message)
      }
      setAvatarUrl(fileName)
      setIsLoading(false)
    },
    [],
  )

  // upsert は、存在しなければInsert, 存在すればUpdate する優れもの
  const upsertProfile = useCallback(async () => {
    setIsLoading(true)

    // DBのprofilesテーブルに、id,avatar_urlを指定して追加
    // profilesに自分のidとavatar_urlを追加
    const { error } = await supabase.from("profiles").upsert(
      {
        id: supabase.auth.user()?.id,
        avatar_url: avatarUrl,
      },
      {
        returning: "minimal", //返り値を無くす
      },
    )
    if (error) {
      throw new Error(error.message)
    }
    setIsLoading(false)
    console.log("upsert", {
      id: supabase.auth.user()?.id,
      avatar_url: avatarUrl,
    })
  }, [avatarUrl])

  const getProfile = useCallback(async () => {
    const { data, error, status } = await supabase
      .from("profiles")
      .select("avatar_url") // profilesテーブルのavatar_urlカラム
      .eq("id", supabase.auth.user()?.id) // ログインしているuser.idと同じ
      .single() // １つ

    // profile無い時は406になるから、エラーは投げない
    if (error && status !== 406) {
      throw new Error(error.message)
    }
    if (data) {
      setAvatarUrl(data.avatar_url)
      console.log("avatar: ", data.avatar_url)
    }
  }, [])

  // uploadAvatarの後に、avatarUrlを変更させない
  useEffect(() => {
    getProfile()
  }, [getProfile])

  return (
    <Layout>
      <Center className='flex-col gap-3'>
        {isLoading && <Loader />}

        {avatarUrl && (
          <Indicator
            // inline
            label=''
            size={16}
            offset={7} // 内側に7
            color='green'
            position='bottom-end'
            withBorder // 外側の白
            processing // 主張激しくなる
          >
            <Avatar
              size='lg'
              radius='xl'
              className='transform duration-300 hover:scale-105'
              src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/avatars/${avatarUrl}`}
            />
          </Indicator>
        )}

        <label htmlFor='avatar'>
          <CameraIcon className='cursor-pointer h-10 w-10' />
        </label>
        <input
          type='file'
          id='avatar'
          accept='image/*'
          className='cursor-pointer file:text-white file:rounded-full hidden file:bg-purple-400 file:border-0 file:py-2 file:px-4'
          onChange={uploadAvatarImg}
        />
        <Button onClick={upsertProfile}>Upsert</Button>
        {/* <FileInput multiple onChange={e => console.log(e)} /> */}
      </Center>
    </Layout>
  )
}

export default AvatarDemo
