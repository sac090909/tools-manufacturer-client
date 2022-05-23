import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Pages/Shared/Navbar";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import Tools from "./Pages/Home/Tools";
import RequireAuth from "./Pages/Login/RequireAuth.js";
import Login from "./Pages/Login/Login";
import Blogs from "./Pages/Blogs/Blogs";

import Purchase from "./Pages/Purchase/Purchase";
import SignUp from "./Pages/Login/SignUp";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MyOrders from "./Pages/Dashboard/MyOrders";
import AddReviews from "./Pages/Dashboard/AddReviews";
import MyProfile from "./Pages/Dashboard/MyProfile";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="home" element={<Home></Home>}></Route>
        <Route path="tools" element={<Tools></Tools>}></Route>

        <Route
          path="tools/:toolsId"
          element={
            <RequireAuth>
              <Purchase></Purchase>
            </RequireAuth>
          }
        ></Route>

        <Route path="blogs" element={<Blogs></Blogs>}></Route>
        <Route path="dashboard" element={<Dashboard></Dashboard>}>
          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route path="myorders" element={<MyOrders></MyOrders>}></Route>
          <Route path="addreviews" element={<AddReviews></AddReviews>}></Route>
        </Route>

        <Route path="signup" element={<SignUp></SignUp>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
