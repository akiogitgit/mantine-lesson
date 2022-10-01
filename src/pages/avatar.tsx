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

const AvatarDemo = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState("")

  const uploadAvatarImg = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      console.log(e)
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("Please select the image file")
      }
      const file = e.target.files[0]
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random()}.${fileExt}`
      setIsLoading(true)
      const { error } = await supabase.storage
        .from("avatars")
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
      setIsLoading(false)
    }
  }, [avatarUrl])

  return (
    <Layout>
      <div>Avatar</div>
      <input type='file' name='' id='' onChange={uploadAvatarImg} />
      {/* <FileInput multiple onChange={e => uploadAvatarImg(e)} /> */}
      <FileInput multiple onChange={e => console.log(e)} />
    </Layout>
  )
}

export default AvatarDemo
