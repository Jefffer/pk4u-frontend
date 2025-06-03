import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MapView from "../map/MapView";
import Footer from "./Footer";

const Layout = ({ userAlias, onLogout, currentTheme, toggleTheme }) => {
  return (
    <div>
      <div className="flex flex-col h-screen">
        <Header
          userAlias={userAlias}
          onLogout={onLogout}
          currentTheme={currentTheme}
          toggleTheme={toggleTheme}
        />
        {/* <Header /> */}
        <div className="flex flex-1 overflow-hidden bg-white dark:bg-slate-900">
          <Sidebar />
          <MapView />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Layout;
