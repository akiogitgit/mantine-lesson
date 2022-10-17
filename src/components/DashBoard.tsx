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
              {[
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
              ].map(path => (
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
              <Menu.Label>Application</Menu.Label>
              <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
              <Menu.Item icon={<IconMessageCircle size={14} />}>
                Messages
              </Menu.Item>
              <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
              <Menu.Item
                icon={<IconSearch size={14} />}
                rightSection={<IconArrowsLeftRight size={14} />}
              >
                Search
              </Menu.Item>
              <Menu.Divider />
              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
                Transfer my data
              </Menu.Item>
              ,
              <Menu.Item color='red' icon={<IconTrash size={14} />}>
                Delete my account
              </Menu.Item>
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
