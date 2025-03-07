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
  const [openMenuMessageId, setOpenMenuMessageId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

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

      // Save the current scroll position
      const currentScrollHeight = chatContainerRef.current.scrollHeight;

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

        // Adjust the scroll position to maintain the user's view
        const newScrollHeight = chatContainerRef.current.scrollHeight;
        chatContainerRef.current.scrollTop +=
          newScrollHeight - currentScrollHeight;
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

  const deleteMessage = async (messageId) => {
    try {
      const token = await refreshTokenIfNeeded({
        accessToken,
        refreshToken,
        setAccessTokenLocal,
        setRefreshTokenLocal,
      });

      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/chat/messages/${messageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== messageId)
      );
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleDeleteClick = (messageId) => {
    setShowDeleteModal(true);
    setMessageToDelete(messageId);
  };

  const handleDeleteConfirm = async () => {
    if (messageToDelete) {
      await deleteMessage(messageToDelete);
      setShowDeleteModal(false);
      setMessageToDelete(null);
    }
  };

  console.log("Updated messages:", messages);

  return (
    <div>
      <header className="chat-header">
        <h1>Infinite Chat!</h1>
        <p>
          This chat aims to facilitate interaction among the artists
          participating in the Random Rainbow project.
        </p>
      </header>
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
                {msg.user?.username === username && (
                  <span className="more-options">
                    <button
                      className="more-btn"
                      onClick={() =>
                        setOpenMenuMessageId(
                          openMenuMessageId === msg.id ? null : msg.id
                        )
                      }
                    >
                      •••
                    </button>
                    {openMenuMessageId === msg.id && (
                      <div className="options-dropdown">
                        <button onClick={() => handleDeleteClick(msg.id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </span>
                )}
              </span>
              <p className="message-content">{msg.content}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="chat-input-form">
          <div className="chat-input-form-container">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="chat-input"
            />
            <div className="character-counter">{newMessage.length} / 300</div>
          </div>
          <button
            type="submit"
            className="send-btn"
            disabled={newMessage.length > 300}
          >
            Send
          </button>
        </form>
        {showDeleteModal && (
          <div
            className="modal-overlay"
            onClick={() => setShowDeleteModal(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Confirm Delete</h2>
              <p>Are you sure you want to delete this message?</p>
              <div className="modal-buttons">
                <button
                  className="modal-btn confirm"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
                <button
                  className="modal-btn cancel"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
