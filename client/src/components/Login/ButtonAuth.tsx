import { IconType } from 'react-icons';

interface ButtonAuthProps {
  icon: IconType;
  className?: string;
  title: string;
  text?: string;
}

export const ButtonAuth = ({ icon: Icon, title, className, text }: ButtonAuthProps ) => {
  return (
    <button className={className} title={title}>
      <Icon className='w-7 h-7' />
      {
        text &&
        <span className='ml-2 text-xs text-gray-500'>{text}</span>
      }
    </button>
  )
}
