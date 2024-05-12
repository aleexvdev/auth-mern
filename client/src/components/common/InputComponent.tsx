import { useState } from "react";
import { RegisterOptions, FieldErrors, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoAlert } from "react-icons/go";
import { IoAlertCircle } from "react-icons/io5";

interface InputComponentProps {
  icon: IconType;
  type?: string;
  name: string;
  label: string;
  placeholder: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rules: RegisterOptions;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  instructions: boolean;
}

export const InputComponent = ({
  icon: Icon,
  type = "text",
  name,
  label,
  placeholder,
  rules,
  register,
  errors,
  instructions
}: InputComponentProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="">
        <label htmlFor={name} className="text-white text-sm pl-1 font-medium tracking-wide flex items-center gap-x-2">
          <span className="mb-1">{label}</span> { instructions && <IoAlertCircle className="w-5 h-5 mb-1" /> }
        </label>
        <div className="w-full flex items-center bg-white rounded-md shadow-sm mt-1">
          <span className="pl-3 pr-2 text-gray-800 border-r border-gray-300">
            <Icon className="w-6 h-5" />
          </span>
          <input
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            placeholder={placeholder}
            className="w-full flex-1 py-2 px-4 bg-transparent outline-none"
            {...register(name,  rules)}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="pr-3 text-gray-800 focus:outline-none"
            >
              {showPassword ? (
                <FaEyeSlash className="w-5 h-5" />
              ) : (
                <FaEye className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>
      {errors[name] && (
        <span className="text-white text-sm pt-2 flex items-center gap-x-2">
          <GoAlert className="w-4 h-4 text-yellow-400" /> {errors[name]?.message?.toString()}
        </span>
      )}
    </div>
  );
};
