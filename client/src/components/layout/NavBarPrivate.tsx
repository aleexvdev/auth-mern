import { useEffect, useRef, useState } from "react";
import { FaUsersCog } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { AnimatePresence, motion } from "framer-motion";

export const NavBarPrivate = () => {
  const [activeOptions, setActiveOptions] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setActiveOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logoutSession = () => {
    setShowPopup(true);
    setTimeout(() => {
      dispatch(logout());
      setShowPopup(false);
      navigate("/");
    }, 3000);
  }

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
          <div ref={optionsRef} className="absolute top-16 bg-card-main rounded-lg shadow-lg w-52 h-auto mt-2 border px-2 py-3">
            <ul className="flex flex-col gap-y-3">
              <button className="flex items-center gap-x-3 hover:bg-gray-primary rounded-lg py-2 px-1" onClick={() => setActiveOptions(false)}>
                <NavLink
                  to={"/dashboard"}
                  className="flex items-center gap-x-3"
                >
                  <RxDashboard className="w-6 h-6 text-white" />
                  <span className="text-base text-white">Dashboard</span>
                </NavLink>
              </button>
              <button className="flex items-center gap-x-3 hover:bg-gray-primary rounded-lg py-2 px-1" onClick={() => setActiveOptions(false)}>
                <NavLink
                  to={"users"}
                  className="flex items-center gap-x-3"
                >
                  <FaUsersCog className="w-6 h-6 text-white" />
                  <span className="text-base text-white">Users</span>
                </NavLink>
              </button>
              <button className="flex items-center gap-x-3 hover:bg-gray-primary rounded-lg py-2 px-1" onClick={logoutSession}>
                <IoIosLogOut className="w-6 h-6 text-white" />
                <span className="text-base text-white">Logout</span>
              </button>
            </ul>
          </div>
        )}
      </nav>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg p-8"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center mb-4">
                <motion.h2
                  className="text-2xl font-bold text-blue-600"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  Closing session
                </motion.h2>
              </div>
              <motion.p
                className="text-gray-600 text-center text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                Redirecting to Home...
              </motion.p>
              <motion.div
                className="mt-8 flex items-center justify-center overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <div className="w-8 h-8 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
