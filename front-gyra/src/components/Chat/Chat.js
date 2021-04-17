import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import InfoBar from '../InfoBar/InfoBar';
import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import { useSubscription, gql, useQuery, useMutation } from '@apollo/client';
import './Chat.css'


const Chat = ({location}) => {

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const connect_on_chat = gql`
      subscription{
        messageAdded{
          userName,
          contentMessage
        }
      }
    `

  const getMessages = gql `
      query{
        messages{
          userName,
          contentMessage
        }
      }
  `

  const SEND_MESSAGE = gql`
    mutation sendMessage($userName: String!, $contentMessage: String!){
      sendMessage(userName: $userName, contentMessage: $contentMessage)
    }
  `;

  const messagesChat = useQuery(getMessages);
  const connect = useSubscription(connect_on_chat);

  const [sendMessage,{ data }] = useMutation(SEND_MESSAGE );

  const SendMessage = (event) => {
    event.preventDefault();
    console.log(event);
    if(!name) return;
    if(!message) return;
    sendMessage({variables:{userName:name,contentMessage:message}})
    setMessage('');

  }


  useEffect(() => {
    if(connect.loading){
      console.log('conectando');
    }
    
    if(connect.data){
      setMessages([...messages,connect.data.messageAdded])
    }

    if(connect.error){
      console.log('erro ao conectar')
    }
    
  }, [ connect.data, connect.error, connect.loading]);

  useEffect(() => {
    const { name } = queryString.parse(location.search)
    setName(name); 
    
  }, [ location.search ]);

  useEffect(() => {
      if(messagesChat.data){
        setMessages(messagesChat.data.messages);
      }
    }, [messagesChat]);

  return (
        <div className="outerContainer">
          <div className="container">
            <InfoBar name={name} />
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={SendMessage} />
          </div>
        </div>
  )
}

export default Chat;