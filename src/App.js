import React from "react";
import Home from "./components/bigs/home";
import "./App.css";
import "./AppComponents.css";
import "./media.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import discussionContext from "./contexts/discussion";
import { useState } from "react";
import Begin from "./components/bigs/begin";
import Signup from "./components/bigs/signup";
import Login from "./components/bigs/login";
import SocketTest from "./components/basics/socketTest";
import TakeConnection from "./components/basics/takeConnection";

function App() {
  const [discut, setDiscut] = useState([]);
  const [freind, setFreind] = useState({});
  const [me, setMe] = useState({});
  const [actualDiscussion, setActualDiscussion] = useState({});
  const [loading, setLoading] = useState("");
  const [userInbox, setUserInbox] = useState({});
  const [allMember, setAllMember] = useState([]);
  const [relations, setRelations] = useState({});
  const [messages, setMessages] = useState([]);
  const [position, setPosition] = useState(-10);
  const [userOnline, setUsersOnline] = useState(-10);
  return (
    <discussionContext.Provider
      value={{
        discut,
        setDiscut,
        freind,
        setFreind,
        me,
        setMe,
        actualDiscussion,
        setActualDiscussion,
        loading,
        setLoading,
        userInbox,
        setUserInbox,
        allMember,
        setAllMember,
        relations,
        setRelations,
        messages,
        setMessages,
        position,
        setPosition,
        userOnline,
        setUsersOnline,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Begin />}>
            <Route path="/takeconnection/:name" element={<TakeConnection />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/socket" element={<SocketTest />} />
        </Routes>
      </Router>
    </discussionContext.Provider>
  );
}

export default App;
