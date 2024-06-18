import style from "./NewChat.module.css";

import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { IoSend } from "react-icons/io5";
import { SmartAIContext } from "../../store/MyContextProvider";
import { useNavigate } from "react-router-dom";

const NewChat = () => {
  const navigate = useNavigate();
  const { createChat } = useContext(SmartAIContext);
  const [inputValue, setInputValue] = useState("");

  const handleClick = () => {
    if (inputValue === "") {
      alert("Please enter a prompt");
    } else {
      const currentdate = new Date().toISOString(); // or another format you prefer
      const newChat = {
        id: Math.random().toString(36).substr(2, 9), // generates a unique string ID
        title: inputValue.slice(0, 20),
        created_at: currentdate,
        messages: [
          {
            message_id: Math.random().toString(36).substr(2, 9),
            sender: "user",
            text: inputValue,
            timestamp: currentdate,
          },
        ],
      };
      createChat(newChat);
      navigate(`chat/${newChat.id}`);
    }
  };

  return (
    <main id={style.main} className="d-flex flex-column container">
      <div className="container d-flex justify-content-center mt-5 flex-grow-1">
        <motion.div
          className="mb-5"
          animate={{ y: [-2000, 0] }}
          transition={{ duration: 1 }}
        >
          <h1 className={`${style.gradientText}`}>Hi, I am SmartAI</h1>
          <h1 className={`${style.anotherText}`}>How can I help you?</h1>
        </motion.div>
      </div>

      {/* when old chat open */}
      <motion.div
        className="container d-flex flex-column align-items-center justify-content-end"
        animate={{ x: [-2000, 0] }}
        transition={{ duration: 1 }}
      >
        <div className={`d-flex w-100 ${style.inputContainer}`}>
          <input
            type="text"
            placeholder="Ask me anything..."
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onKeyDown={(e) => {
              e.key === "Enter" && handleClick();
            }}
          />
          <button
            onClick={handleClick}
            className={`${
              inputValue === "" ? "" : style.active
            } justify-content-center align-items-center`}
            type="button"
          >
            <IoSend size={25} />
          </button>
        </div>
        <span className="text-muted">SmartAI can make mistakes.</span>
      </motion.div>
    </main>
  );
};

export default NewChat;
