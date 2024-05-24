import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";

const navVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const menuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3
    }
  }
};

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.header
      className="max-w-7xl mx-auto w-full flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8 z-10"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <NavLink to={"/"} className="w-max">
        <picture>
          <img
            src="/assets/img/logo.png"
            alt="Auth Mern"
            className="w-10 h-auto"
          />
        </picture>
      </NavLink>
      <nav className="hidden md:flex w-full items-center justify-end gap-4 sm:gap-6 lg:gap-10">
        <div key={"Home"}>
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
        <div key={"SignIn"}>
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
        <div key={"SignUp"}>
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
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white">
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>
      <motion.nav
        className="md:hidden absolute top-20 left-0 w-full bg-card-main flex flex-col items-center justify-center gap-4 overflow-hidden"
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={menuVariants}
      >
        <div key={"Home"} className="overflow-hidden py-5">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "text-white"
                : "text-gray-500"
            }
            onClick={toggleMenu}
          >
            <span className="text-lg font-medium tracking-wide hover:text-white">
              Home
            </span>
          </NavLink>
        </div>
        <div key={"SignIn"} className="overflow-hidden py-5">
          <NavLink
            to={"/sign-in"}
            className={({ isActive }) =>
              isActive
                ? "text-white"
                : "text-gray-500"
            }
            onClick={toggleMenu}
          >
            <span className="text-lg font-medium tracking-wide hover:text-white">
              Sign In
            </span>
          </NavLink>
        </div>
        <div key={"SignUp"} className="overflow-hidden py-5">
          <NavLink
            to={"/sign-up"}
            className={({ isActive }) =>
              isActive
                ? "text-white"
                : "text-gray-500"
            }
            onClick={toggleMenu}
          >
            <span className="text-lg font-medium tracking-wide hover:text-white">
              Sign Up
            </span>
          </NavLink>
        </div>
      </motion.nav>
    </motion.header>
  );
};
