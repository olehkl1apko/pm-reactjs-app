import { Outlet } from "react-router-dom";

import NavBar from "./navbar/Navbar";

export default function Layout() {
  return (
    <>
      <NavBar />
      <div style={{ padding: "20px", paddingTop: "80px" }}>
        <Outlet />
      </div>
    </>
  );
}
