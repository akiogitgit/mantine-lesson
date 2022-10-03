import { useQuery } from "react-query"
import { supabase } from "../utils/supabase"
import { Post } from "../types/post"
import { useCallback } from "react"

export const UseQueryPosts = () => {
  const getPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: true })

    if (error) {
      throw new Error(error.message)
    }
    return data
  }, [])
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  })

  const insertPost = useCallback(async () => {}, [])

  return { getPosts }
}
