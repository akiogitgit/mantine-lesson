import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/solid"
import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Checkbox,
  Dialog,
  Loader,
  Center,
  LoadingOverlay,
} from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
// import { MantineTransition } from "@mantine/core/lib/Transition"
import { MantineTransition } from "../types/mantineTransition"

import React, { FC, useCallback, useState } from "react"
import { ModalFormParams } from "../types/form"
import * as Yup from "yup"

const schema = Yup.object().shape({
  firstName: Yup.string().required("No first name provided"),
  lastName: Yup.string().required("No first name provided"),
  email: Yup.string().email("Invalid email").required("No email provided"),
  password: Yup.string()
    .min(6, "Password should be min 6 chars")
    .required("No password provided"),
  confirmPassword: Yup.string()
    .required("No confirm password provided")
    .oneOf([Yup.ref("password")], "Password does not match"),
  isAgree: Yup.boolean().required(),
})

export const ModalForm: FC = () => {
  const [isOpenedDialog, setIsOpenedDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ModalFormParams>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      isAgree: true,
    },
    schema: yupResolver(schema),
    // validate: {
    //   firstName: (v: string) => (v === "" ? "invalid firstName" : null),
    //   lastName: (v: string) => (v === "" ? "invalid lastName" : null),
    //   email: (v: string) => (/^\S+@\S+$/.test(v) ? null : "Invalid email"),
    //   password: (v: string) =>
    //     v.length < 6 ? "Password must have at least 6 letters" : null,
    //   confirmPassword: (v: string) =>
    //     v !== form.values.password
    //       ? "Password and ConfirmPassword are different"
    //       : null,
    // },
  })

  const dialogs: {
    transition: MantineTransition
    position: { top?: number; left?: number; right?: number; bottom?: number }
  }[] = [
    { transition: "slide-down", position: { top: 20, left: 20 } },
    { transition: "slide-left", position: { top: 20, right: 20 } },
    { transition: "slide-up", position: { bottom: 20, left: 20 } },
    { transition: "slide-right", position: { bottom: 20, right: 20 } },
  ]

  const onSubmit = useCallback(() => {
    console.log(form.values)
    setIsLoading(true)
    setIsOpenedDialog(false)
    setTimeout(() => {
      setIsLoading(false)
      setIsOpenedDialog(true)
    }, 1500)
  }, [form])

  return (
    <>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <LoadingOverlay
          loaderProps={{ size: "md", color: "blue", variant: "oval" }}
          overlayOpacity={0.5}
          overlayColor='#c5c5c5'
          visible={isLoading}
        />

        <Stack spacing='md'>
          <div className='flex gap-3'>
            <TextInput
              label='First name'
              withAsterisk
              placeholder='Your first name'
              {...form.getInputProps("firstName")}
            />
            <TextInput
              label='Last name'
              withAsterisk
              placeholder='Your Last name'
              {...form.getInputProps("lastName")}
            />
          </div>
          <TextInput
            label='Email'
            withAsterisk
            placeholder='Your Last name'
            icon={<AtSymbolIcon className='h-5 w-5' />}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label='Password'
            withAsterisk
            placeholder='Password'
            icon={<LockClosedIcon className='h-5 w-5' />}
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label='Confirm Password'
            withAsterisk
            placeholder='Confirm Password'
            icon={<LockClosedIcon className='h-5 w-5' />}
            {...form.getInputProps("confirmPassword")}
          />
          <Checkbox
            classNames={{
              label: "text-gray-500 text-xs",
            }}
            label='I agree to sell my soul and privacy to this corporation'
            checked={form.values.isAgree}
            {...form.getInputProps("isAgree")}
          />
          <div className='flex justify-between items-center'>
            <p className='cursor-pointer text-sm text-gray-400 hover:underline'>
              Have an account? Login
            </p>
            <Button type='submit'>Register</Button>
          </div>
        </Stack>
        {/* {isLoading ? (
          <Center my={180}>
            <Loader />
          </Center>
        ) : (
          <Stack spacing='md'>
            <div className='flex gap-3'>
              <TextInput
                label='First name'
                withAsterisk
                placeholder='Your first name'
                {...form.getInputProps("firstName")}
              />
              <TextInput
                label='Last name'
                withAsterisk
                placeholder='Your Last name'
                {...form.getInputProps("lastName")}
              />
            </div>
            <TextInput
              label='Email'
              withAsterisk
              placeholder='Your Last name'
              icon={<AtSymbolIcon className='h-5 w-5' />}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label='Password'
              withAsterisk
              placeholder='Password'
              icon={<LockClosedIcon className='h-5 w-5' />}
              {...form.getInputProps("password")}
            />
            <PasswordInput
              label='Confirm Password'
              withAsterisk
              placeholder='Confirm Password'
              icon={<LockClosedIcon className='h-5 w-5' />}
              {...form.getInputProps("confirmPassword")}
            />
            <Checkbox
              classNames={{
                label: "text-gray-500 text-xs",
              }}
              label='I agree to sell my soul and privacy to this corporation'
              checked={form.values.isAgree}
              {...form.getInputProps("isAgree")}
            />
            <div className='flex justify-between items-center'>
              <p className='cursor-pointer text-sm text-gray-400 hover:underline'>
                Have an account? Login
              </p>
              <Button type='submit'>Register</Button>
            </div>
          </Stack>
        )} */}
      </form>

      {dialogs.map((dialog, index) => (
        <Dialog
          key={dialog.transition}
          withCloseButton
          transition={dialog.transition}
          transitionDuration={1000 * (index + 1)}
          position={dialog.position}
          opened={isOpenedDialog}
          onClose={() => setIsOpenedDialog(false)}
        >
          <p>firstName: {form.values.firstName}</p>
          <p>lastName: {form.values.lastName}</p>
          <p>email: {form.values.email}</p>
          <p>password: {form.values.password}</p>
          <p>isAgree: {form.values.isAgree ? "true" : "false"}</p>
        </Dialog>
      ))}
    </>
  )
}
