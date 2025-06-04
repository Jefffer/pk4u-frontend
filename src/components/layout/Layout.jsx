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
        <div className="flex flex-1 overflow-hidden flex-col md:flex-row bg-white dark:bg-slate-800">
           <AnimatePresence initial={false}>
            {isSidebarVisible && (
              <Sidebar selectedParkingId={selectedParkingId} />
            )}
          </AnimatePresence>
          <div className="flex-1 h-full">
            <MapView onMarkerClick={setSelectedParkingId} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Layout;
