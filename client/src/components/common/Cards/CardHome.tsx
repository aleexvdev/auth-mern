import { IconType } from 'react-icons';

interface CardHomeProps {
  icon: IconType;
  className?: string;
  title: string;
}


export const CardHome = ({ icon: Icon, className, title }: CardHomeProps) => {
  return (
    <div className='bg-[#1b2844] h-full rounded-lg flex flex-col w-44 py-8 px-4'>
      <div className='flex items-center justify-center'>
        <Icon className={className} />
      </div>
      <span className='text-white text-base mt-5'>{title}</span>
    </div>
  )
}
