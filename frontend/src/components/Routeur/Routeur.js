import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../../components/Header/Header";
import Home from "../../pages/Home/Home";
import SignIn from "../../pages/SignIn/SignIn";

function Routeur() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </main>
    </Router>
  );
}

export default Routeur;
