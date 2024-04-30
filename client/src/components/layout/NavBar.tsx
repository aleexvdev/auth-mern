import { PiCodeSimpleBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <header className='w-full h-20 bg-white py-4'>
      <nav className='w-full h-full flex items-center justify-center'>
        <Link to={"/"} >
          <div className='w-full h-full flex items-center justify-center gap-4'>
            <PiCodeSimpleBold className='w-6 h-6' />
            <span className='text-3xl font-serif uppercase font-semibold'>Mern</span>
          </div>
        </Link>
      </nav>
    </header>
  )
}
