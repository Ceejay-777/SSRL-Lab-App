import { NavLink, Link } from "react-router-dom";
import LogOut from "../assets/LogOut.svg";
import {
  LayoutDashboard,
  UsersRound,
  FolderOpenDot,
  UserRoundCheck,
  ClipboardList,
  HandHelping,
  LayoutList,
  MessageCircleDashed,
  Settings,
  X
} from "lucide-react";

const navData = [
  { icon: <LayoutDashboard />, text: "Dashboard", path: "/home/dashboard", id: 1 },
  { icon: <UsersRound /> , text: "Personnel", path: "/home/personnel", id: 2 },
  { icon: <FolderOpenDot />, text: "Projects", path: "/home/projects", id: 3 },
  { icon: <ClipboardList />, text: "Reports", path: "/home/reports", id: 5 },
  { icon: <HandHelping />, text: "Requests", path: "/home/requests", id: 6 },
  { icon: <UserRoundCheck />, text: "Attendance", path: "/home/attendance", id: 9 },
  { icon: <LayoutList />, text: "To-do", path: "/home/to-do", id: 7 },
  { icon: <MessageCircleDashed />, text: "Team Chat", path: "/home/teamchat", id: 4 },
  { icon: <Settings />, text: "Settings", path: "/home/settings", id: 8 },
];

const SideNav = ({ toggleSideNav, isSideNavOpen }) => {
  return (
    <div
      className={`relative z-50 flex min-h-screen h-screen w-64 max-w-[20rem] flex-col bg-navBg2 py-4 pl-2 pr-0 overflow-y-scroll text-white max-h-screen`}
    >
      {/* Logo Section */}
      <div className="mt-2 flex items-center justify-end gap-3 px-6 py-4">
        <img
          src="/vite.svg"
          alt="Logo"
          className="h-8 w-8 rounded-md text-lg"
        />
        <h2 className="nav-text whitespace-nowrap text-base font-bold tracking-wider text-logo md:text-2xl">
          SSRL
        </h2>
      </div>

      <div className="absolute left-4 top-4 text-logo lg:hidden">
        <button onClick={toggleSideNav} className="cursor-pointer">
          {isSideNavOpen && <X size={30} />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="ml-3 flex-1 space-y-3 px-0 py-4 text-white">
        {navData.map(({ icon, text, path }) => (
          <NavLink
            to={path}
            onClick={toggleSideNav}
            className={({ isActive }) =>
              [
                isActive ? "activeText activeImg" : "hover:bg-navBg1",
                "flex items-center gap-3 rounded-l-full p-3 pl-4 transition-colors duration-300",
              ].join(" ")
            }
            key={text} 
          >
            {({ isActive }) => (
              <>
                {/* <img
                  src={img}
                  alt={text}
                  className={`w-6 h-6 transition-all duration-100 ease-in ${isActive ? "brightness-0" : ""
                    }`}
                /> */}
                {icon}
                <span
                  className={`text-sm md:text-base ${
                    isActive ? "font-bold" : ""
                  }`}
                >
                  {text}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Logout Button */}
      <div className="flex items-center justify-end px-2 py-4">
        <Link
          className="flex items-center gap-3 rounded-md p-2 font-semibold text-logo transition-colors hover:bg-navBg1 md:p-3"
          to={"/"}
        >
          <img src={LogOut} alt="Log Out" className="h-5 w-5 md:h-6 md:w-6" />
          <span className="text-sm md:text-base">Log Out</span>
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
