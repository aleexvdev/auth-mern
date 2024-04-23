import { ButtonAuth } from "../components/Login/ButtonAuth";
import { Header } from "../components/Login/Header";
import { FaApple, FaFacebook, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { CiLock, CiMail } from "react-icons/ci";
import { PiHandWaving } from "react-icons/pi";

// style={{ background: "linear-gradient(to bottom right, #282258, #4C264F, #313066)" }}
export const LoginPage = () => {



  return (
    <section className="h-5/6 w-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="grid grid-cols-2 w-full h-full rounded-3xl bg-[#e7f5ff]">
        <div className="px-10 py-5">
          <form action="">
            <Header />
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="w-full flex items-center justify-center gap-2">
                <h1 className="text-black font-semibold text-3xl">Welcome back!</h1>
                <PiHandWaving className="w-7 h-7 text-[#2869ff]" />
              </div>
              <p className="text-gray-700 font-light text-base mt-2">Please enter your details to sign in.</p>
              <div className="w-full flex items-center justify-between gap-5 my-6">
                <ButtonAuth key={"Apple"} icon={FaApple} title={"Facebook"} className="w-full bg-white px-10 py-2 border border-gray-500/30 rounded-xl hover:bg-white/30" />
                <ButtonAuth key={"Google"} icon={FcGoogle} title={"Facebook"} className="w-full bg-white px-10 py-2 border border-gray-500/30 rounded-xl hover:bg-white/30" />
                <ButtonAuth key={"Facebook"} icon={FaFacebook} title={"Facebook"} className="w-full bg-white px-10 py-2 border border-gray-500/30 rounded-xl hover:bg-white/30 text-blue-700" />
              </div>
              <div className="w-full">
                <label htmlFor="email" className="flex flex-col items-center justify-start overflow-hidden mb-5">
                  <span className="w-full text-left mb-1 font-medium text-sm">Email address <span className="text-amber-500 text-sm font-bold">*</span></span>
                  <div className="w-full flex items-center justify-start border-2 border-gray-300 rounded-xl px-3 bg-white">
                    <div className="w-10 h-full flex items-center">
                      <CiMail className="w-6 h-6 text-gray-500" />
                    </div>
                    <input 
                      type="email" 
                      className="w-full h-11 rounded-lg border-none outline-none bg-none text-sm" 
                      name="email" 
                      id="email" 
                      placeholder="Your Email"
                    />
                  </div>
                </label>
                <label htmlFor="password" className="flex flex-col items-center justify-start overflow-hidden">
                  <span className="w-full text-left mb-1 font-medium text-sm">Password <span className="text-amber-500 text-sm font-bold">*</span></span>
                  <div className="w-full flex items-center justify-start border-2 border-gray-300 rounded-xl px-3 bg-white">
                    <div className="w-10 h-full flex items-center">
                      <CiLock className="w-6 h-6 text-gray-500" />
                    </div>
                    <div className="w-full flex items-center justify-between">
                      <input 
                        type="password" 
                        className="w-full h-11 rounded-lg border-none outline-none bg-none text-sm pr-3" 
                        name="password" 
                        id="password" 
                        placeholder="Password"
                      />
                      <button type="button" className="w-10 flex items-center bg-transparent rounded-full p-2 hover:bg-gray-300/50">
                        <FaRegEyeSlash className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </label>
              </div>
              <div className="w-full flex items-center justify-between mt-5">
                <label htmlFor="remember-me" className="w-full flex items-center justify-start">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    name="remember-me" 
                    id="remember-me" 
                  />
                  
                  <span className="font-medium ml-2 text-sm">Remember me</span>
                </label>
                <button className="w-full flex items-center justify-end">
                  <span className="font-semibold text-sm hover:text-[#0031e0]">Forgot your password?</span>
                </button>
              </div>
              <div className="w-full mt-6">
                <button className="w-full bg-[#043aff] hover:bg-[#0031e0] text-white rounded-lg py-2 px-3">Sign in</button>
              </div>
            </div>
          </form>
          <div className="mt-4 w-full flex items-center justify-center gap-2">
            <span className="font-medium text-sm">Don't have an account?</span>
            <button className="">
              <span className="text-sm text-[#043aff] hover:text-[#0031e0] font-semibold">Sign Up</span>
            </button>
          </div>
        </div>
        <div className="w-full h-full">
          <img src={"/assets/img/login.png"} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};
