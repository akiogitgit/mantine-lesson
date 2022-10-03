export type Post = {
  id: number
  created_at: string
  title: string
  content: string
  status: "new" | "pickup" | "hot"
  post_url: string
}
