import { useState } from "react";
import { FaUsersCog } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";

export const NavBarPrivate = () => {
  const [activeOptions, setActiveOptions] = useState<boolean>(false);

  return (
    <header className="max-w-5xl mx-auto w-full flex items-center justify-between h-20">
      <Link to={"/dashboard"} className="w-max">
        <picture>
          <img
            src="/assets/img/logo.png"
            alt="Auth Mern"
            className="w-10 h-auto"
          />
        </picture>
      </Link>
      <nav className="w-full flex items-center justify-end gap-10">
        <button
          className="relative bg-gray-second flex items-center justify-center gap-x-3 border rounded-lg px-3 py-1"
          onClick={() => setActiveOptions(!activeOptions)}
        >
          <span className="text-white text-sm">Options</span>
          <GoChevronDown className="w-6 h-6 text-white" />
        </button>
        {activeOptions && (
          <div className="absolute top-16 bg-card-main rounded-lg shadow-lg w-52 h-auto mt-2 border px-2 py-3">
            <ul className="flex flex-col gap-y-3">
              <button className="flex items-center gap-x-3 hover:bg-gray-primary rounded-lg py-2 px-1">
                <NavLink
                  to={"/dashboard"}
                  className="flex items-center gap-x-3"
                >
                  <RxDashboard className="w-6 h-6 text-white" />
                  <span className="text-base text-white">Dashboard</span>
                </NavLink>
              </button>
              <button className="flex items-center gap-x-3 hover:bg-gray-primary rounded-lg py-2 px-1">
                <NavLink
                  to={"users"}
                  className="flex items-center gap-x-3"
                >
                  <FaUsersCog className="w-6 h-6 text-white" />
                  <span className="text-base text-white">Users</span>
                </NavLink>
              </button>
              <button className="flex items-center gap-x-3 hover:bg-gray-primary rounded-lg py-2 px-1">
                <NavLink to={"/logout"} className="flex items-center gap-x-3">
                  <IoIosLogOut className="w-6 h-6 text-white" />
                  <span className="text-base text-white">Logout</span>
                </NavLink>
              </button>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};
