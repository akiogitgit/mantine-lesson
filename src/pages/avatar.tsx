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
  }, [avatarUrl])

  const getProfile = useCallback(async () => {
    const { data, error, status } = await supabase
      .from("profiles")
      .select("avatar_url") // profilesテーブルのavatar_urlカラム
      .eq("id", supabase.auth.user()?.id) // ログインしているuser.idと同じ
      .single() // １つ

    // profile無いなら、406でエラーを投げない
    if (error && status !== 400) {
      throw new Error(error.message)
    }
    if (data) {
      setAvatarUrl(data.avatar_url)
      console.log("avatar: ", data.avatar_url)
    }
  }, [])

  // useEffect(() => {
  getProfile()
  // }, [])

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
      {avatarUrl && (
        <>
          <div>{avatarUrl}</div>
          <Image src={avatarUrl} width={50} height={50} alt='' />
        </>
      )}
      {/* <FileInput multiple onChange={e => uploadAvatarImg(e)} /> */}
      {/* <FileInput multiple onChange={e => console.log(e)} /> */}
    </Layout>
  )
}

export default AvatarDemo
