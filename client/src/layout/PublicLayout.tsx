import { AnimatePresence, motion } from 'framer-motion';
import { NavBar } from '../components/layout/NavBar';
import { Outlet } from 'react-router';
import { Footer } from '../components/layout/Footer';

export const PublicLayout = () => {
  return (
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className='relative w-screen h-screen min-h-screen'
      >
        <NavBar />
        <Outlet />
        <Footer />
      </motion.main>
    </AnimatePresence>
  );
}
