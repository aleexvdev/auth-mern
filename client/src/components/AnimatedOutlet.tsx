import { AnimatePresence, motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { NavBar } from './layout/NavBar';
import { Footer } from './layout/Footer';

export const AnimatedOutlet = () => {
  return (
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className='grid grid-cols-full grid-rows-[auto_1fr_auto] min-h-screen h-full w-screen overflow-y-auto'
      >
        <NavBar />
        <Outlet />
        <Footer />
      </motion.main>
    </AnimatePresence>
  );
}
