import axios from "axios";
// Function to insert a new chat and add the first message
export const insertNewChat = async (user_id_fk, text) => {
  try {
    // Create a new chat
    const chatResponse = await axios.post("http://localhost:8585/api/chat/", {
      user_id_fk: user_id_fk,
      title: text.slice(0, 20),
    });
    console.log("Chat added:", chatResponse.data);

    const newChatId = chatResponse.data.newChat._id; // Extract the new chat ID

    // Add a message to the new chat
    const messageResponse = await axios.post(
      "http://localhost:8585/api/message/addPrompt",
      {
        user_id_fk: user_id_fk,
        chat_id_fk: newChatId,
        text: text,
      }
    );
    console.log("Prompt added:", messageResponse.data);

    // Return the new chat ID
    return chatResponse.data.newChat;
  } catch (error) {
    console.error("Error adding prompt:", error);
    throw error;
  }
};

// Function to fetch all chats
export const fetchChats = async (user_id_fk) => {
  try {
    const response = await axios.get(
      `http://localhost:8585/api/chat/getAllChats/${user_id_fk}`
    );
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
      `http://localhost:8585/api/message/${chatId}/${timestamp}`
    );
    console.log("messages:", res);

    return res.data;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return [];
  }
};
