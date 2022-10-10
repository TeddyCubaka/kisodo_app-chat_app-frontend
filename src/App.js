import Discussion from "./components/bigs/discussion";
import Home from "./components/bigs/home";
import "./App.css";
import Navigation from "./components/bigs/navigation";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Kisodo App</h1>
          <Navigation />
          <Home />
          <Discussion />
        </header>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
