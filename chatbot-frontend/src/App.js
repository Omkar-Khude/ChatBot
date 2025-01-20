import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chat from '../src/components/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ sender: 'User', content: '' });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('https://chatbot-backend-82io.onrender.com/api/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post('https://chatbot-backend-82io.onrender.com/api/messages', newMessage);
      setMessages([...messages, newMessage]);

      setNewMessage({ ...newMessage, content: '' });
      
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMessage({ ...newMessage, [name]: value });
  };

  return (
    <div className="App container">
      <h1 className="mt-5 mb-4">Chatbot</h1>
      <Chat messages={messages} />
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          name="content"
          value={newMessage.content}
          onChange={handleChange}
          placeholder="Type your message"
        />
        <br />
        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;

