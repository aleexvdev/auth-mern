import { motion } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CiUser } from "react-icons/ci";
import { GoAlert } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../components/common/Alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  resetState,
  selectAuth,
  sendCodeOTPMail,
} from "../../features/auth/authSlice";

export const RecoverPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { success, isLoading, error } = useSelector(selectAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ email: string }>();

  useEffect(() => {
    let redirectTimer: NodeJS.Timeout;
    if (success) {
      redirectTimer = setTimeout(() => {
        navigate("/verify-code");
      }, 6000);
    }
    return () => {
      clearTimeout(redirectTimer);
    };
  }, [success, navigate]);

  const getErrorMessage = (error: any) => {
    if (typeof error === "string") {
      return error;
    } else if (typeof error === "object" && error !== null) {
      return Object.values(error).join(", ");
    } else {
      return "An unknown error occurred.";
    }
  };

  const onSubmit = async (data: { email: string }) => {
    try {
      await dispatch(sendCodeOTPMail(data));
    } catch (error: any) {
      dispatch(resetState());
      reset();
    }
  };

  const cancelAction = () => {
    dispatch(resetState());
    navigate("/sign-in");
  };

  return (
    <motion.section
      className="w-full h-auto mx-auto max-w-4xl px-4 md:px-2 pb-10"
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
              Forgot Password?
            </h1>
          </motion.div>
          <motion.p
            className="w-full text-white font-medium text-lg text-center my-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Enter your email address and we'll send you a link to reset your
            password.
          </motion.p>
          <motion.div
            className="w-full max-w-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full flex flex-col items-center justify-center gap-y-5 my-6 overflow-hidden">
                <div className="bg-white w-full flex items-center justify-between px-2 py-3 rounded-md h-12 overflow-hidden">
                  <CiUser className="w-7 h-7" />
                  <input
                    className="w-full h-full rounded-sm ml-5 outline-none bg-transparent text-gray-800"
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: "Email is required" })}
                  />
                </div>
                {errors["email"] && (
                  <motion.div
                    className="w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <span className="text-white text-sm flex items-center gap-x-2">
                      <GoAlert className="w-4 h-4 text-yellow-400" />{" "}
                      {errors["email"].message?.toString()}
                    </span>
                  </motion.div>
                )}
                {error && (
                    <div
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3"
                      role="alert"
                    >
                      <strong className="font-bold">Error:</strong>
                      <span className="block sm:inline pl-2">
                        {getErrorMessage(error)}
                      </span>
                    </div>
                  )}
                <div className="overflow-hidden w-full flex items-center justify-center gap-4">
                  <motion.div
                    className="w-full overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <button
                      type="button"
                      onClick={cancelAction}
                      className="w-full bg-gray-400 hover:bg-gray-300 text-black rounded-lg py-2 px-3 flex items-center justify-center"
                    >
                      <span className="text-center font-semibold">Cancel</span>
                    </button>
                  </motion.div>
                  <motion.div
                    className="w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <button
                      type="submit"
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg py-2 px-3 flex items-center justify-center"
                      disabled={isLoading}
                    >
                      <span className="text-center font-semibold">
                        {isLoading ? "Loading..." : "Send"}
                      </span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </article>
      {success && <Alert type={"success"} message={"The OTP code was sent to your email."} />}
    </motion.section>
  );
};
