import React from 'react';
import Message from './Message';
import 'bootstrap/dist/css/bootstrap.min.css';

function Chat({ messages }) {
  return (
    <div className="chat-container">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}

export default Chat;
