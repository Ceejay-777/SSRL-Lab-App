import React, { useState } from 'react';
import SideNav from "../components/SideNav.jsx";
import Headerbar from '../components/Headerbar.jsx'
import { Outlet } from 'react-router-dom';


const SharedHomeLayout = () => {
  const [isSideNavOpen, setisSideNavOpen] = useState(false);
  const toggleSideNav = () => setisSideNavOpen(!isSideNavOpen)


  return (
    <div className=" min-h-screen max-w-screen-2xl">


      <div className='flex justify-center items-start gap-2'>

        {/* Sidebar */}
        <div
          className={`sidebar fixed top-0 left-0 h-screen bg-navBg2 z-50 rounded-r-3xl transition-transform transform ${isSideNavOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:sticky lg:flex w-64`}>
          <SideNav isSideNavOpen={isSideNavOpen} toggleSideNav={toggleSideNav} />
        </div>

        <div className={`p-4 flex-1 `} >
          <Headerbar toggleSideNav={toggleSideNav} isSideNavOpen={isSideNavOpen} />

          <Outlet />

        </div>

      </div>


    </div>
  );
};

export default SharedHomeLayout;