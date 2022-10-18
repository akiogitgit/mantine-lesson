import { Layout } from "../components/Layout"
import { Blockquote, BrandGithub } from "tabler-icons-react"
import {
  useDisclosure,
  useHover,
  useIdle,
  useInterval,
  useMouse,
  useMove,
  useToggle,
} from "@mantine/hooks"
import {
  Avatar,
  Button,
  Dialog,
  Group,
  Indicator,
  Kbd,
  Paper,
  Stack,
  Text,
  Code,
  TextInput,
  Progress,
  Collapse,
  Loader,
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
  const idle = useIdle(1000) // ユーザーが1秒何もしなければtrue
  const idle2 = useIdle(1000, { events: ["click", "touchstart"] }) // ユーザーが1秒クリックしないとtrue

  const { ref: mouseRef, x: mouseX, y: mouseY } = useMouse()

  const [moveValue, setMoveValue] = useState({ x: 0.2, y: 0.6 })
  const { ref: moveRef, active } = useMove(setMoveValue)

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
        <Indicator
          label='move'
          size={16}
          offset={7}
          position='bottom-end'
          color={idle ? "red" : "green"}
          withBorder
        >
          <Avatar
            size='lg'
            src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/avatars/0.10945995604803072.jfif`}
          />
        </Indicator>
        <Indicator
          label='click'
          size={16}
          offset={7}
          position='bottom-end'
          color={idle2 ? "red" : "green"}
          withBorder
        >
          <Avatar
            size='lg'
            src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/avatars/0.8507517698515727.png`}
          />
        </Indicator>

        <div ref={mouseRef} className='bg-emerald-100 h-180px w-300px relative'>
          <p className='m-auto h-30px top-0 right-0 bottom-0 left-0 w-120px absolute'>
            x: {mouseX}, y: {mouseY}
          </p>
        </div>

        <div ref={moveRef} className='bg-gray-100 h-120px w-400px relative'>
          <BrandGithub
            className={`cursor-pointer h-6 text-pink-700 w-6 absolute`}
            style={{
              left: `calc(${moveValue.x * 100}% - 12px)`,
              top: `calc(${moveValue.y * 100}% - 12px)`,
            }}
          />
        </div>
        <Text>
          Values{" "}
          <Code>{`{ x: ${Math.round(moveValue.x * 100)}, y: ${Math.round(
            moveValue.y * 100,
          )} }`}</Code>
        </Text>

        <Collapse in={active}>
          <Loader variant='bars' size='lg' color='pink' />
        </Collapse>
        <div>
          <Progress
            my='md'
            className='w-80'
            color='teal'
            radius='lg'
            value={moveValue.x * 100}
            animate
          />
          <Progress
            my='md'
            className='w-80'
            color='red'
            radius='lg'
            value={moveValue.y * 100}
            animate
          />
        </div>
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
