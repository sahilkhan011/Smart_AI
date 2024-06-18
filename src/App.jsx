import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Component/Sidebar/Sidebar";
import { useState } from "react";
import Header from "./Component/Header/Header";
import NewChat from "./Component/NewChatPage/NewChat";
import OldChat from "./Component/OldChatPage/OldChat";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
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
                  <Route path="/chat/:id" element={<OldChat />} />
                </Routes>
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
