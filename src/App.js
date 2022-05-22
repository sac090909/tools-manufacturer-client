import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Pages/Shared/Navbar";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import Tools from "./Pages/Home/Tools";

import Login from "./Pages/Login/Login";
import Blogs from "./Pages/Blogs/Blogs";
import MyProfile from "./Pages/MyProfile/MyProfile";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="home" element={<Home></Home>}></Route>

        <Route path="tools" element={<Tools></Tools>}></Route>
        <Route path="blogs" element={<Blogs></Blogs>}></Route>
        <Route path="myprofile" element={<MyProfile></MyProfile>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
