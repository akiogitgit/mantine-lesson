import { useCallback } from "react"
import { useQueryClient } from "react-query"
import { Post } from "../types/post"
import { supabase } from "../utils/supabase"

export const useDB = () => {
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

  const upsertDB = useCallback(
    async <Data = any>(from: string, insertParams: any) => {
      const { data, error } = await supabase.from(from).upsert(insertParams)

      if (error) {
        throw new Error(error.message)
      }

      // insert, updateで変わる これはupdateでいいのでは？
      // const cacheData = queryClient.getQueryData<Data[]>([from])
      // if (cacheData) {
      //   queryClient.setQueriesData([from], [...cacheData, data[0]])
      // }
    },
    [],
  )

  const deleteDB = useCallback(
    async <Data = any>(
      from: string,
      { column = "id", value }: { column?: string; value: any },
    ) => {
      const { data, error } = await supabase
        .from(from)
        .delete()
        .eq(column, value)

      if (error) {
        throw new Error(error.message)
      }

      // filter出来る？
      // const cacheData = queryClient.getQueryData<Data[]>([from])

      // if (cacheData) {
      //   queryClient.setQueriesData([from], [...cacheData, data[0]])
      // }
    },
    [],
  )

  return { insertDB, upsertDB, deleteDB }
}
