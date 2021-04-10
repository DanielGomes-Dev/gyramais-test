import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join = () => {

  const [name, setName] = useState('');

  return (
    <div className="joinOuterContainer">

      <div className="JoinInnerContainer">

        <h1 className="heading">Chat</h1>

        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>

        <Link onClick={event => !name ? event.preventDefault() : null} to={`/chat?name=${name}`}>
          <button className="button mt-20" type="submit" >Entrar</button>
        </Link>

      </div>

    </div>
  )
}

export default Join;