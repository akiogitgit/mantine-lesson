import { useCallback } from "react"
import { useQueryClient } from "react-query"
import { Post } from "../types/post"
import { supabase } from "../utils/supabase"

export const useApiSupabase = () => {
  const queryClient = useQueryClient()

  const insertDB = useCallback(
    async <Data = any>(from: string, insertParams: any) => {
      const { data, error } = await supabase.from(from).insert(insertParams)

      if (error) {
        throw new Error(error.message)
      }
      const cacheData = queryClient.getQueryData<Data[]>([from])

      if (cacheData) {
        queryClient.setQueriesData([from], [...cacheData, data[0]])
      }
    },
    [queryClient],
  )
  return { insertDB }
}
