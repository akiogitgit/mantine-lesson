export type Post = {
  id: number
  created_at: string
  title: string
  content: string
  status: string //"new" | "pickup" | "hot"
  post_url: string
}
