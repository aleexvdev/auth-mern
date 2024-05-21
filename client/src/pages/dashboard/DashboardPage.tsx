import { motion } from "framer-motion";
import { UserCard } from "../../components/User/UserCard";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";

const INITIAL_USER: {
  username: string;
  email: string;
  roles: string[];
} = {
  username: "",
  email: "",
  roles: []
}

export const DashboardPage = () => {

  const { user } = useSelector(selectAuth);
  const [userState, setUserState] = useState(INITIAL_USER);

  useEffect(() => {
    user && setUserState({ username: user.username, email: user.email, roles: user.roles });
  }, [user]);

  return (
    <motion.section
      className="w-full h-full mx-auto max-w-4xl"
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
            username={userState.username}
            roles={userState.roles}
            email={userState.email}
          />
        </motion.div>
      </article>
    </motion.section>
  );
};
