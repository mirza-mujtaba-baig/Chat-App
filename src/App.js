import "./App.css";
import React, { useState } from "react";
import Chat from "./Chat";

import io from "socket.io-client";

const socket = io.connect(`http://localhost:5000`);

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join the chat</h3>
          <input
            type="text"
            placeholder="Name..."
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          ></input>
          <input
            type="text"
            placeholder="Room Id..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          ></input>
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} room={room} />
      )}
    </div>
  );
}

export default App;
