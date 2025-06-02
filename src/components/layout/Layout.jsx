import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MapView from "../map/MapView";

const Layout = ({ userAlias, onLogout }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header userAlias={userAlias} onLogout={onLogout} />
      {/* <Header /> */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MapView />
      </div>
    </div>
  );
};
export default Layout;
