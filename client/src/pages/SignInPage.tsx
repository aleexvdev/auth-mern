import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { ButtonAuth } from "../components/Login/ButtonAuth";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { InputComponent } from "../components/common/InputComponent";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { SlLock } from "react-icons/sl";

export const SignInPage = () => {
  return (
    <section className="w-full h-auto mx-auto max-w-4xl">
      <article>
        <div className="w-full flex items-center">
          <Link to={"/"}>
            <button className="w-full flex items-center gap-3 bg-[#4a4a4a36] rounded-xl py-2 px-5">
              <IoIosArrowRoundBack className="w-7 h-7 text-white" />
              <span className="rounded-2xl text-white font-medium w-auto text-lg">
                Back
              </span>
            </button>
          </Link>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center my-5 bg-[#4a4a4a36] rounded-2xl py-10 px-8">
          <div className="w-full flex items-center justify-center gap-x-2">
            <h1 className="text-white font-bold text-4xl">Sign In</h1>
          </div>
          <p className="w-full text-white font-medium text-lg text-center mt-6">
            Welcome back, you've been missed!
          </p>
          <div className="w-full flex items-center justify-center gap-x-5 my-6">
            <ButtonAuth
              key={"Apple"}
              icon={FaApple}
              title={"SignIn with Apple"}
              className="w-auto bg-white px-10 py-2 rounded-xl hover:bg-white/85"
            />
            <ButtonAuth
              key={"Google"}
              icon={FcGoogle}
              title={"Facebook"}
              className="w-auto bg-white px-10 py-2 rounded-xl hover:bg-white/85"
            />
            <ButtonAuth
              key={"Facebook"}
              icon={FaFacebook}
              title={"Facebook"}
              className="w-auto bg-white px-10 py-2 rounded-xl text-blue-700 hover:bg-white/85"
            />
          </div>
          <div className="relative flex items-center w-[70%]">
            <div className="w-20 flex-grow h-px bg-gray-400 dark:bg-gray-700"></div>
            <span className="w-max flex-shrink px-4 text-white ">
              Or Sign In with
            </span>
            <div className="w-20 flex-grow h-px bg-gray-400 dark:bg-gray-700"></div>
          </div>
          <div className="w-full max-w-sm flex flex-col items-center justify-center gap-y-5 my-6">
            <InputComponent
              key={"EmailComponent"}
              icon={MdOutlineAlternateEmail}
              type="email"
              value=""
              placeholder="example@example.com"
            />
            <InputComponent
              key={"PasswordComponent"}
              icon={SlLock}
              type="password"
              value=""
              placeholder="Password"
            />
          </div>
          <div className="w-full max-w-sm flex items-center justify-between mt-0">
            <label
              htmlFor="remember-me"
              className="w-full flex items-center justify-start"
            >
              <input
                type="checkbox"
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                name="remember-me"
                id="remember-me"
              />
              <span className="font-medium ml-2 text-base text-white">
                Remember me
              </span>
            </label>
            <button className="w-full flex items-center justify-end">
              <span className="font-semibold text-base text-white hover:text-gray-400">
                Forgot your password?
              </span>
            </button>
          </div>
          <div className="w-full max-w-sm my-6">
            <button className="w-full bg-[#043aff] hover:bg-[#0031e0] text-white rounded-lg py-2 px-3">
              Sign In
            </button>
          </div>
          <div className="mt-4 w-full flex items-center justify-center gap-2">
            <span className="font-medium text-base text-white">
              Don't have an account?
            </span>
            <Link to={"/sign-up"}>
              <button className="">
                <span className="text-base text-[#043aff] hover:text-[#0031e0] font-semibold">
                  Sign Up
                </span>
              </button>
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
};
