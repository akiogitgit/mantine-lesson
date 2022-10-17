import React from "react"
import { Settings, Space } from "tabler-icons-react"
import { IconSettings, IconPacman, IconToolsKitchen2 } from "@tabler/icons"
import { Layout } from "../components/Layout"
import { NextPage } from "next"
import { useGetApi } from "../hooks/useGetApi"
import { Todo } from "../types/todo"
import { Table } from "@mantine/core"

const TableDemo: NextPage = () => {
  const { data: todos } = useGetApi<Todo>("todos", {})
  console.log(todos)

  return (
    <Layout>
      {/* <pacman */}
      <Settings />
      <IconSettings />
      <IconPacman />
      <IconToolsKitchen2 />
      {/* <iframe
        id='player'
        width='300'
        height='200'
        title='title'
        src={"https://www.youtube.com/embed/" + "auLih2TFwio"}
        frameBorder='0'
        allowFullScreen
      /> */}

      <Table
        horizontalSpacing='xl'
        verticalSpacing='md'
        striped
        highlightOnHover
        withBorder
        withColumnBorders
        className='mx-auto max-w-600px'
        my='xl'
      >
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>created_at</th>
          </tr>
        </thead>
        {todos && (
          <tbody>
            {todos.map(todo => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.created_at}</td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>

      <Table className='mx-auto max-w-600px'>
        <thead>
          <tr>
            <th>Element position</th>
            <th>Element name</th>
            <th>Symbol</th>
            <th>Atomic mass</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>elemetn</td>
            <td>asdsf</td>
            <td>asdsf</td>
            <td>asdsf</td>
          </tr>
          <tr>
            <td>elemetn</td>
            <td>asdsf</td>
            <td>asdsf</td>
            <td>asdsf</td>
          </tr>
          <tr>
            <td>elemetn</td>
            <td>asdsf</td>
            <td>asdsf</td>
            <td>asdsf</td>
          </tr>
        </tbody>
      </Table>

      <Table mt={40} striped className='mx-auto max-w-600px'>
        <thead>
          <tr>
            <th>Element position</th>
            <th>Element name</th>
            <th>Symbol</th>
            <th>Atomic mass</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>elemetn</td>
            <td>asdsf</td>
            <td>asdsf</td>
            <td>asdsf</td>
          </tr>
          <tr>
            <td>elemetn</td>
            <td>asdsf</td>
            <td>asdsf</td>
            <td>asdsf</td>
          </tr>
          <tr>
            <td>elemetn</td>
            <td>asdsf</td>
            <td>asdsf</td>
            <td>asdsf</td>
          </tr>
        </tbody>
      </Table>
    </Layout>
  )
}

export default TableDemo
