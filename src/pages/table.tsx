import React from "react"
import { Table } from "@mantine/core"
import { Settings } from "tabler-icons-react"
import { IconSettings, IconPacman, IconToolsKitchen2 } from "@tabler/icons"
import { Layout } from "../components/Layout"
import { NextPage } from "next"

const TableDemo: NextPage = () => {
  // const rows = elements.map(element => (
  //   <tr key={element.name}>
  //     <td>{element.position}</td>
  //     <td>{element.name}</td>
  //     <td>{element.symbol}</td>
  //     <td>{element.mass}</td>
  //   </tr>
  // ))

  return (
    <Layout>
      {/* <pacman */}
      <Settings />
      <IconSettings />
      <IconPacman />
      <IconToolsKitchen2 />
      <iframe
        id='player'
        width='300'
        height='200'
        title='title'
        src={"https://www.youtube.com/embed/" + "auLih2TFwio"}
        frameBorder='0'
        allowFullScreen
      />

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
