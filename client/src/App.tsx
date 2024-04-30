import { FaWpforms } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export const App = () => {
  return (
    <main className='bg-white w-full h-screen mx-auto max-w-4xl'>
      <section className='relative w-full h-full left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center justify-center'>
        <h1 className='text-3xl text-center font-normal py-4'><strong>Build</strong> a login/auth app with the <span className='font-serif'>MERN</span> stack from scratch</h1>
        <p className='text-2xl text-center font-medium text-gray-600/80'>Create a (minimal) full-stack app with user authentication viapassport and JWTs</p>
        <div className='w-full mt-10 flex items-center justify-center gap-10'>
          <Link to={"/sign-up"}>
            <button className='border border-black px-5 min-w-36 py-2 rounded-md flex items-center gap-2 shadow-md shadow-gray-500'>
              <FaWpforms className="w-6 h-6" />
              <span className="text-lg font-medium">Register</span>
            </button>
          </Link>
        <Link to={"sign-in"}>
          <button className='border border-black px-5 min-w-36 py-2 rounded-md flex items-center gap-2 shadow-md shadow-gray-500'>
            <IoLogInOutline className="w-6 h-6" />
            <span className="text-lg font-medium">Log In</span>
          </button>
        </Link>
        </div>
      </section>
    </main>
  );
}
