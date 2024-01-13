import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/SignUp/Login";
import Home from "./components/Home/Home";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/userActions";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={isAuthenticated ? <Home /> : <Login />}
        />
        <Route exact path="/signup" element={<SignUp />} />
        {/* <Route exact path="/login" element={} /> */}
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
