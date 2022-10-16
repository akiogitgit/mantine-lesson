import { useCallback } from "react"
import { useQuery } from "react-query"
import { Post } from "../types/post"
import { supabase } from "../utils/supabase"

type Props = {
  // tableName: string
  // options?: { order?: string; ascending?: boolean }
  order?: string
  ascending?: boolean
}

// これだと引数がオブジェクトになってしまう
export const useGetApi = <Data = any>(
  tableName: string,
  { order = "created_at", ascending = true }: Props,
) => {
  // export const useGetApi = <Data = any>({
  //   tableName,
  //   order = "*",
  //   ascending = true,
  // }: Props) => {
  // export const useGetApi = <Data = any>(
  //   tableName: string,
  //   options?: { order?:string,ascending?: boolean },
  // ) => {

  const getData = useCallback(async () => {
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .order(order, { ascending })
    // .order("created_at", { ascending: true })

    if (error) {
      throw new Error(error.message)
    }
    return data
  }, [ascending, order, tableName])

  return useQuery<Data[]>({
    queryKey: [tableName],
    queryFn: getData,
  })
}
