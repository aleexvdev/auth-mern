import { Link, useNavigate } from "react-router-dom";
import { ButtonAuth } from "../../components/Login/ButtonAuth";
import { FaApple, FaCheckCircle, FaFacebook, FaSpinner } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { InputComponent } from "../../components/common/InputComponent";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { SlLock } from "react-icons/sl";
import { SignInFormData } from "../../types/auth.type";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, signIn } from "../../features/auth/authSlice";
import { AppDispatch } from "../../app/store";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const SignInPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, success, error } = useSelector(selectAuth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  useEffect(() => {
    let redirectTimer: NodeJS.Timeout;
    if (isAuthenticated) {
      redirectTimer = setTimeout(() => {
        navigate("/dashboard");
      }, 6000);
    }
    return () => {
      clearTimeout(redirectTimer);
    };
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: SignInFormData) => {
    try {
      await dispatch(signIn(data));
    } catch (error) {
      console.error('Authentication Error: ', error);
    }
  };

  return (
    <motion.section
      className="w-full h-auto mx-auto max-w-4xl px-4 md:px-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <article>
        <motion.div
          className="w-full h-full flex flex-col items-center justify-center my-5 bg-gray-second rounded-2xl py-10 px-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-full flex items-center justify-center gap-x-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-white font-bold text-3xl text-center md:text-4xl">
              Sign In to your account
            </h1>
          </motion.div>
          <motion.p
            className="w-full text-white font-medium text-lg text-center my-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Welcome back, you've been missed!
          </motion.p>
          <motion.div
            className="w-full max-w-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full flex flex-col items-center justify-center gap-y-5 mb-6">
                <InputComponent
                  key={"EmailComponent"}
                  id="email"
                  name="email"
                  label="Email"
                  icon={MdOutlineAlternateEmail}
                  type="email"
                  placeholder="example@example.com"
                  rules={{ required: "El email es requerido" }}
                  register={register}
                  errors={errors}
                  instructions={false}
                />
                <InputComponent
                  key={"PasswordComponent"}
                  id="password"
                  name="password"
                  label="Password"
                  icon={SlLock}
                  type="password"
                  placeholder="Password"
                  rules={{ required: "La contraseña es requerida" }}
                  register={register}
                  errors={errors}
                  instructions={true}
                />
              </div>
              <motion.div
                className="w-full flex items-center justify-between mt-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <label
                  htmlFor="remember-me"
                  className="w-full flex items-center justify-start"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
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
              </motion.div>
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3"
                  role="alert"
                >
                  <strong className="font-bold">Error:</strong>
                  <span className="block sm:inline pl-2">{error}</span>
                </div>
              )}
              <motion.div
                className="w-full my-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg py-2 px-3 flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="mr-2 animate-spin" />
                      <span className="text-center">Processing...</span>
                    </>
                  ) : success ? (
                    <>
                      <FaCheckCircle className="mr-2 text-green-500" />
                      <span className="text-center">Successful Session</span>
                    </>
                  ) : (
                    <span className="text-center">Sign In</span>
                  )}
                </button>
              </motion.div>
            </form>
          </motion.div>
          <motion.div
            className="relative flex items-center w-full md:w-[70%]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="w-20 flex-grow h-px bg-gray-400 dark:bg-gray-700"></div>
            <span className="w-max flex-shrink px-4 text-white ">
              Or Sign In with
            </span>
            <div className="w-20 flex-grow h-px bg-gray-400 dark:bg-gray-700"></div>
          </motion.div>
          <motion.div
            className="w-full flex items-center justify-center gap-x-5 my-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
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
          </motion.div>
          <motion.div
            className="mt-4 w-full flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <span className="font-medium text-base text-gray-200">
              Don't have an account?
            </span>
            <Link to={"/sign-up"}>
              <button className="">
                <span className="text-base text-white hover:text-blue-700 font-semibold">
                  Sign Up
                </span>
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </article>
      <AnimatePresence>
        {isAuthenticated && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg p-8"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center mb-4">
                <motion.h2
                  className="text-2xl font-bold text-green-600"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  Session Started
                </motion.h2>
              </div>
              <motion.p
                className="text-gray-600 text-center text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                Redirecting to Dashboard...
              </motion.p>
              <motion.div
                className="mt-8 flex items-center justify-center overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <div className="w-8 h-8 rounded-full border-4 border-green-600 border-t-transparent animate-spin"></div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
/* 


*/