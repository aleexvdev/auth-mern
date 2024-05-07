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
        <Link to={''}>
          <button className="text-white">
            <RiFacebookFill className="w-6 h-6" />
          </button>
        </Link>
        <Link to={''}>
          <button className="text-white">
            <FiInstagram className="w-6 h-6" />
          </button>
        </Link>
        <Link to={''}>
          <button className="text-white">
            <GrLinkedinOption className="w-6 h-6" />
          </button>
        </Link>
        <Link to={''}>
          <button className="text-white">
            <FiGithub className="w-6 h-6" />
          </button>
        </Link>
      </div>
    </footer>
  )
}
