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
        <Stack spacing='md'>
          <div className='flex gap-3'>
            <TextInput
              label='First name'
              withAsterisk
              placeholder='Your first name'
            />
            <TextInput
              label='Last name'
              withAsterisk
              placeholder='Your Last name'
            />
          </div>
          <TextInput
            label='Email'
            withAsterisk
            placeholder='Your Last name'
            icon={<AtSymbolIcon className='h-5 w-5' />}
          />
          <PasswordInput
            label='Password'
            withAsterisk
            placeholder='Password'
            icon={<LockClosedIcon className='h-5 w-5' />}
          />
          <PasswordInput
            label='Confirm Password'
            withAsterisk
            placeholder='Confirm Password'
            icon={<LockClosedIcon className='h-5 w-5' />}
          />
          <div className='flex gap-3'>
            <Checkbox checked />
            <p className='text-xs'>
              I agree to sell my soul and privacy to this corporation
            </p>
          </div>
          <div className='flex justify-between items-center'>
            <p className='text-sm text-gray-400 hover:underline'>
              Have an account? Login
            </p>
            <Button>Register</Button>
          </div>
        </Stack>
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
