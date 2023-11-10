import React from "react";
import Routeur from "./components/Routeur/Routeur";
import "./styles/main.css";
import { Provider } from "react-redux";
import store from "./utils/store";

function App() {
  return (
    <Provider store={store}>
      <Routeur />
    </Provider>
  );
}

export default App;
