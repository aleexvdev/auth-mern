import { AnimatePresence, motion } from 'framer-motion';
import { Outlet } from 'react-router';
import { Footer } from '../components/layout/Footer';
import { NavBarPrivate } from '../components/layout/NavBarPrivate';

export const PrivateLayout = () => {
  return (
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className='relative w-screen h-screen min-h-screen'
      >
        <NavBarPrivate />
        <Outlet />
        <Footer />
      </motion.main>
    </AnimatePresence>
  );
}