import { IconType } from 'react-icons';
import { motion } from 'framer-motion';

interface CardHomeProps {
  Icon: IconType;
  className?: string;
  title: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export const CardHome = ({ Icon, className, title, ...props }: CardHomeProps) => {
  return (
    <motion.div
      className="bg-card-main h-auto min-h-44 rounded-lg flex flex-col py-8 px-4 w-full items-center justify-center"
      variants={itemVariants}
      {...props}
    >
      <div className="flex items-center justify-center">
        <Icon className={className} />
      </div>
      <span className="text-white text-base mt-5 text-center">{title}</span>
    </motion.div>
  );
}
