import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <header className='max-w-7xl mx-auto w-full flex items-center justify-between h-20'>
      <Link to={"/"} className='w-max'>
        <picture>
          <img src="/assets/img/logo.png" alt="Auth Mern" className='w-10 h-auto' />
        </picture>
      </Link>
      <nav className='w-full flex items-center justify-end gap-10'>
        <div>
          <Link to={'/sign-in'}>
            <span className='text-white text-lg font-medium'>SignIn</span>
          </Link>
        </div>
        <div>
          <Link to={'/sign-up'}>
            <span className='text-white text-lg font-medium'>SignUp</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}