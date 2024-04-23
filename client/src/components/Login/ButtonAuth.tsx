import { IconType } from 'react-icons';

interface ButtonAuthProps {
  icon: IconType;
  className?: string;
  title: string;
}

export const ButtonAuth = ({ icon: Icon, title, className }: ButtonAuthProps ) => {
  return (
    <button className={className} title={title}>
      <Icon className='w-7 h-7' />
    </button>
  )
}
