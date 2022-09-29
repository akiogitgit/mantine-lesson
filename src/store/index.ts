import create from "zustand"
import { Session } from "@supabase/supabase-js"

type State = {
  session: Session | null
  setSession: (payload: Session | null) => void
  count: number
  setCount: (v: number) => void
}

// zustand 状態管理ライブラリ
// session, setSessionは 管理する State
// 呼び時は const session = useStore(s=>s.session)

const useStore = create<State>(set => ({
  session: null,
  setSession: payload => set({ session: payload }),
  count: 0,
  setCount: v => set({ count: v }),
}))

export default useStore
