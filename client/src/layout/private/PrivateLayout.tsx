import { AnimatePresence, motion } from "framer-motion";
import { NavBarPrivate } from "../../components/layout/NavBarPrivate";
import { Footer } from "../../components/layout/Footer";
import { useLocation } from "react-router";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  const location = useLocation();
  return (
    <>
      <NavBarPrivate />
      <AnimatePresence>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="relative w-screen h-screen min-h-screen"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
};
