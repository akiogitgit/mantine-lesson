import { ShieldCheckIcon } from "@heroicons/react/solid"
import { ExclamationCircleIcon } from "@heroicons/react/outline"
import {
  Alert,
  Autocomplete,
  Button,
  Center,
  NumberInput,
  PasswordInput,
  TextInput,
} from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { FC, useCallback, useState } from "react"
import * as Yup from "yup"
import { Form } from "../types/form"
import { supabase } from "../utils/supabase"

// formのvalidation string, email required, min, max, length
// ()の中にエラーメッセージ出す
const schema = Yup.object().shape({
  // emailのフォーマットでないなら、Invalid email
  email: Yup.string()
    .email("Emailのフォーマットで入力して下さい")
    .required("Emailは必須項目です"),
  password: Yup.string()
    .required("パスワードは必須項目です") // 必須
    .min(8, "パスワードは8文字以上で入力して下さい") // 8文字以上
    .matches(/[a-z]+/, "小文字のアルファベットを一文字以上必要です") // 小文字１つ含む
    .matches(/[A-Z]+/, "大文字のアルファベットを一文字以上必要です")
    .matches(/[@$!%+#?&]+/, "特殊文字が一文字以上必要です"),
  age: Yup.number().min(15, "15歳未満は登録できません"),
})

export const Auth: FC = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState("")

  // schema で外部ライブラリのvalidationを入れる
  // useForm と Yup は @mantine/form@4.2.5 じゃないとダメ
  const form = useForm<Form>({
    schema: yupResolver(schema),
    initialValues: {
      email: "",
      password: "",
      age: 15,
    },
  })

  const onSubmit = useCallback(async () => {
    console.log("submit!")
    // 新規作成
    if (isRegister) {
      try {
        const { error } = await supabase.auth.signUp({
          email: form.values.email,
          password: form.values.password,
        })

        if (error) {
          setError(error.message)
        }
      } catch (e) {
        console.error(e)
      }
      form.reset() // reset
    } else {
      // ログイン

      const { error } = await supabase.auth.signIn({
        email: form.values.email,
        password: form.values.password,
      })
      if (error) {
        setError(error.message)
      }
      form.reset()
    }
  }, [form, isRegister])

  // tailwind を使うなら、MantineのLayoutコンポーネント使わない

  return (
    <div className='min-w-100px max-w-400px'>
      <div className='flex flex-col justify-center items-center'>
        {/* <Center> */}
        <ShieldCheckIcon className='h-16 text-blue-500 w-16' />
        {error && (
          <Alert
            mt='md'
            icon={<ExclamationCircleIcon className='text-pink-500' />}
            title='Authorization Error'
            color='red'
            radius='md'
          >
            {error}
          </Alert>
        )}
      </div>

      {/* form(定義したやつ)をsubmitする時onSubmitを発火 */}
      <form onSubmit={form.onSubmit(onSubmit)}>
        <div className='flex flex-col gap-3'>
          {/* <TextInput
            withAsterisk
            // type='email' これ付けるとYup出来ぬ
            label='Email'
            placeholder='example@gmail.com'
            {...form.getInputProps("email")}
          /> */}
          <Autocomplete
            label='Email'
            placeholder='example@gmail.com'
            data={
              form.values.email.length > 0 && !form.values.email.includes("@")
                ? ["gmail.com", "outlook.com", "yahoo.com", "icloud.com"].map(
                    provider => `${form.values.email}@${provider}`,
                  )
                : [""]
            }
            {...form.getInputProps("email")}
          />
          <PasswordInput
            withAsterisk
            label='パスワード'
            description='8文字以上で入力して下さい'
            {...form.getInputProps("password")}
          />
          {isRegister && (
            <NumberInput
              withAsterisk
              // min={15}
              // max={130}
              label='年齢'
              description='15歳以上で入力して下さい'
              placeholder=''
              {...form.getInputProps("age")}
            />
          )}
          <div className='flex justify-between'>
            <p
              className='text-sm'
              onClick={() => {
                setIsRegister(!isRegister)
                setError("")
                form.reset()
              }}
            >
              {isRegister ? "ログイン" : "新規登録"}は
              <span className='cursor-pointer text-blue-500'>こちら</span>
            </p>
            <Button mt='md' variant='gradient' type='submit'>
              {isRegister ? "新規登録" : "ログイン"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
