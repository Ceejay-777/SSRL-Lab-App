import SearchBar from "../components/SearchBar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { FaBars } from "react-icons/fa6";
import { ArrowLeft } from "lucide-react";
import { AlignJustify } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Bell } from "lucide-react";
import { UserRound } from "lucide-react";
import { useUserData } from "../Modules/UserContext.jsx";

const Headerbar = ({ toggleSideNav, isSideNavOpen }) => {
  const navigate = useNavigate();
  const { unread } = useUserData()
  
  return (
    <div
      className={`fixed left-0 right-0 top-0 z-50 flex h-[62px] max-w-screen-2xl items-center justify-between bg-white px-4 shadow-md md:px-8 lg:ml-64 ${isSideNavOpen && "translate-x-64"} transition-transform duration-300 ease-in-out lg:translate-x-0`}
    >
      <div className="text-logo lg:hidden">
        <button onClick={toggleSideNav} className="cursor-pointer">
          {!isSideNavOpen && (
            <AlignJustify className="" strokeWidth={3} size={28} />
          )}
        </button>
      </div>

      <div className="flex w-3/4 items-center gap-2">
        <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-logo p-1 transition-all duration-200 hover:scale-125 hover:transition-transform">
          <ArrowLeft className=" " color="white" onClick={() => navigate(-1)} />
        </div>
        <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-logo p-1 transition-all duration-200 hover:scale-125 hover:transition-transform">
          <ArrowRight className=" " color="white" onClick={() => navigate(1)} />
        </div>
        <SearchBar />
      </div>

      <div className="flex gap-2 items-center">
        <Link to={`/home/dashboard/notifications`} className="relative">
          <Bell className="cursor-pointer transition-all duration-200 hover:rotate-12 hover:scale-125 hover:transition-transform" size={28} />
          <div className="p-[2px] aspect-square bg-logo text-white text-xs flex justify-center items-center rounded-full absolute -top-1/2 right-0">{unread}</div>
        </Link>
        <Link to={`/home/dashboard/user-profile`}>
          <UserRound className="cursor-pointer transition-all duration-200 hover:scale-125 hover:transition-transform border-2 rounded-full p-1 border-black" size={32}/>
        </Link>
      </div>
    </div>
  );
};

export default Headerbar;
