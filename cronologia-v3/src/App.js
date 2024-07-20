/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./screens/Home";
import New from "./screens/New";
import About from "./screens/About";
import Contact from "./screens/Contact";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./screens/Login";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

function App() {
  return (
    <div>
      <Header />
      {/* <LoginButton />
      <br></br>
      <LogoutButton /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/new"
          element={
            <PrivateRoute>
              <New />
            </PrivateRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
