import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Message({ message }) {
  return (
    <div className={`message ${message.sender === 'User' ? 'user-message' : 'bot-message'}`}>
      <p className="mb-0"><strong>{message.sender}: </strong>{message.content}</p>
    </div>
  );
}

export default Message;
