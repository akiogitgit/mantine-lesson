import { ChangeEvent, useState, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  Avatar,
  Button,
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

  const uploadAvatarImg = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      console.log("file: ", e, e.target.files)
      if (!e.target.files || !e.target.files.length) {
        throw new Error("Please select the image file")
      }
      const file = e.target.files[0]
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random()}.${fileExt}`
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
      <div>Avatar</div>
      {isLoading && <Loader />}
      <label htmlFor='avatar'>avatar</label>
      <input
        type='file'
        id='avatar'
        accept='image/*'
        className='cursor-pointer file:text-white file:rounded-full file:bg-purple-400 file:border-0 file:py-2 file:px-4'
        onChange={uploadAvatarImg}
      />
      <Button onClick={upsertProfile}>Upsert</Button>
      <Button color='cyan' onClick={getProfile}>
        getAvatar
      </Button>

      <Indicator
        inline
        label=''
        size={16}
        offset={7}
        position='bottom-end'
        withBorder
      >
        <Avatar
          size='lg'
          src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
        />
      </Indicator>
      {avatarUrl && (
        <>
          <div>{avatarUrl}</div>

          <Indicator
            inline
            label=''
            size={16}
            offset={7}
            position='bottom-end'
            withBorder
          >
            <Avatar
              size='lg'
              src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/avatars/${avatarUrl}`}
            />
          </Indicator>
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/avatars/${avatarUrl}`}
            width={50}
            height={50}
            alt=''
          />
        </>
      )}
      {/* <FileInput multiple onChange={e => uploadAvatarImg(e)} /> */}
      {/* <FileInput multiple onChange={e => console.log(e)} /> */}
    </Layout>
  )
}

export default AvatarDemo
