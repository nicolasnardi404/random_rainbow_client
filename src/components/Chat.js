import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { AuthContext } from "./AuthContext";
import { refreshTokenIfNeeded } from "../util/RefreshTokenIfNeeded";
import SockJS from "sockjs-client/dist/sockjs";
import { Stomp } from "@stomp/stompjs";
import "../styles/Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [wsConnected, setWsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const messagesEndRef = useRef(null);
  const stompClient = useRef(null);
  const observer = useRef(null);
  const loadingElementRef = useRef(null);
  const chatContainerRef = useRef(null);
  const {
    accessToken,
    refreshToken,
    username,
    setAccessTokenLocal,
    setRefreshTokenLocal,
  } = useContext(AuthContext);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const fetchMessages = useCallback(async () => {
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
      setMessages(data.reverse());
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [accessToken, refreshToken, setAccessTokenLocal, setRefreshTokenLocal]);

  const fetchOlderMessages = useCallback(async () => {
    if (isLoading || !hasMore || messages.length === 0) return;

    try {
      setIsLoading(true);
      const oldestMessageId = messages[0].id;
      const token = await refreshTokenIfNeeded({
        accessToken,
        refreshToken,
        setAccessTokenLocal,
        setRefreshTokenLocal,
      });

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/chat/messages/before/${oldestMessageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setMessages((prevMessages) => {
          const existingIds = new Set(prevMessages.map((msg) => msg.id));
          const newMessages = data.filter((msg) => !existingIds.has(msg.id));
          return [...newMessages, ...prevMessages];
        });
      }
    } catch (error) {
      console.error("Error fetching older messages:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [
    isLoading,
    hasMore,
    messages,
    accessToken,
    refreshToken,
    setAccessTokenLocal,
    setRefreshTokenLocal,
  ]);

  // Initial messages fetch
  useEffect(() => {
    const initializeChat = async () => {
      await fetchMessages();
      setTimeout(scrollToBottom, 100);
    };
    initializeChat();
  }, [fetchMessages]);

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    if (!loadingElementRef.current || isLoading) return;

    const handleIntersection = (entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasMore && !isLoading) {
        fetchOlderMessages();
      }
    };

    const options = {
      root: chatContainerRef.current,
      rootMargin: "20px",
      threshold: 0.1,
    };

    const currentObserver = new IntersectionObserver(
      handleIntersection,
      options
    );
    currentObserver.observe(loadingElementRef.current);

    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, [isLoading, hasMore, fetchOlderMessages]);

  // Add this effect to handle new messages
  useEffect(() => {}, [messages]);

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
      console.log("Message length:", newMessage.length);

      if (response.ok) {
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  console.log("Updated messages:", messages);

  return (
    <div className="chat-container">
      <div className="chat-messages" ref={chatContainerRef}>
        {hasMore && (
          <div ref={loadingElementRef} className="loading-sentinel">
            {isLoading ? (
              <div className="loading-indicator">Loading...</div>
            ) : (
              <div></div>
            )}
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={`${msg.id}-${msg.timestamp}`}
            className={`message ${msg.user?.username === username ? "own-message" : ""}`}
          >
            <span className="message-username">
              <a
                href={`/profile/${msg.user?.username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {msg.user?.username}
              </a>
            </span>
            <p className="message-content">{msg.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <div className="character-counter">{newMessage.length} / 300</div>
        <button
          type="submit"
          className="send-btn"
          disabled={newMessage.length > 300}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
