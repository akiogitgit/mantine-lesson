import {
  Center,
  Checkbox,
  Container,
  Group,
  Input,
  MultiSelect,
  Radio,
  TextInput,
  Autocomplete,
  NativeSelect,
  NumberInput,
  PasswordInput,
  Select,
  SegmentedControl,
  Slider,
  Switch,
  TransferList,
  TransferListData,
} from "@mantine/core"
import { IconCheck, IconHeart, IconX } from "@tabler/icons"
import React, { useState } from "react"
import { Layout } from "../components/Layout"

const initialValues: TransferListData = [
  [
    { value: "react", label: "React" },
    { value: "next", label: "Next.js" },
    { value: "gatsby", label: "Gatsby.js" },
  ],
  [
    { value: "sv", label: "Svelte" },
    { value: "rw", label: "Redwood" },
    { value: "dj", label: "Django" },
  ],
]

const MultiSelectDemo = () => {
  const [inputValue, setInputValue] = useState("")
  const [radioValue, setRadioValue] = useState("react")
  const [checkValue, setCheckValue] = useState(false)
  const [selectValues, setSelectValues] = useState<string[]>()
  const [selectValue, setSelectValue] = useState("react")
  const [numberValue, setNumberValue] = useState(0)
  const [passwordValue, setPasswordValue] = useState("")
  const [rangeValue, setRangeValue] = useState(0)
  const [transferValues, setTransferValues] =
    useState<TransferListData>(initialValues)

  return (
    <Layout>
      <Container>
        <Center className='flex flex-col gap-10'>
          {/* useForm じゃないとダメ */}
          {/* <Input value={inputValue} onChange={setInputValue} />
          <TextInput value={inputValue} onChange={setInputValue} /> */}
          <Autocomplete
            label='Autocomplete'
            withAsterisk
            radius={22}
            data={["React", "Vue", "Angular", "Svelte"]}
            value={inputValue}
            onChange={setInputValue}
          />

          <Group>
            <Checkbox
              label='label'
              color='green'
              checked={checkValue}
              onChange={e => setCheckValue(e.currentTarget.checked)}
            />
            {checkValue ? "true" : "false"}

            <Switch
              onLabel='ON'
              offLabel='OFF'
              thumbIcon={
                checkValue ? (
                  <IconCheck size={12} color='blue' stroke={3} />
                ) : (
                  <IconX size={12} color='red' stroke={3} />
                )
              }
              checked={checkValue}
              onChange={e => setCheckValue(e.currentTarget.checked)}
            />
          </Group>

          <div>
            <NativeSelect
              label='NativeSelect'
              data={["React", "Vue", "Angular", "Svelte"]}
              value={selectValue}
              onChange={e => setSelectValue(e.currentTarget.value)}
            />
            {selectValue}
          </div>

          <div>
            <Select
              label='Select'
              data={["React", "Vue", "Angular", "Svelte"]}
              value={selectValue}
              onChange={(e: string) => setSelectValue(e)}
            />
            {selectValue}
          </div>

          <div>
            <MultiSelect
              label='MultiSelect'
              clearable
              data={[
                { value: "react", label: "React" },
                { value: "svelte", label: "Svelte" },
                { value: "vue", label: "Vue" },
              ]}
              value={selectValues}
              onChange={setSelectValues}
            />
            <Switch.Group value={selectValues} onChange={setSelectValues}>
              <Switch value='react' label='React' />
              <Switch value='svelte' label='Svelte' />
            </Switch.Group>
            {JSON.stringify(selectValues)}
          </div>

          <NumberInput
            label='NumberInput'
            description={numberValue}
            withAsterisk
            max={120}
            min={-20}
            step={5}
            value={numberValue}
            onChange={(e: number) => setNumberValue(e)}
          />

          <PasswordInput
            label='PasswordInput'
            description={passwordValue}
            value={passwordValue}
            onChange={e => setPasswordValue(e.target.value)}
          />

          <Radio.Group
            label='What is your most favorite frontend library ?'
            description={radioValue}
            required
            withAsterisk
            value={radioValue}
            onChange={setRadioValue}
          >
            <Radio label='React' value='react' />
            <Radio label='Svelte' value='svelte' />
            <Radio label='Angular' value='ng' />
            <Radio label='Vue' value='vue' />
          </Radio.Group>

          <SegmentedControl
            data={[
              { label: "React", value: "react" },
              { label: "Svelte", value: "svelte" },
              { label: "Angular", value: "ng" },
              { label: "Vue", value: "vue" },
            ]}
            color='blue'
            radius='lg'
            size='md'
            value={radioValue}
            onChange={setRadioValue}
          />

          <div>
            <Slider
              className='w-200px'
              label={v => `${v}℃`}
              marks={[
                { value: 20, label: "20%" },
                { value: 50, label: "50%" },
                { value: 80, label: "80%" },
              ]}
              step={10}
              thumbChildren={<IconHeart size={16} />}
              thumbSize={26}
              color='orange'
              value={rangeValue}
              onChange={setRangeValue}
            />
            {rangeValue}
          </div>

          <div>
            <TransferList
              titles={["TransferList", "TransferList"]}
              breakpoint='xs'
              value={transferValues}
              onChange={setTransferValues}
            />
            {JSON.stringify(transferValues)}
          </div>
        </Center>
      </Container>
    </Layout>
  )
}

export default MultiSelectDemo
