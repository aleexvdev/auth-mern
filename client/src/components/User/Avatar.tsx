import { motion } from "framer-motion";
import { getRandomColor } from "../../utils/functions";

interface AvatarProps {
  username: string;
}

export const Avatar = ({ username }: AvatarProps) => {
  const name = username.slice(0, 2).toUpperCase();
  const backgroundColor = getRandomColor();

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-12 h-12 flex items-center justify-center mr-4 rounded-full p-1"
      style={{ background: backgroundColor }}
    >
      <span className="text-white font-semibold text-xl">{name}</span>
    </motion.div>
  );
};
