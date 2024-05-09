import { useState } from "react";
import { IconType } from "react-icons";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputComponentProps {
  icon: IconType;
  type: string;
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputComponent = ({
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
}: InputComponentProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className='w-full flex flex-col'>
      <div className="w-full flex items-center bg-white rounded-xl shadow-sm">
        <span className="pl-3 pr-2 text-gray-600 border-r border-gray-300">
          <Icon className="w-6 h-5" />
        </span>
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full flex-1 py-2 px-4 bg-transparent outline-none"
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="pr-3 text-gray-600 focus:outline-none"
          >
            {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );
};
