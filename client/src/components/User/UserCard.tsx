import { motion } from "framer-motion";

interface UserCardProps {
  username: string;
  role: string;
}

export const UserCard = ({ username, role }: UserCardProps) => {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-6 shadow-lg"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <motion.div
          className="flex items-center"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* <img
            src={avatar}
            alt="Avatar"
            className="w-12 h-12 rounded-full mr-4"
          /> */}
          <div>
            <h2 className="text-white font-semibold text-lg">{username}</h2>
            <p className="text-gray-400">{role}</p>
          </div>
        </motion.div>
        <motion.button
          className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Edit Profile
        </motion.button>
      </div>
      <motion.div
        className="bg-gray-700 rounded-lg p-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <p className="text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          tincidunt arcu vel arcu fermentum, eget accumsan tincidunt.
        </p>
      </motion.div>
    </motion.div>
  );
}
