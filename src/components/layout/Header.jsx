import React from "react";

const Header = () => {
  return (
    <header className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto"> {/* Para centrar contenido si es necesario */}
        <h1 className="text-3xl font-bold">PK4U</h1>
        <h3 className="text-xl">Parking for You</h3>
        <h3 className="text-xl">Smart Parking</h3>
      </div>
    </header>
  );
};
export default Header;
