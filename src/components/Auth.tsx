import {
  Button,
  Group,
  NumberInput,
  PasswordInput,
  TextInput,
} from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { FC, useState } from "react"
import * as Yup from "yup"
import { Form } from "../types/form"

// formのvalidation string, email required, min, max, length
// ()の中にエラーメッセージ出す
const schema = Yup.object().shape({
  // emailのフォーマットでないなら、Invalid email
  email: Yup.string().email("Invalid email").required("No email provided."),
  password: Yup.string()
    .required("No password provided") // 必須
    .min(8, "Password should be min 8 chars") // 8文字以上
    .matches(/[a-z]+/, "One lowercase char missing") // 小文字１つ含む
    .matches(/[A-Z]+/, "One uppercase char missing")
    .matches(/[@$!%+#?&]+/, "One special char missing"),
  age: Yup.number().min(15, "Only over 15 for new account"),
})

export const Auth: FC = () => {
  const [isregister, setIsregister] = useState(false)
  const [error, setError] = useState("")

  // schema で外部ライブラリのvalidationを入れる
  const form = useForm<Form>({
    schema: yupResolver(schema),
    initialValues: {
      email: "",
      password: "",
      age: 15,
    },
  })

  // tailwind を使うなら、MantineのLayoutコンポーネント使わない

  return (
    <div className='min-w-100px max-w-400px'>
      <form>
        <TextInput type='email' label='Email' />
        <PasswordInput label='パスワード' description='' />
        <NumberInput min={15} max={130} label='age' />
        <div className='flex justify-end'>
          <Button
            variant='outline'
            className='duration-300 hover:(bg-blue-500 text-white) '
            type='submit'
          >
            ログイン
          </Button>
        </div>
      </form>
    </div>
  )
}
