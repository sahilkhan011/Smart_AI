/* eslint-disable react/prop-types */
import { createContext, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { fetchChatMessages } from "./ApiCalls.jsx";

export const ChatContext = createContext({
  currentChats: [],
  addPrompt: () => {},
});

function ChatContextProvider({ children }) {
  const [currentChat, setCurrentChat] = useState([]);
  const [chatId, setChatId] = useState("");
  const location = useLocation();
  const ws = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const pathname = location.pathname;
      const chatId = pathname.substring(pathname.lastIndexOf("/") + 1);
      setChatId(chatId);
      console.log("All Chats Updated: ", chatId);
      const chatMessages = await fetchChatMessages(chatId);
      setCurrentChat(chatMessages);
    };
    fetchData();
  }, [location.pathname]);

  useEffect(() => {
    // Create WebSocket connection
    ws.current = new WebSocket("ws://localhost:8585");

    // Connection opened
    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    // Listen for messages
    ws.current.onmessage = (event) => {
      const resData = JSON.parse(event.data);
      console.log("WebSocket message received:", resData.prompt);
      setCurrentChat((prevChat) => [resData.prompt, ...prevChat]);
    };

    // Connection closed
    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    // Cleanup on component unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const addPrompt = (userId, text) => {
    const prompt = {
      action: "insertPrompt",
      user_id_fk: userId,
      chat_id_fk: chatId,
      text: text,
    };
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(prompt));
    } else {
      console.error("WebSocket connection is not open");
    }
  };

  return (
    <ChatContext.Provider value={{ currentChat, addPrompt }}>
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContextProvider;
