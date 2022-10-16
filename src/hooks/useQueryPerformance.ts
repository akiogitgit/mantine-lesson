import { SupabaseRealtimePayload } from "@supabase/supabase-js"
import { useEffect } from "react"
import { useQuery, useQueryClient } from "react-query"
import { Performance } from "../types/performance"
import { supabase } from "../utils/supabase"

export const useQueryPerformance = () => {
  const queryClient = useQueryClient()

  // 更新・削除をリアルタイムで検知する
  // UPDATEは変わった要素を新しくキャッシュを更新する
  useEffect(() => {
    const subsc = supabase
      .from("performances")
      .on("UPDATE", (payload: SupabaseRealtimePayload<Performance>) => {
        queryClient.setQueryData(["performance"], {
          id: payload.new.id,
          created_at: payload.new.created_at,
          efficiency: payload.new.efficiency,
          comfort: payload.new.comfort,
          luck: payload.new.luck,
          durability: payload.new.durability,
          user_id: payload.new.user_id,
          level: payload.new.level,
        })
      })
      .on("DELETE", (payload: SupabaseRealtimePayload<Performance>) => {
        queryClient.setQueryData(["performance"], null)
      })
      .subscribe()

    const removeSubscription = async () => {
      await supabase.removeSubscription(subsc)
    }

    return () => {
      removeSubscription()
    }
  }, [queryClient])

  const getPeformance = async () => {
    const { data, error } = await supabase
      .from("performances")
      .select("*")
      .eq("user_id", supabase.auth.user()?.id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return data
  }

  return useQuery<Performance, Error>({
    queryKey: ["performance"],
    queryFn: getPeformance,
  })
}
