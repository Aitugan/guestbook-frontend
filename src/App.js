import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import "./App.css";
import Chat from "./components/Chat/Chat";
import InputArea from "./components/InputArea/InputArea";
const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL);

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => socket.disconnect();
  }, []);

  const fetchMessages = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/messages`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div className="App">
      <h1>Welcome to my guest book!</h1>
      <div className="chat-container">
        <InputArea
          socket={socket}
          messages={messages}
          setMessages={setMessages}
        ></InputArea>
        <Chat messages={messages}></Chat>
      </div>
    </div>
  );
}

export default App;
