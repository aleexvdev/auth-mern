import { SiAuthelia } from "react-icons/si";
import { CardHome } from "./components/common/Cards";
import { GiPadlock } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export const App = () => {
  return (
    <section className="w-full h-full min-h-screen flex items-center justify-center px-4">
      <article className="w-full max-w-7xl mx-auto pb-10">
        <motion.div
          className="flex flex-col items-center justify-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="w-full overflow-hidden py-4 md:py-2 text-center"
            variants={itemVariants}
          >
            <span className="bg-card-main rounded-2xl px-5 py-2 text-white font-medium text-lg">
              Open Source Project
            </span>
          </motion.div>
          <motion.h1
            className="text-3xl md:text-5xl text-white font-bold mt-6 overflow-hidden md:py-0 text-center"
            variants={itemVariants}
          >
            MERN with Authentication and Authorization
          </motion.h1>
          <motion.p
            className="font-normal text-lg md:text-2xl text-white w-full md:w-[80%] my-6 md:mt-10 text-center"
            variants={itemVariants}
          >
            Effortless User Authentication for Your MERN Stack Projects
          </motion.p>
          <motion.div
            variants={containerVariants}
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5 overflow-hidden"
          >
            <CardHome
              key={"GiPadlock"}
              Icon={GiPadlock}
              className="text-white w-10 h-10"
              title="Implemented Strong Security Measures"
              data-slot="security"
            />
            <CardHome
              key={"SiAuthelia"}
              Icon={SiAuthelia}
              className="text-white w-10 h-10"
              title="Forgot Password, SSO, & MFA Included"
              data-slot="auth"
            />
            <CardHome
              key={"HiAdjustmentsHorizontal"}
              Icon={HiAdjustmentsHorizontal}
              className="text-white w-10 h-10"
              title="Customizable e-mail templates, cookies, & others."
              data-slot="customization"
            />
            <CardHome
              key={"RxDashboard"}
              Icon={RxDashboard}
              className="text-white w-10 h-10"
              title="and more..."
              data-slot="dashboard"
            />
          </motion.div>
        </motion.div>
      </article>
    </section>
  );
}
