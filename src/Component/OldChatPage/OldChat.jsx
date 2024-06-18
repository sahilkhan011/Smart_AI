/* eslint-disable react/prop-types */
import style from "./OldChat.module.css";
import { useContext, useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { SmartAIContext } from "../../store/MyContextProvider";
import { useLocation } from "react-router-dom";

const UserText = ({ message }) => {
  return (
    <div className="d-flex flex-row justify-content-end">
      <div>
        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
          {message.text}
        </p>
        <p className="small me-3 mb-3 rounded-3 text-muted">
          {message.timestamp}
        </p>
      </div>
      <img
        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
        alt="avatar 1"
        style={{ width: "45px", height: "100%" }}
      />
    </div>
  );
};
const AssistantText = ({ message }) => {
  return (
    <div className="d-flex flex-row justify-content-start">
      <img
        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
        alt="avatar 1"
        style={{ width: "45px", height: "100%" }}
      />
      <div>
        <p className="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary">
          {message.text}
        </p>
        <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
          {message.timestamp}
        </p>
      </div>
    </div>
  );
};

const OldChat = () => {
  const { currentChat, setCurrentChatId, addPrompt } =
    useContext(SmartAIContext);
  const location = useLocation();
  const pathname = location.pathname;
  const chatId = pathname.substring(pathname.lastIndexOf("/") + 1);

  useEffect(() => {
    setCurrentChatId(chatId); // Call fetchChat immediately
  }, [chatId]); // Empty dependency array to run effect only once on mount

  const [inputValue, setInputValue] = useState("");

  const handleClick = () => {
    if (inputValue === "") {
      alert("Please enter a prompt");
    } else {
      const currentdate = new Date().toISOString(); // or another format you prefer
      const newPrompt = {
        message_id: Math.random().toString(36).substr(2, 9),
        sender: "user",
        text: inputValue,
        timestamp: currentdate,
      };
      console.log(newPrompt);
      addPrompt(newPrompt);
      //setInputValue(null);
    }
  };

  return (
    <main id={style.main} className="d-flex flex-column container">
      <div
        className="container-fluid d-flex flex-column justify-content-center align-items-center"
        style={{ height: "calc(100vh - 150px)" }}
      >
        <div
          className="pt-3 pe-3 w-100"
          style={{ flexGrow: 1, overflowY: "scroll" }}
        >
          {currentChat?.messages ? (
            currentChat.messages.map((message, index) =>
              message.sender === "user" ? (
                <UserText key={index} message={message} />
              ) : (
                <AssistantText key={index} message={message} />
              )
            )
          ) : (
            <div>Error fetching messages.</div>
          )}
        </div>
      </div>

      {/* Chat Input Section */}
      <div
        className={`mt-1 container d-flex flex-column align-items-center justify-content-end ${style.chatSection}`}
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
      </div>
    </main>
  );
};

export default OldChat;
