import { Outlet } from "react-router-dom";

import "../App.css";
import { NavBar, SideBar } from "../components";
import OnlineUsers from "./onlineusers/OnlineUsers";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Layout() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <>
          {user && <SideBar />}
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
