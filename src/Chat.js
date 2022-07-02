import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, userName, room }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        author: userName,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessage("");
      setMessageList((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, []);

  return (
    <div className="chat-window">
      <div className="chat-header">Live Chat</div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={userName === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p> {messageContent.message} </p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>

      <div className="chat-footer">
        <input
          type="text"
          value={message}
          placeholder="type your message..."
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        ></input>
        <button onClick={sendMessage}>send</button>
      </div>
    </div>
  );
}

export default Chat;
