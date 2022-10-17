import { Layout } from "../components/Layout"
import { BrandGithub } from "tabler-icons-react"
import { useDisclosure, useToggle } from "@mantine/hooks"
import { Button, Dialog, Group, Stack, Text, TextInput } from "@mantine/core"
import { showNotification } from "@mantine/notifications"

const Hooks = () => {
  const [opened, setOpened] = useDisclosure(false, {
    onOpen: () => console.log("open"),
    onClose: () => console.log("close"),
  })
  const [buttonColor, toggleButtonColor] = useToggle(["teal", "pink"])

  return (
    <Layout>
      <Stack align='center'>
        <Button onClick={setOpened.toggle}>Toggle dialog</Button>
        <Button color='teal' onClick={setOpened.open}>
          Open dialog
        </Button>
        <Button color='orange' onClick={setOpened.close}>
          Close dialog
        </Button>
        <Button color={buttonColor} onClick={() => toggleButtonColor()}>
          Toggle Color
        </Button>
      </Stack>
      <Dialog
        opened={opened}
        withCloseButton
        onClose={setOpened.close}
        size='lg'
        radius='md'
      >
        <Text size='sm' mb='md'>
          Subscripbe to email nowsletter
        </Text>
        <Group>
          <TextInput placeholder='example@mail.com' className='flex-1' />
          <Button onClick={setOpened.close}>Subscribe</Button>
        </Group>
      </Dialog>
    </Layout>
  )
}

export default Hooks
