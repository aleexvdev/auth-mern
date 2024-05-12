import { Link, useNavigate } from "react-router-dom";
import { ButtonAuth } from "../../components/Login/ButtonAuth";
import { FaApple, FaFacebook, FaSpinner } from "react-icons/fa";
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

export const SignInPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useSelector(selectAuth);
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
      }, 5000);
    }
    return () => {
      clearTimeout(redirectTimer);
    };
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: SignInFormData) => {
    try {
      await dispatch(signIn(data));
    } catch (error) {
      console.error(`Àuthentication Error: `, error);
    }
  };

  return (
    <section className="w-full h-auto mx-auto max-w-4xl">
      <article>
        <div className="w-full h-full flex flex-col items-center justify-center my-5 bg-gray-second rounded-2xl py-10 px-8">
          <div className="w-full flex items-center justify-center gap-x-2">
            <h1 className="text-white font-bold text-4xl">Sign In</h1>
          </div>
          <p className="w-full text-white font-medium text-lg text-center mt-3">
            Welcome back, you've been missed!
          </p>
          <div className="w-full max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full flex flex-col items-center justify-center gap-y-5 my-6">
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
              <div className="w-full flex items-center justify-between mt-0">
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
              <div className="w-full my-6">
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
                  ) : (
                    <span className="text-center">Sign In</span>
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="relative flex items-center w-[70%]">
            <div className="w-20 flex-grow h-px bg-gray-400 dark:bg-gray-700"></div>
            <span className="w-max flex-shrink px-4 text-white ">
              Or Sign In with
            </span>
            <div className="w-20 flex-grow h-px bg-gray-400 dark:bg-gray-700"></div>
          </div>
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
          <div className="mt-4 w-full flex items-center justify-center gap-2">
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
          </div>
        </div>
      </article>
    </section>
  );
};
