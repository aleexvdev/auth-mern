import { FiGithub, FiInstagram } from "react-icons/fi"
import { GrLinkedinOption } from "react-icons/gr"
import { RiFacebookFill } from "react-icons/ri"
import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto w-full h-20  flex items-center justify-between">
      <div className="w-full flex items-center justify-start">
        <span className='text-white'>Developed by: Alexander Valverde</span>
      </div>
      <div className="flex items-center justify-end w-full gap-5">
        <Link to={'https://www.facebook.com/alexvalverde666/'}>
          <button className="text-white hover:text-blue-500">
            <RiFacebookFill className="w-6 h-6" />
          </button>
        </Link>
        <Link to={'https://www.instagram.com/alexvalverde._/'}>
          <button className="text-white hover:text-fuchsia-500">
            <FiInstagram className="w-6 h-6" />
          </button>
        </Link>
        <Link to={'https://www.linkedin.com/in/alexvdev/'}>
          <button className="text-white hover:text-blue-500">
            <GrLinkedinOption className="w-6 h-6" />
          </button>
        </Link>
        <Link to={'https://github.com/aleexvdev/'}>
          <button className="text-white hover:text-gray-500">
            <FiGithub className="w-6 h-6" />
          </button>
        </Link>
      </div>
    </footer>
  )
}
