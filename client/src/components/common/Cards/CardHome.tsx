import { IconType } from 'react-icons';
import { motion } from 'framer-motion';

interface CardHomeProps {
  Icon: IconType;
  className?: string;
  title: string;
  variants?: any;
}


export const CardHome = ({ Icon, className, title, variants }: CardHomeProps) => {
  return (
    <motion.div
      className="bg-card-main h-auto min-h-44 rounded-lg flex flex-col py-8 px-4 w-full items-center justify-center"
      variants={variants}
    >
      <div className="flex items-center justify-center">
        <Icon className={className} />
      </div>
      <span className="text-white text-base mt-5 text-center">{title}</span>
    </motion.div>
  );
}
