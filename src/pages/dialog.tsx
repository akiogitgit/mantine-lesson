import { Layout } from "../components/Layout"
import { Button, Center, Dialog } from "@mantine/core"

import { NextPage } from "next"
import { useEffect, useState } from "react"

const DialogDemo: NextPage = () => {
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setOpened(true)
    }, 1500)
  }, [])

  return (
    <Layout>
      <div>
        <Center>
          <Button onClick={() => setOpened(!opened)}>open</Button>
        </Center>

        <Dialog
          opened={opened}
          transition='slide-down'
          transitionDuration={1000}
          radius='lg'
          shadow='xl'
          size='xl'
          position={{ top: 60, left: 20 }}
        >
          <p>top: 60, left: 20</p>
        </Dialog>
        <Dialog
          opened={opened}
          transition='slide-up'
          transitionDuration={750}
          position={{ top: 60, right: 20 }}
        >
          <p>top: 60, right: 20</p>
        </Dialog>
        <Dialog
          opened={opened}
          transition='slide-right'
          transitionDuration={500}
          position={{ bottom: 20, left: 20 }}
        >
          <p>bottom: 20, left: 50</p>
        </Dialog>

        <Dialog
          opened={opened}
          withCloseButton
          onClose={() => setOpened(false)}
          size='lg'
          radius='md'
        >
          <p>Dialog default position</p>
        </Dialog>
      </div>
    </Layout>
  )
}

export default DialogDemo
