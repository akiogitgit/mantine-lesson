// rafce
import { Grid, Group, Button } from "@mantine/core"
import { Layout } from "../components/Layout"

// Grid の子供に、Grid.Colがある
// span で全体(12)のうち、割合を決める
// span 指定しないと、12になる

const GridDemo = () => {
  return (
    <Layout title='Grid'>
      <Grid my='xl'>
        <Grid.Col
          span={4}
          className='font-bold bg-blue-300 text-center text-gray-100'
        >
          1
        </Grid.Col>
        <Grid.Col
          span={3}
          className='font-bold bg-green-400 text-center text-gray-100'
        >
          2
        </Grid.Col>
        <Grid.Col
          span={5}
          className='font-bold bg-red-400 text-center text-gray-100'
        >
          3
        </Grid.Col>
      </Grid>

      {/* span 12, 超えたら改行される！ */}
      <Grid my='xl'>
        <Grid.Col
          span={5}
          className='font-bold bg-red-400 text-center text-gray-100'
        >
          4
        </Grid.Col>
        <Grid.Col
          span={5}
          className='font-bold bg-blue-300 text-center text-gray-100'
        >
          5
        </Grid.Col>
        <Grid.Col
          span={5}
          className='font-bold bg-green-400 text-center text-gray-100'
        >
          6
        </Grid.Col>
        <Grid.Col className='font-bold bg-yellow-400 text-center text-gray-100'>
          7
        </Grid.Col>
      </Grid>

      {/* offset で空く！ */}
      <Grid my='xl'>
        <Grid.Col
          span={3}
          className='font-bold bg-red-400 text-center text-gray-100'
        >
          8
        </Grid.Col>
        <Grid.Col
          span={3}
          offset={2}
          className='font-bold bg-blue-300 text-center text-gray-100'
        >
          9
        </Grid.Col>
        <Grid.Col
          span={3}
          className='font-bold bg-green-400 text-center text-gray-100'
        >
          10
        </Grid.Col>
      </Grid>

      {/* justify="start end center" ここじゃ使えない(around between) */}
      <Grid my='xl' justify='center' align='end'>
        <Grid.Col
          span={3}
          className='font-bold bg-red-400 h-10 text-center text-gray-100'
        >
          11
        </Grid.Col>
        <Grid.Col
          span={3}
          className='font-bold bg-blue-300 h-20 text-center text-gray-100'
        >
          12 12
        </Grid.Col>
        <Grid.Col
          span={3}
          className='font-bold bg-green-400 h-30 text-center text-gray-100'
        >
          13
        </Grid.Col>
      </Grid>

      {/* xs, xm, md, lg, xl */}
      {/* md={6} でmdの時のspanを6に */}
      <Grid>
        <Grid.Col
          className='font-bold bg-blue-500 text-center text-gray-100'
          md={6}
          lg={3}
        >
          14
        </Grid.Col>
        <Grid.Col
          className='font-bold bg-red-500 text-center text-gray-100'
          md={6}
          lg={3}
        >
          14
        </Grid.Col>
        <Grid.Col
          className='font-bold bg-red-500 text-center text-gray-100'
          md={6}
          lg={3}
        >
          14
        </Grid.Col>
        <Grid.Col
          className='font-bold bg-blue-500 text-center text-gray-100'
          md={6}
          lg={3}
        >
          14
        </Grid.Col>
      </Grid>

      {/* 12 を 24 に */}
      <Grid columns={24}>
        <Grid.Col
          className='font-bold bg-blue-500 text-center text-gray-100'
          md={6}
          lg={3}
        >
          14
        </Grid.Col>
        <Grid.Col
          className='font-bold bg-red-500 text-center text-gray-100'
          md={6}
          lg={3}
        >
          14
        </Grid.Col>
        <Grid.Col
          className='font-bold bg-red-500 text-center text-gray-100'
          md={6}
          lg={3}
        >
          14
        </Grid.Col>
        <Grid.Col
          className='font-bold bg-blue-500 text-center text-gray-100'
          md={6}
          lg={3}
        >
          14
        </Grid.Col>
      </Grid>
    </Layout>
  )
}

export default GridDemo
