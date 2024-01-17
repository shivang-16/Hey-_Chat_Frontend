import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/SignUp/Login";
import Home from "./components/Home/Home";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers, loadUser } from "./redux/actions/userActions";
import Groups from "./components/Groups/Groups";
import { getAllGroups, getMyGroups } from "./redux/actions/groupActions";

function App() {
  
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getAllUsers());
    dispatch(getMyGroups());
    dispatch(getAllGroups());
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
        <Route exact path="/groups" element={<Groups/>} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
