import Discussion from "./components/bigs/discussion";
import Home from "./components/bigs/home";
import "./App.css";
import "./AppComponents.css"
import Navigation from "./components/bigs/navigation";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Search from "./components/bigs/search";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="margin">
          <Search />
          <Home />
        </div>
        <Discussion />
      </div>
    </Router>
  );
}

export default App;
