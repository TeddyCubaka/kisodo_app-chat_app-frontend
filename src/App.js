import Home from "./components/bigs/home";
import "./App.css";
import "./AppComponents.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import discussionContext from "./contexts/discussion";
import { useContext, useState } from "react";
import Begin from "./components/bigs/begin";
import Signup from "./components/bigs/signup";
import Login from "./components/bigs/login";

function App() {
    const [discut, setDiscut] = useState(useContext(discussionContext));
    const [freind, setFreind] = useState({});
    const [me, setMe] = useState({});
    const [actualDiscussion, setActualDiscussion] = useState({});
    const [meId, setMeId] = useState("");
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
                meId,
                setMeId,
            }}
        >
            <Router>
                <Routes>
                    <Route path="/" element={<Begin />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Router>
        </discussionContext.Provider>
    );
}

export default App;
