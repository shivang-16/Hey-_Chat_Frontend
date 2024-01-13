import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/SignUp/Login";
import Home from "./components/Home/Home";
import Toaster from "react-hot-toast";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
