import { Outlet } from "react-router-dom";

import "../App.css";
import { useAuthContext } from "../hooks/useAuthContext";
import SiderBar from "./siderbar/Sidebar";
import NavBar from "./navbar/Navbar";
import OnlineUsers from "./onlineUsers/OnlineUsers";

export default function Layout() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <>
          {user && <SiderBar />}
          <div className="container">
            <NavBar />
            <Outlet />
          </div>
          {user && <OnlineUsers />}
        </>
      )}
    </div>
  );
}
