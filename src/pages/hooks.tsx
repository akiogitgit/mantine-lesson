import { Layout } from "../components/Layout"
import { Blockquote, BrandGithub } from "tabler-icons-react"
import { useDisclosure, useHover, useInterval, useToggle } from "@mantine/hooks"
import {
  Button,
  Dialog,
  Group,
  Kbd,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { useCallback, useEffect, useState } from "react"

const Hooks = () => {
  const [opened, setOpened] = useDisclosure(false, {
    onOpen: () => console.log("open"),
    onClose: () => console.log("close"),
  })
  const [buttonColor, toggleButtonColor] = useToggle(["teal", "pink"])

  const [seconds, setSeconds] = useState(0)
  const interval = useInterval(() => setSeconds(s => s + 1), 100)
  useEffect(() => {
    interval.start()
    return interval.stop
  }, [])

  const handleFizzBuzz = useCallback((num: number): number | string => {
    if (num % 15 === 0) return "FizzBuzz"
    if (num % 3 === 0) return "Fizz"
    if (num % 5 === 0) return "Buzz"
    return num
  }, [])

  const { hovered, ref: hoveredRef } = useHover()

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
        <Kbd>{handleFizzBuzz(seconds)}</Kbd>
        <Button
          onClick={interval.toggle}
          color={interval.active ? "red" : "teal"}
          variant='outline'
        >
          {interval.active ? "Stop" : "Start"} counting
        </Button>

        <Paper shadow='lg' p='xl' ref={hoveredRef}>
          {hovered ? "hover!" : "put mouse..."}
        </Paper>
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
