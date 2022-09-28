import type { AppProps } from "next/app"
import "windi.css"
import { MantineProvider } from "@mantine/core"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

// reqct-query の設定。
// fetchが失敗しても、retryしない
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

// MantineProvider の colorSchemeをダークモードに
// 全体のfontを変更

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          // colorScheme: "dark",
          fontFamily: "Verdana, sans-serif",
        }}
      >
        <Component {...pageProps} />
        <ReactQueryDevtools></ReactQueryDevtools>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default MyApp
