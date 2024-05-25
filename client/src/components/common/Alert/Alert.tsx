import { AnimatePresence, motion } from "framer-motion";

export const Alert = ({ type, message }: { type: string; message: string }) => {
  const getTextColor = () => {
    switch (type) {
      case "success":
        return "text-green-600";
      case "error":
        return "text-red-600";
      default:
        return "text-black";
    }
  };
  const getBorderColor = () => {
    switch (type) {
      case "success":
        return "border-green-600";
      case "error":
        return "border-red-600";
      default:
        return "border-black";
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8 w-72"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-center mb-4">
            <motion.h2
              className={`text-xl font-bold ${getTextColor()} text-center`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {message}
            </motion.h2>
          </div>
          <motion.div
            className="mt-8 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <div className={`w-8 h-8 rounded-full border-4 ${getBorderColor()} border-t-transparent animate-spin`}></div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
