import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Component/Sidebar/Sidebar";
import { useState } from "react";
import Header from "./Component/Header/Header";
import NewChat from "./Component/NewChatPage/NewChat";
import OldChat from "./Component/OldChatPage/OldChat";
import ChatContextProvider from "./store/WebSocketContext.jsx";
import MyContextProvider from "./store/MyContextProvider.jsx";
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <MyContextProvider>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <Header
                  toggleSidebar={toggleSidebar}
                  isSidebarOpen={isSidebarOpen}
                />
                <div className="d-flex">
                  <Sidebar isSidebarOpen={isSidebarOpen} />
                  <Routes>
                    <Route path="/" element={<NewChat />} />
                  </Routes>
                  <Routes>
                    <Route
                      path="/chat/:id"
                      element={
                        <ChatContextProvider>
                          <OldChat />
                        </ChatContextProvider>
                      }
                    />
                  </Routes>
                </div>
              </>
            }
          />
        </Routes>
      </MyContextProvider>
    </Router>
  );
}

export default App;
