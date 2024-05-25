import { motion } from "framer-motion";
import { UserCard } from "../../components/User/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserbytoken } from "../../features/user/userSlice";
import { UnknownAction } from "@reduxjs/toolkit";
import { selectAuth } from "../../features/auth/authSlice";

export const DashboardPage = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(getUserbytoken() as unknown as UnknownAction);
  }, [dispatch]);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <motion.section
      className="w-full h-full mx-auto max-w-5xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <article>
        <motion.div
          className="w-full flex items-center justify-center gap-x-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-white font-bold text-4xl">
            Welcome to your Dashboard
          </h1>
        </motion.div>
        <motion.div
          className="my-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <UserCard
            username={user.username}
            roles={user.roles}
            email={user.email}
          />
        </motion.div>
      </article>
    </motion.section>
  );
};
