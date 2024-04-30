import { AnimatePresence, motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { NavBar } from './layout/NavBar';
export const AnimatedOutlet = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className='relative'
      >
        <NavBar />
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
