import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { GoAlert } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetState,
  selectAuth,
  verifyCodeOTPMail,
} from "../../features/auth/authSlice";
import { AppDispatch } from "../../app/store";
import { Alert } from "../../components/common/Alert/Alert";

export const VerifyCodePage = () => {
  const [verificationCode, setVerificationCode] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { email, codeotp, isLoading, error } = useSelector(selectAuth);

  useEffect(() => {
    if (!email) {
      navigate("/recover-password");
    }
  }, [email, navigate]);

  const redirectToResetPassword = useCallback(() => {
    if (codeotp) {
      setTimeout(() => {
        navigate("/reset-password");
      }, 3000);
    }
  }, [codeotp, navigate]);

  useEffect(() => {
    let redirectTimer: NodeJS.Timeout | null = null;
    if (codeotp) {
      redirectTimer = setTimeout(redirectToResetPassword, 3000);
    }
    return () => {
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, [codeotp, redirectToResetPassword]);

  const handleVerificationCodeChange = (index: number, value: string) => {
    const isNumberOrEmpty = /^[0-9]?$/.test(value);
    if (isNumberOrEmpty) {
      const newCode = verificationCode.split("");
      newCode[index] = value;
      setVerificationCode(newCode.join(""));

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      } else if (!value && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (!value && index === 0) {
        inputRefs.current[0]?.focus();
      }
    }
  };

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      if (verificationCode.length === 6 && email) {
        const data = {
          email: email,
          otp: verificationCode.toString(),
        };
        await dispatch(verifyCodeOTPMail(data));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getErrorMessage = (error: any) => {
    if (typeof error === "string") {
      return error;
    } else if (typeof error === "object" && error !== null) {
      return Object.values(error).join(", ");
    } else {
      return "An unknown error occurred.";
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
              Verify Code OTP
            </h1>
          </motion.div>
          <motion.p
            className="w-full text-white font-medium text-lg text-center my-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            A verification code has been sent to you. Enter the code below.
          </motion.p>
          <motion.div
            className="w-full max-w-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <form onSubmit={onSubmit}>
              <div className="w-full flex flex-col items-center justify-center gap-y-5 my-2 overflow-hidden">
                <div className="flex items-center justify-center gap-5">
                  {Array.from({ length: 6 }, (_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={verificationCode[index] || ""}
                      onChange={(e) =>
                        handleVerificationCodeChange(index, e.target.value)
                      }
                      className="w-12 h-12 text-center text-2xl font-bold border border-gray-400 rounded-lg outline-none"
                      ref={(el) => (inputRefs.current[index] = el)}
                      pattern="[0-9]*"
                    />
                  ))}
                </div>
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
                {verificationCode.length < 5 && (
                  <motion.div
                    className="w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <span className="text-white text-sm flex items-center gap-x-2">
                      <GoAlert className="w-4 h-4 text-yellow-400" /> Enter the
                      verification code
                    </span>
                  </motion.div>
                )}
                <div className="overflow-hidden w-full flex items-center justify-center gap-4 mt-6">
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
                      className={`w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg py-2 px-3 flex items-center justify-center overflow-hidden ${
                        verificationCode.length < 5
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={verificationCode.length < 6}
                    >
                      <span className="text-center font-semibold">
                        {isLoading ? (
                          <span className="flex items-center justify-center overflow-hidden">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Loading...
                          </span>
                        ) : (
                          "Verify code"
                        )}
                      </span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </article>
      {codeotp && !error && (<Alert type={"success"} message={"Redirecting..."} />)}
    </motion.section>
  );
};
