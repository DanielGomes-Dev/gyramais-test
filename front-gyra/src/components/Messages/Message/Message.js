import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { userName, contentMessage } , name }) => {
  
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();
  // console.log(userName,name);
  if (userName.trim().toLowerCase() === trimmedName) isSentByCurrentUser = true;
  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd" >
      <p className="sentText pr-10" >{name} </p>
      <div className="messageBox backgroundBlue" >
        <p className="messageText colorWhite" >{ReactEmoji.emojify(contentMessage)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart" >
      <div className="messageBox backgroundLight" >
        <p className="messageText colorDark" >{ReactEmoji.emojify(contentMessage)}</p>
      </div>
      <p className="sentText pl-10">{userName} </p>
    </div>
  )


}

export default Message;