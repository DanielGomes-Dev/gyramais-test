import React, { useState, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Daniel', message: 'Hello World' },
    { id: 2, user: 'Daniel2', message: 'Hello World2' },
    { id: 3, user: 'Daniel3', message: 'Hello World3' },

  ]);

  useEffect(() => {

    const get = async () => {
      const response = await fetch('http://localhost:3333/messages');
      const data = await response.json();
      setMessages(data);
    };

    get()

  }, []);


  const handleSendMessage = (user, message) => {
    // sendMessage([...messages, { id: messages.length + 1, user: 'DanielNovo', message: 'New Message' }]);
  }


  return (
    <>
      <ul>
        {messages.map(msg => <li key={msg.id}> {msg.user} <br></br> {msg.message} </li>)}
      </ul>

      <button onClick={() => handleSendMessage}>
        Enviar Menssagem
      </button>
    </>

  )
}

export default App;
