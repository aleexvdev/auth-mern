import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { NavBar } from "../../components/layout/NavBar";
import { Footer } from "../../components/layout/Footer";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  const location = useLocation();
  return (
    <>
      <NavBar />
      <AnimatePresence>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full min-h-screen flex flex-col"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
};
