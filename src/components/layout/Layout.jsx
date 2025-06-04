import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MapView from "../map/MapView";
import Footer from "./Footer";
import { AnimatePresence } from "framer-motion";

const Layout = ({ userAlias, onLogout, currentTheme, toggleTheme }) => {
  const [selectedParkingId, setSelectedParkingId] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebarVisibility = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div>
      <div className="flex flex-col h-screen">
        <Header
          userAlias={userAlias}
          onLogout={onLogout}
          currentTheme={currentTheme}
          toggleTheme={toggleTheme}
          isSidebarVisible={isSidebarVisible}
          toggleSidebar={toggleSidebarVisibility}
        />
        {/* <Header /> */}
        <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden bg-white dark:bg-slate-800">
          <div className="flex-1 h-full">
            <MapView onMarkerClick={setSelectedParkingId} />
          </div>
          <AnimatePresence initial={false}>
            {isSidebarVisible && (
              <Sidebar selectedParkingId={selectedParkingId} />
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Layout;
