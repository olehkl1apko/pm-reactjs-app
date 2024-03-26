import { Outlet } from "react-router-dom";

import "../App.css";
import SiderBar from "./siderbar/Sidebar";
import NavBar from "./navbar/Navbar";

export default function Layout() {
  return (
    <div className="App">
      <SiderBar />
      <div className="container">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
}
