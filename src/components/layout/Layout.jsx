import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MapView from "../map/MapView";
import Footer from "./Footer";

const Layout = ({ userAlias, onLogout, currentTheme, toggleTheme }) => {
  const [selectedParkingId, setSelectedParkingId] = useState(null);

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
        <div className="flex flex-1 overflow-hidden flex-col md:flex-row bg-white dark:bg-slate-900">
          <Sidebar selectedParkingId={selectedParkingId} />
          <MapView onMarkerClick={setSelectedParkingId} />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Layout;
