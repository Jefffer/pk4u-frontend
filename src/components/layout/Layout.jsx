import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MapView from "../map/MapView";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MapView />
      </div>
    </div>
  );
};
export default Layout;
