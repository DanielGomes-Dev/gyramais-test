import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import InfoBar from '../InfoBar/InfoBar';
import Messages from '../Messages/Messages';

import Input from '../Input/Input';

import './Chat.css'

let socket;

const Chat = ({ location }) => {

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const ENDPOINT = 'http://localhost:3333/';


  useEffect(() => {
    const { name } = queryString.parse(location.search)

    const connectionOptions = {
      "force new connection": true,
      "reconnectionAttempts": "Infinity",
      "timeout": 10000,
      "transports": ["websocket"]
    };

    socket = io.connect(ENDPOINT, connectionOptions);

    setName(name);
    socket.emit('join', name, (error) => {
      if (error) {
        alert(error);
      }
    });

  }, [ENDPOINT, location.search]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) socket.emit('sendMessage', message, () => setMessage(''));
  }

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);




  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar name={name} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>

    </div>

  )
}

export default Chat;