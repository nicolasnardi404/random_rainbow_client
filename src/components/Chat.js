import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "./AuthContext";
import { refreshTokenIfNeeded } from "../util/RefreshTokenIfNeeded";
import SockJS from "sockjs-client/dist/sockjs";
import { Stomp } from "@stomp/stompjs";
import "../styles/Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [wsConnected, setWsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const stompClient = useRef(null);
  const {
    accessToken,
    refreshToken,
    username,
    setAccessTokenLocal,
    setRefreshTokenLocal,
  } = useContext(AuthContext);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Initial messages fetch
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = await refreshTokenIfNeeded({
        accessToken,
        refreshToken,
        setAccessTokenLocal,
        setRefreshTokenLocal,
      });

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/chat/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setMessages(data.reverse()); // Reverse to show newest messages at bottom
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS(`${process.env.REACT_APP_API_BASE_URL}/chat`);
      const stomp = Stomp.over(socket);

      stomp.debug = function (str) {
        console.log(str);
      };

      stomp.connect(
        {},
        () => {
          console.log("WebSocket Connected");
          setWsConnected(true);

          stomp.subscribe("/topic/messages", (message) => {
            try {
              const receivedMessage = JSON.parse(message.body);
              setMessages((prev) => {
                if (!prev.some((m) => m.id === receivedMessage.id)) {
                  return [...prev, receivedMessage];
                }
                return prev;
              });
              scrollToBottom();
            } catch (error) {
              console.error("Error processing message:", error);
            }
          });
        },
        (error) => {
          console.error("WebSocket Error:", error);
          setWsConnected(false);
          setTimeout(connectWebSocket, 3000);
        }
      );

      stompClient.current = stomp;
    };

    connectWebSocket();

    return () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect();
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const token = await refreshTokenIfNeeded({
      accessToken,
      refreshToken,
      setAccessTokenLocal,
      setRefreshTokenLocal,
    });

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/chat/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newMessage }),
        }
      );

      if (response.ok) {
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={msg.id || index}
            className={`message ${msg.user?.username === username ? "own-message" : ""}`}
          >
            <span className="message-username">{msg.user?.username}</span>
            <p className="message-content">{msg.content}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button type="submit" className="send-btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
