/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchChats, insertNewChat } from "./ApiCalls.jsx";

// Define the SmartAIContext with default values
export const SmartAIContext = createContext({
  allChats: [],
  createChat: () => {},
});

// Context Provider Component
function MyContextProvider({ children }) {
  const navigate = useNavigate();
  const [allChats, setAllChats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const chats = await fetchChats();
      setAllChats(chats);
      console.log("All Chats Updated:", chats); // Log the updated state
    };
    fetchData();
  }, []);

  const createChat = async (text) => {
    try {
      const newChat = await insertNewChat(text);
      setAllChats((prevChats) => [newChat, ...prevChats]);
      navigate(`/chat/${newChat._id}`);
    } catch (error) {
      console.error("Error creating chat:", error);
      // Handle error appropriately, e.g., show a notification to the user
    }
  };

  return (
    <SmartAIContext.Provider value={{ allChats, createChat }}>
      {children}
    </SmartAIContext.Provider>
  );
}

export default MyContextProvider;
