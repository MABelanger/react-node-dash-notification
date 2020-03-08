import React from 'react';

import Chat from '@react-simple-chat/chat';

import socketIOClient from "socket.io-client";


export class InputsOutputsTx extends React.Component {
  constructor(props) {
    super(props);
    this.listenConnectIo = this.listenConnectIo.bind(this);
    this.listenThreadIo = this.listenThreadIo.bind(this);
    this.handleSend = this.handleSend.bind(this);

    // connect to server
    this.socket = socketIOClient.connect();

  }

  componentDidMount() {

  }

  static getDerivedStateFromProps(nextProps, prevState) {

  }

  listenConnectIo() {
    this.socket.on("connect", (data) => {
      this.socket.emit("join", "Hello server from client");
    });
  }

  listenThreadIo() {
    // listener for 'thread' event, which updates messages
    this.socket.on("thread", (message) => {
      this.setState(prevState => ({
        messages: [...prevState.messages, message]
      }));

    });
  }

  handleSend(message) {
    this.socket.emit("message", message);
  }


  render() {
    return(
      <div>
        <Chat username={this.props.username}
              messages={this.state.messages}
              onSend={this.handleSend}
        />
      </div>
    );
  }
}

export default InputsOutputsTx;
