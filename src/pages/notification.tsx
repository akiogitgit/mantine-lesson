import { Avatar, Button, Stack } from "@mantine/core"
import { Layout } from "../components/Layout"
import {
  showNotification,
  updateNotification,
  cleanNotificationsQueue,
  cleanNotifications,
} from "@mantine/notifications"
import { Check, X } from "tabler-icons-react"
import { supabase } from "../utils/supabase"

const NotificationDemo = () => {
  // showNotificationは、coreのNotification
  // updateNotificationで、してしたidのバナーを更新

  return (
    <Layout>
      <Stack align='center'>
        <Button
          onClick={() => {
            showNotification({
              title: "Default notification",
              message: "Hey there!",
              autoClose: false,
            })
          }}
        >
          Notification 1
        </Button>
        <Button
          onClick={() => {
            showNotification({
              loading: true,
              title: "Default notification",
              message: "Hey there!",
              autoClose: false,
            })
          }}
        >
          Notification 2
        </Button>
        <Button
          onClick={() => {
            showNotification({
              title: "Automatic test failed",
              message: "Test failed...",
              icon: <X size={18} />,
              color: "red",
              autoClose: false,
            })
          }}
        >
          Notification 3
        </Button>
        <Button
          onClick={() => {
            showNotification({
              id: "load-data",
              loading: true,
              title: "Loading your data",
              message: "Data will be loaded in 3 seconds, you cannot this yet",
              color: "red",
              autoClose: false,
              disallowClose: true,
            })

            setTimeout(() => {
              updateNotification({
                id: "load-data",
                title: "Data was loaded",
                message:
                  "Notification will close in 2 seconds, you can close this notification now",
                icon: <Check />,
                autoClose: 2000,
              })
            }, 3000)
          }}
        >
          Notification 4
        </Button>
        <Button
          onClick={async () => {
            showNotification({
              id: "load-profile",
              loading: true,
              title: "Loading your profile",
              message: "Please wait for a while",
              autoClose: false,
              disallowClose: true,
            })
            const { data, error, status } = await supabase
              .from("profiles")
              .select("avatar_url")
              .eq("id", supabase.auth.user()?.id)
              .single()
            if (error && status !== 406) {
              throw new Error(error.message)
            }

            if (data) {
              setTimeout(() => {
                updateNotification({
                  id: "load-profile",
                  color: "teal",
                  title: "Your profile was loaded",
                  message:
                    "Notification will close in 2 seconds, you can close this notification now",
                  icon: (
                    <Avatar
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/avatars/${data.avatar_url}`}
                    />
                  ),
                })
              }, 1000)
            }
          }}
        >
          Notification 5
        </Button>

        {/* queue:  max個数以上のNotificationを消す */}
        {/* all: 全て消す */}
        <Button color='gray' onClick={() => cleanNotificationsQueue()}>
          Clean queue
        </Button>
        <Button color='yellow' onClick={() => cleanNotifications()}>
          Clean all
        </Button>
      </Stack>
    </Layout>
  )
}

export default NotificationDemo
