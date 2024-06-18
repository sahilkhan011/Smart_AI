/* eslint-disable react/prop-types */
import chatsData from "./chats.json";
import { createContext, useEffect, useState } from "react";

export const SmartAIContext = createContext({
  allChats: [],
  createChat: () => {},
  currentChat: {},
  setCurrentChatId: () => {},
  addPrompt: () => {},
});

const fetchChats = async () => {
  try {
    // Simulating fetching data from a JSON file
    return chatsData;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return [];
  }
};

function MyContextProvider({ children }) {
  const [allChats, setAllChats] = useState([]);
  const [currentChat, setCurrentChat] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const chats = await fetchChats();
      setAllChats(chats);
      console.log("All Chats Updated: ", chats); // Log the updated state
    };
    fetchData();
  }, []);

  const createChat = (newChat) => {
    setAllChats((prevChats) => {
      return [newChat, ...prevChats];
    });
  };
  const addPrompt = (message) => {
    setCurrentChat((prevChat) => ({
      ...prevChat,
      messages: [...prevChat.messages, message],
    }));
  };

  const setCurrentChatId = (chatId) => {
    console.log("set current chat");
    const chat = allChats.find((chat) => chat.id == chatId);
    //console.log("Chat:", chat);
    setCurrentChat(chat);
  };

  return (
    <SmartAIContext.Provider
      value={{ allChats, createChat, currentChat, setCurrentChatId, addPrompt }}
    >
      {children}
    </SmartAIContext.Provider>
  );
}

export default MyContextProvider;
