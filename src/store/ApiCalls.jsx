import axios from "axios";
import { userId, baseUrl } from "./store.jsx";

// Function to insert a new chat and add the first message
export const insertNewChat = async (text) => {
  try {
    // Create a new chat
    const chatResponse = await axios.post(`${baseUrl}/api/chats/`, {
      user_id_fk: userId,
      title: text.slice(0, 20),
    });
    console.log("Chat added:", chatResponse.data);

    const newChatId = chatResponse.data.newChat._id; // Extract the new chat ID

    // Add a message to the new chat
    const messageResponse = await axios.post(`${baseUrl}/api/messages/`, {
      user_id_fk: userId,
      chat_id_fk: newChatId,
      text: text,
    });
    console.log("Prompt added:", messageResponse.data);

    // Return the new chat ID
    return chatResponse.data.newChat;
  } catch (error) {
    console.error("Error adding prompt:", error);
    throw error;
  }
};

// Function to fetch all chats
export const fetchChats = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/chats/${userId}`);
    console.log("Chats:", response.data);

    // Return the chats data from the response
    return response.data;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return [];
  }
};
// fetch chat all message before timestamp
export const fetchChatMessages = async (chatId, timestamp) => {
  try {
    if (!timestamp) {
      timestamp = new Date().toISOString();
    }

    const res = await axios.get(
      `${baseUrl}/api/messages/${chatId}/${timestamp}`
    );
    console.log("messages:", res);

    return res.data;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return [];
  }
};
