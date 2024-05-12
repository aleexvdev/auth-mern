import { Link, NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <header className="max-w-7xl mx-auto w-full flex items-center justify-between h-20">
      <Link to={"/"} className="w-max">
        <picture>
          <img
            src="/assets/img/logo.png"
            alt="Auth Mern"
            className="w-10 h-auto"
          />
        </picture>
      </Link>
      <nav className="w-full flex items-center justify-end gap-10">
        <div>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "text-white"
                : "text-gray-500"
            }
          >
            <span className="text-lg font-medium tracking-wide hover:text-white">
              Home
            </span>
          </NavLink>
        </div>
        <div>
          <NavLink
            to={"/sign-in"}
            className={({ isActive }) =>
              isActive
                ? "text-white"
                : "text-gray-500"
            }
          >
            <span className="text-lg font-medium tracking-wide hover:text-white">
              Sign In
            </span>
          </NavLink>
        </div>
        <div>
          <NavLink
            to={"/sign-up"}
            className={({ isActive }) =>
              isActive
                ? "text-white"
                : "text-gray-500"
            }
          >
            <span className="text-lg font-medium tracking-wide hover:text-white">
              Sign Up
            </span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
