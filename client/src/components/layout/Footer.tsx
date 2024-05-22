import { FiGithub, FiInstagram } from "react-icons/fi"
import { GrLinkedinOption } from "react-icons/gr"
import { RiFacebookFill } from "react-icons/ri"

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-second py-6 pt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white">Developed by: Alexander Valverde</div>
        <div className="flex items-center justify-end gap-5">
          <a href="https://www.facebook.com/alexvalverde666/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
            <RiFacebookFill className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/alexvalverde._/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-fuchsia-500">
            <FiInstagram className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/alexvdev/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
            <GrLinkedinOption className="w-6 h-6" />
          </a>
          <a href="https://github.com/aleexvdev/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-500">
            <FiGithub className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
