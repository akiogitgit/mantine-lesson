import React, { useCallback, useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import {
  GitBranch,
  GitPullRequest,
  GitCommit,
  MessageDots,
} from "tabler-icons-react"
import { useQueryPerformance } from "../hooks/useQueryPerformance"
import { supabase } from "../utils/supabase"
import {
  Timeline,
  Text,
  Grid,
  Center,
  RingProgress,
  Space,
  Slider,
} from "@mantine/core"
import { Performance } from "../types/performance"

const Performance = () => {
  const { data } = useQueryPerformance()
  const [level, setLevel] = useState<number | undefined>(0)
  const [efficiency, setEfficiency] = useState<number | undefined>(0)
  const [durability, setDurability] = useState<number | undefined>(0)
  const [comfort, setComfort] = useState<number | undefined>(0)
  const [luck, setLuck] = useState<number | undefined>(0)

  useEffect(() => {
    setEfficiency(data?.efficiency)
    setLevel(data?.level)
    setDurability(data?.durability)
    setComfort(data?.comfort)
    setLuck(data?.luck)
  }, [data])

  const updateHandler = useCallback(
    async (
      value: number,
      key: keyof Omit<Performance, "id" | "user_id" | "created_at">,
    ) => {
      await supabase
        .from("performances")
        .update({ [key]: value })
        .eq("user_id", supabase.auth.user()?.id)
      console.log(value)
    },
    [],
  )

  // const a = [...Array(10)].map((v, i) => {
  //   return { value: i * 10, label: i * 10 }
  // })
  // console.log(a)

  return (
    <Layout>
      <p>{level}</p>
      {data && (
        <Center className='flex-col'>
          <Timeline active={data.level - 1} bulletSize={24} lineWidth={2}>
            <Timeline.Item bullet={<GitBranch size={12} />} title='Level 1'>
              <Text color='dimmed' size='sm'>
                <Text
                  variant='link'
                  size='sm'
                  component='a'
                  target='_blank'
                  href='https://reactjs.org/docs/hooks-intro.html'
                >
                  React Hooks
                </Text>
                understand the basic usage of React Hooks
              </Text>
            </Timeline.Item>

            <Timeline.Item bullet={<GitCommit size={12} />} title='Commits'>
              <Text color='dimmed' size='sm'>
                You&apos;ve pushed 23 commits to
                <Text variant='link' component='span' inherit>
                  fix-notifications branch
                </Text>
              </Text>
              <Text size='xs' mt={4}>
                52 minutes ago
              </Text>
            </Timeline.Item>

            <Timeline.Item
              title='Pull request'
              bullet={<GitPullRequest size={12} />}
              lineVariant='dashed'
            >
              <Text color='dimmed' size='sm'>
                You&apos;ve submitted a pull request
                <Text variant='link' component='span' inherit>
                  Fix incorrect notification message (#187)
                </Text>
              </Text>
              <Text size='xs' mt={4}>
                34 minutes ago
              </Text>
            </Timeline.Item>

            <Timeline.Item
              title='Code review'
              bullet={<MessageDots size={12} />}
            >
              <Text color='dimmed' size='sm'>
                <Text variant='link' component='span' inherit>
                  Robert Gluesticker
                </Text>
                left a code review on your pull request
              </Text>
              <Text size='xs' mt={4}>
                12 minutes ago
              </Text>
            </Timeline.Item>
          </Timeline>

          <Space h={50} />

          <Grid justify='center'>
            <Grid.Col md={6} lg={3}>
              <Center>
                <Text color='gray'>Efficiency</Text>
              </Center>
              <Center>
                <RingProgress
                  size={140}
                  thickness={14}
                  sections={[{ value: data.efficiency, color: "indigo" }]}
                  label={
                    <Text color='blue' weight='bold' align='center' size='xl'>
                      {data.efficiency}%
                    </Text>
                  }
                />
              </Center>
            </Grid.Col>
            <Grid.Col md={6} lg={3}>
              <Center>
                <Text color='gray'>Comfort</Text>
              </Center>
              <Center>
                <RingProgress
                  size={140}
                  thickness={14}
                  sections={[{ value: data.comfort, color: "pink" }]}
                  label={
                    <Text color='blue' weight='bold' align='center' size='xl'>
                      {data.comfort}%
                    </Text>
                  }
                />
              </Center>
            </Grid.Col>

            <Grid.Col md={6} lg={3}>
              <Center>
                <Text color='gray'>Durability</Text>
              </Center>
              <Center>
                <RingProgress
                  size={140}
                  thickness={14}
                  sections={[{ value: data.durability, color: "cyan" }]}
                  label={
                    <Text color='blue' weight='bold' align='center' size='xl'>
                      {data.durability}%
                    </Text>
                  }
                />
              </Center>
            </Grid.Col>

            <Grid.Col md={6} lg={3}>
              <Center>
                <Text color='gray'>Luck</Text>
              </Center>
              <Center>
                <RingProgress
                  size={140}
                  thickness={14}
                  sections={[{ value: data.luck, color: "orange" }]}
                  label={
                    <Text color='blue' weight='bold' align='center' size='xl'>
                      {data.luck}%
                    </Text>
                  }
                />
              </Center>
            </Grid.Col>
          </Grid>

          <Space h={50} />

          <Slider
            className='my-10 w-96'
            value={level}
            onChange={setLevel}
            // 動きが止まった後で発火
            onChangeEnd={value => {
              updateHandler(value, "level")
            }}
            color='blue'
            min={1}
            max={4}
            marks={[
              { value: 1, label: 1 },
              { value: 2, label: 2 },
              { value: 3, label: 3 },
              { value: 4, label: 4 },
            ]}
          />
          <Slider
            className='my-10 w-96'
            value={efficiency}
            onChange={setEfficiency}
            onChangeEnd={value => {
              updateHandler(value, "efficiency")
            }}
            color='indigo'
            min={0}
            max={100}
            step={10}
            marks={[...Array(11)].map((v, i) => {
              return { value: i * 10, label: i * 10 }
            })}
          />
          <Slider
            className='my-10 w-96'
            value={comfort}
            onChange={setComfort}
            onChangeEnd={value => {
              updateHandler(value, "comfort")
            }}
            color='pink'
            min={0}
            max={100}
            step={10}
            marks={[...Array(11)].map((v, i) => {
              return { value: i * 10, label: i * 10 }
            })}
          />
          <Slider
            className='my-10 w-96'
            value={durability}
            onChange={setDurability}
            onChangeEnd={value => {
              updateHandler(value, "durability")
            }}
            color='sky'
            min={0}
            max={100}
            step={10}
            marks={[...Array(11)].map((v, i) => {
              return { value: i * 10, label: i * 10 }
            })}
          />
          <Slider
            className='my-10 w-96'
            value={luck}
            onChange={setLuck}
            onChangeEnd={value => {
              updateHandler(value, "luck")
            }}
            color='orange'
            min={0}
            max={100}
            step={10}
            marks={[...Array(11)].map((v, i) => {
              return { value: i * 10, label: i * 10 }
            })}
          />
        </Center>
      )}
    </Layout>
  )
}

export default Performance
