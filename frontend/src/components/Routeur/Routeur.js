import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Home from "../../pages/Home/Home";
import SignIn from "../../pages/SignIn/SignIn";
import User from "../../pages/User/User";

function Routeur() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/user" element={<User />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default Routeur;
