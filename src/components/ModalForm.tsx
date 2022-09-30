import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/solid"
import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Checkbox,
  Dialog,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import React, { FC, useCallback, useState } from "react"
import { ModalFormParams } from "../types/form"

export const ModalForm: FC = () => {
  const [isOpenedDialog, setIsOpenedDialog] = useState(false)
  const form = useForm<ModalFormParams>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      isAgree: true,
    },
    validate: {
      firstName: (v: string) => (v === "" ? "invalid firstName" : null),
      lastName: (v: string) => (v === "" ? "invalid lastName" : null),
      email: (v: string) => (/^\S+@\S+$/.test(v) ? null : "Invalid email"),
      password: (v: string) =>
        v.length < 6 ? "Password must have at least 6 letters" : null,
      confirmPassword: (v: string) =>
        v !== form.values.password
          ? "Password and ConfirmPassword are different"
          : null,
    },
  })

  const onSubmit = useCallback(() => {
    console.log(form.values)
    setIsOpenedDialog(true)
  }, [form.values])

  return (
    <>
      <form onSubmit={form.onSubmit(onSubmit)}>
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
      </form>

      <Dialog
        opened={isOpenedDialog}
        withCloseButton
        transition='slide-up'
        transitionDuration={5000}
        onClose={() => setIsOpenedDialog(false)}
      >
        <p>firstName: {form.values.firstName}</p>
        <p>lastName: {form.values.lastName}</p>
        <p>email: {form.values.email}</p>
        <p>password: {form.values.password}</p>
        <p>isAgree: {form.values.isAgree ? "true" : "false"}</p>
      </Dialog>
    </>
  )
}
