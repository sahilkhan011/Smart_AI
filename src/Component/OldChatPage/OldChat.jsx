/* eslint-disable react/prop-types */
import style from "./OldChat.module.css";
import { useContext, useState } from "react";
import { IoSend } from "react-icons/io5";
import { ChatContext } from "../../store/WebSocketContext";

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
        style={{ width: "45px", height: "45px" }}
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
        style={{ width: "45px", height: "45px" }}
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
  const { currentChat, addPrompt } = useContext(ChatContext);
  const [inputValue, setInputValue] = useState("");

  const handleClick = () => {
    if (inputValue === "") {
      alert("Please enter a prompt");
    } else {
      console.log(inputValue);
      addPrompt(inputValue);
      setInputValue("");
    }
  };

  return (
    <main id={style.main} className="d-flex flex-column container m-auto">
      <div
        className="container-fluid d-flex flex-column justify-content-center align-items-center"
        style={{ height: "calc(100vh - 150px)", padding: 0 }}
      >
        <div
          className="pt-3 w-100 d-flex flex-column-reverse"
          style={{ flexGrow: 1, overflowY: "scroll" }}
        >
          {currentChat ? (
            currentChat.map((message, index) =>
              message.sender === "user" ? (
                <UserText key={index} message={message} />
              ) : (
                <AssistantText key={index} message={message} />
              )
            )
          ) : (
            <div>Error fetching messages.</div>
          )}
          {/* <div ref={refreshContainerRef}>Refresh</div> */}
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
            value={inputValue}
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
