import React from "react"
import { Table } from "@mantine/core"
import { Settings } from "tabler-icons-react"
import { IconSettings, IconPacman, IconToolsKitchen2 } from "@tabler/icons"

const TableDemo = () => {
  // const rows = elements.map(element => (
  //   <tr key={element.name}>
  //     <td>{element.position}</td>
  //     <td>{element.name}</td>
  //     <td>{element.symbol}</td>
  //     <td>{element.mass}</td>
  //   </tr>
  // ))

  return (
    <div>
      {/* <pacman */}
      <Settings />
      <IconSettings />
      <IconPacman />
      <IconToolsKitchen2 />
      <img src='https://source.unsplash.com/Qrk03uqLuME' />
      <iframe
        id='player'
        width='300'
        height='200'
        src={"https://www.youtube.com/embed/" + "auLih2TFwio"}
        frameBorder='0'
        allowFullScreen
      />
      <Table striped className='mx-auto max-w-600px'>
        <thead>
          <tr>
            <th>Element position</th>
            <th>Element name</th>
            <th>Symbol</th>
            <th>Atomic mass</th>
          </tr>
        </thead>
        {/* <tbody>{rows}</tbody> */}
        {/* <tbody>
          {[{ name: "aa", position: "anaa" }].map(element => (
            <tr key={element.name}>
              <td>{element.position}</td>
              <td>{element.name}</td>
            </tr>
          ))}
        </tbody> */}
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
    </div>
  )
}

export default TableDemo
