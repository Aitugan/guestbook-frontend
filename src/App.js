import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import "./App.css";
import {formatDate} from "./helpers/date_converter"
const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL);

function App() {
  const [name, setName] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchMessages();
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => socket.disconnect();
  }, []);

  const fetchMessages = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/messages`
    );
    setMessages(response.data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newMessage || !name) {
      return;
    }
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/messages`,
      { name: name, text: newMessage }
    );
    setMessages([...messages, response.data]);
    setNewMessage("");
    socket.emit("newMessage", response.data);
  };

  return (
    <div className="App">
      <h1>Welcome to my guest book!</h1>
      <div className="chat-container">
        <div className="input-area">
          <input
            type="text"
            placeholder="Type your name"
            onChange={(event) => setName(event.target.value)}
          ></input>
          <textarea
            type="text"
            placeholder="Type your message"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
          ></textarea>
          <button onClick={handleSubmit}>Send</button>
        </div>

        <ul id="chat">
          {messages
            .slice()
            .reverse()
            .map((message) => (
              <li key={message._id}>
                <div className="name">
                  <h2>Written by</h2>
                  <h2><b>{message.name}</b></h2>
                  <h3>at <b>{formatDate(message.createdAt)}</b></h3>
                </div>
                <div className="message">{message.text}</div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
