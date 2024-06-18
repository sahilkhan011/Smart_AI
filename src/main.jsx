import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import MyContextProvider from "./store/MyContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <MyContextProvider>
    <App />
  </MyContextProvider>
  //</React.StrictMode>
);
