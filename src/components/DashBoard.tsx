import { ShieldCheckIcon } from "@heroicons/react/solid"
import { LogoutIcon } from "@heroicons/react/outline"
import {
  ActionIcon,
  AppShell,
  Box,
  Button,
  Center,
  Header,
  Menu,
  Navbar,
  Text,
} from "@mantine/core"
import { supabase } from "../utils/supabase"
import { Layout } from "../components/Layout"
import { FC, useCallback } from "react"
import {
  IconSettings,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconArrowsLeftRight,
  IconTrash,
} from "@tabler/icons"
import { NextLink } from "@mantine/next"
import { Settings } from "tabler-icons-react"

const menus = [
  "button",
  "group",
  "grid",
  "table",
  "form",
  "multi-select",
  "fetch-data",
  "dialog",
  "modal",
  "avatar",
  "card",
  "performance",
  "crypto",
  "notification",
  "hooks",
]

export const Dashboard = () => {
  const signOut = useCallback(() => {
    supabase.auth.signOut()
    console.log("signOut")
  }, [])

  return (
    <div>
      <Center>
        <div>
          <Menu trigger='hover' openDelay={100} closeDelay={400}>
            <Menu.Target>
              <Button>hover menu</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>UI Components</Menu.Label>
              {menus.map(path => (
                <Menu.Item
                  key={path}
                  component={NextLink}
                  href={`/${path}`}
                  icon={<Settings size={16} />}
                >
                  <Text transform='capitalize'>{path}</Text>
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </div>
        <div>
          <Menu>
            <Menu.Target>
              <Button>Toggle menu</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>UI Components</Menu.Label>
              {menus.map(path => (
                <Menu.Item
                  key={path}
                  component={NextLink}
                  href={`/${path}`}
                  icon={<IconMessageCircle size={16} />}
                >
                  <Text transform='capitalize'>{path}</Text>
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </div>

        <Button
          color='red'
          variant='gradient'
          gradient={{ from: "yellow", to: "red" }}
          rightIcon={<LogoutIcon className='h-5 w-5' />}
          onClick={signOut}
        >
          Logout
        </Button>
      </Center>
    </div>
  )
}
