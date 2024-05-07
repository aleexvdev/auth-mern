import { SiAuthelia } from "react-icons/si";
import { CardHome } from "./components/common/Cards";
import { GiPadlock } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

export const App = () => {
  return (
    <section className="w-full h-full mx-auto max-w-7xl">
      <article className="relative w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center justify-center">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <span className="bg-[rgba(74,74,74,.21)] rounded-2xl px-5 py-2 text-white font-medium w-auto text-lg">
            Open Source Project
          </span>
          <h1 className="text-5xl text-white font-bold w-full text-center mt-9">
            MERN with Authentication and Authorization
          </h1>
          <p className="font-normal text-2xl text-white w-[80%] text-center mt-10">
            Effortless User Authentication for Your MERN Stack Projects
          </p>
          <div className="w-full flex items-center justify-center gap-5 mt-16">
            <CardHome
              icon={GiPadlock}
              className="text-[#7B00FE] w-10 h-10"
              title="Implemented Strong Security Measures"
            />
            <CardHome
              icon={SiAuthelia}
              className="text-[#7B00FE] w-10 h-10"
              title="Forgot Password, SSO, & MFA Included"
            />
            <CardHome
              icon={HiAdjustmentsHorizontal}
              className="text-[#7B00FE] w-10 h-10"
              title="Customizable e-mail templates, cookies, & others."
            />
            <CardHome
              icon={RxDashboard}
              className="text-[#7B00FE] w-10 h-10"
              title="and more..."
            />
          </div>
        </div>
      </article>
    </section>
  );
};

/* 
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
*/
