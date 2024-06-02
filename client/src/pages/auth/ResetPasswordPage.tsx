import { AnimatePresence, motion } from "framer-motion";
import { InputComponent } from "../../components/common/InputComponent";
import { SlLock } from "react-icons/sl";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, selectAuth } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { AppDispatch } from "../../app/store";
import { getErrorMessage } from "../../utils/functions";
import { FaSpinner } from "react-icons/fa";

interface ResetPasswordFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated, isLoading, error, email } = useSelector(selectAuth);
  // const [emailState, setEmailState] = useState<string>(email as string);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<ResetPasswordFormData>();

  useEffect(() => {
    if (!email) {
      navigate("/recover-password");
    }
  }, [email, navigate]);

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
  }, [isAuthenticated, navigate, dispatch]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    const { password, confirmPassword } = data;
    try {
      const body = {
        email: email as string,
        password: password,
        confirmPassword: confirmPassword
      }
      await dispatch(resetPassword(body));
    } catch (error) {
      console.error(`Error: `, error);
    }
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
              Reset Password
            </h1>
          </motion.div>
          <motion.p
            className="w-full text-white font-medium text-lg text-center my-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Enter your new password and confirm it for your email:
          </motion.p>
          <motion.p
            className="w-full text-white font-medium text-lg text-center mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {email}
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
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === getValues().password ||
                      "Passwords do not match",
                  }}
                  register={register}
                  errors={errors}
                  instructions={false}
                />
              </div>
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3"
                  role="alert"
                >
                  <strong className="font-bold">Error:</strong>
                  <span className="block sm:inline pl-2">{getErrorMessage(error)}</span>
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
                  ) : (
                    <span className="text-center">Save Password</span>
                  )}
                </button>
              </motion.div>
            </form>
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
                  Password updated successfully!
                </motion.h2>
              </div>
              <motion.p
                className="text-gray-600 text-center text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                Logging in
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
