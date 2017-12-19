import React, { Component } from "react"
import UserList from "./UserList"
import CodeSnipper from "./CodeSnipper/CodeSnipper.js"
import "./StudentView.css"
import socketIOClient from "socket.io-client"

class StudentView extends Component {
  constructor() {
    super()
    this.state = {
      response: [],
      endpoint: "http://127.0.0.1:3001"
    }
  }

  componentDidMount() {
    const { endpoint } = this.state
    const socket = socketIOClient(endpoint)
    socket.on("FromAPI", data => this.setState({ response: data }))
  }

  render() {
    const { response } = this.state
    console.log(this.state)
    const list = response.map((ques, i) => (
      <div key={i}>
        <div>{ques.question}</div>
      </div>
    ))

    return (
      <div>
        <h1>Student View</h1>
        <div style={{ textAlign: "center" }}>
          {response ? (
            <div>The stuff is in state {list}</div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <UserList />
        <CodeSnipper />
      </div>
    )
  }
}
export default StudentView
