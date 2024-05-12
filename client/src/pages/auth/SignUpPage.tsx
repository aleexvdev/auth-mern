import { Link, useNavigate } from "react-router-dom";
import { ButtonAuth } from "../../components/Login/ButtonAuth";
import { FaApple, FaFacebook, FaRegUser, FaSpinner } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { InputComponent } from "../../components/common/InputComponent";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { SlLock } from "react-icons/sl";
import { SignUpFormData } from "../../types/auth.type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { resetState, selectAuth, signUp } from "../../features/auth/authSlice";
import { useEffect } from "react";

export const SignUpPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user } = useSelector(selectAuth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<SignUpFormData>();

  useEffect(() => {
    let redirectTimer: NodeJS.Timeout;
    if (user) {
      redirectTimer = setTimeout(() => {
        navigate("/sign-in");
        dispatch(resetState());
      }, 5000);
    }
    return () => {
      clearTimeout(redirectTimer);
    };
  }, [user, navigate, dispatch]);

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await dispatch(signUp(data));
    } catch (error) {
      console.error(`Register Error: `, error);
    }
  };

  return (
    <section className="w-full h-auto mx-auto max-w-4xl">
      <article>
        <div className="w-full h-full flex flex-col items-center justify-center my-5 bg-gray-second rounded-2xl py-10 px-8">
          <div className="w-full flex items-center justify-center gap-x-2">
            <h1 className="text-white font-bold text-4xl">Create Account</h1>
          </div>
          <p className="w-full text-white font-medium text-lg text-center mt-3">
            Please enter your details to sign up!
          </p>
          <div className="w-full max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full flex flex-col items-center justify-center gap-y-5 my-6">
                <InputComponent
                  key={"Username"}
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  label="Username"
                  icon={FaRegUser}
                  rules={{ required: "Username is required" }}
                  register={register}
                  errors={errors}
                  instructions={false}
                />
                <InputComponent
                  key={"Email"}
                  id="email"
                  name="email"
                  label="Email"
                  icon={MdOutlineAlternateEmail}
                  type="email"
                  placeholder="example@example.com"
                  rules={{ required: "Email is required" }}
                  register={register}
                  errors={errors}
                  instructions={false}
                />
                <InputComponent
                  key={"Password"}
                  id="password"
                  name="password"
                  label="Password"
                  icon={SlLock}
                  type="password"
                  placeholder="Password"
                  rules={{ required: "Password is required" }}
                  register={register}
                  errors={errors}
                  instructions={true}
                />
                <InputComponent
                  key={"PasswordConfirm"}
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  icon={SlLock}
                  type="password"
                  placeholder="Confirm Password"
                  rules={{
                    required: 'Confirm password is required',
                    validate: (value) =>
                      value === getValues().password || 'Passwords do not match',
                  }}
                  register={register}
                  errors={errors}
                  instructions={false}
                />
              </div>
              <div className="w-full my-8">
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
                    <span className="text-center">Sign Up</span>
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="relative flex items-center w-[70%]">
            <div className="w-20 flex-grow h-px bg-gray-400 dark:bg-gray-700"></div>
            <span className="w-max flex-shrink px-4 text-white ">
              Or Sign Up with
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
              Already have an account?
            </span>
            <Link to={"/sign-in"}>
              <button className="">
                <span className="text-base text-white hover:text-blue-700 font-semibold">
                  Sign In
                </span>
              </button>
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
};
