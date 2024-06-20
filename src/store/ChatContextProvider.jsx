/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const ChatContext = createContext({
  currentChats: [],
  addPrompt: () => {},
});

const insertPrompt = async (prompt) => {
  try {
    const res = await axios.post(
      "http://localhost:8585/api/message/addPrompt",
      prompt
    );
    console.log("Prompt added:", res.data);

    // Returning the response data
    return res.data;
  } catch (error) {
    console.error("Error adding prompt:", error);
    throw error;
  }
};

const fetchChatMessages = async (chatId, timestamp) => {
  try {
    // Use current timestamp if not provided
    if (!timestamp) {
      timestamp = new Date().toISOString();
    }

    const res = await axios.get(
      `http://localhost:8585/api/message/${chatId}/${timestamp}`
    );
    console.log("messages:", res);

    // Returning the data from the response
    return res.data;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return [];
  }
};

function ChatContextProvider({ children }) {
  const [currentChat, setCurrentChat] = useState([]);
  const [chatId, setChatId] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const pathname = location.pathname;
      const chatId = pathname.substring(pathname.lastIndexOf("/") + 1);
      setChatId(chatId);
      console.log("All Chats Updated: ", chatId); // Log the updated state
      const chatMessages = await fetchChatMessages(chatId);
      setCurrentChat(chatMessages);
    };
    fetchData();
  }, [location.pathname]);

  const addPrompt = async (userId, text) => {
    const prompt = {
      user_id_fk: userId,
      chat_id_fk: chatId,
      text: text,
    };
    const res = await insertPrompt(prompt);
    setCurrentChat((prevChat) => [res.prompt, ...prevChat]);
  };

  return (
    <ChatContext.Provider value={{ currentChat, addPrompt }}>
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContextProvider;
