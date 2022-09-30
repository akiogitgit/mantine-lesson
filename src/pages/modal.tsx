import {
  Button,
  Center,
  Checkbox,
  Modal,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core"
import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/solid"
import { ModalForm } from "../components/ModalForm"

const ModalDemo = () => {
  const [opened, setOpened] = useState(false)
  const [openedFullscreenModal, setOpenedFullscreenModal] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setOpened(true)
    }, 1500)
  }, [])

  return (
    <Layout>
      <Center>
        <Button onClick={() => setOpened(!opened)}>Modal</Button>
      </Center>
      <Modal
        title='Introduce yourself!'
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <ModalForm />
      </Modal>

      <Modal
        fullScreen
        opened={openedFullscreenModal}
        onClose={() => setOpenedFullscreenModal(false)}
      >
        Modal! press escape or click on overlay to close
      </Modal>

      <Center>
        <Button
          onClick={() => setOpenedFullscreenModal(!openedFullscreenModal)}
        >
          FullScreenModal
        </Button>
      </Center>
    </Layout>
  )
}

export default ModalDemo
