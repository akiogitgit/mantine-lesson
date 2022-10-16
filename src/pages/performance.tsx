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
import { Timeline, Text, Grid, Center, RingProgress } from "@mantine/core"

const Performance = () => {
  const { data } = useQueryPerformance()
  const [efficiency, setEfficiency] = useState<number | undefined>(0)
  const [level, setLevel] = useState<number | undefined>(0)
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

  const updateHandler = useCallback(async (value: number, key: string) => {
    await supabase
      .from("performances")
      .update({ [key]: value })
      .eq("user_id", supabase.auth.user()?.id)
  }, [])

  return (
    <Layout>
      <p>{level}</p>
      {data && (
        <>
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
        </>
      )}
    </Layout>
  )
}

export default Performance
