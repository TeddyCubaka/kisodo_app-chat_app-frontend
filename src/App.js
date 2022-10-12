import Discussion from "./components/bigs/discussion";
import Home from "./components/bigs/home";
import "./App.css";
import "./AppComponents.css"
import Navigation from "./components/bigs/navigation";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Search from "./components/bigs/search";
import discussionContext from "./contexts/discussion"
import { useContext, useState } from "react";

function App() {
  const [discut, setDiscut] = useState(useContext(discussionContext))
  const [freind, setFreind] = useState({})
  const [me, setMe] = useState({})
  const [actualDiscussion, setActualDiscussion] = useState({})
  return (
    <discussionContext.Provider value={{discut, setDiscut, freind, setFreind, me, setMe, actualDiscussion, setActualDiscussion}}>
      <Router>
        <div className="App">
          <Navigation />
          <div className="margin home">
            <Search />
            <Home />
          </div>
          <Discussion />
        </div>
      </Router>
    </discussionContext.Provider>
  );
}

export default App;
