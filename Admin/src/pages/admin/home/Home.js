import React, { useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";


const Home = () => {
 

  return (
    <div className="w-[100%] h-[auto] flex flex-cols-2">
      <Sidebar />

      <div className="w-[85%] border-red-800">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
