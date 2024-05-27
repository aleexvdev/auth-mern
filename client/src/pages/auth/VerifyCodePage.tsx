import { motion } from "framer-motion";
import { useRef, useState } from "react";
// import { useForm } from "react-hook-form";
import { GoAlert } from "react-icons/go";
import { Link } from "react-router-dom";

/* interface VerificationCodeFormData {
  verificationCode: string;
} */

export const VerifyCodePage = () => {

  const [verificationCode, setVerificationCode] = useState<string>("");
  // const [errorDigit, setErrorDigit] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  /* const {
    handleSubmit,
    formState: { isValid },
  } = useForm<VerificationCodeFormData>({
    mode: "onChange",
  }); */

  const handleVerificationCodeChange = (index: number, value: string) => {
    const isNumberOrEmpty = /^[0-9]?$/.test(value);
    if (isNumberOrEmpty) {
      const newCode = verificationCode.split("");
      newCode[index] = value;
      setVerificationCode(newCode.join(""));

      if (value && index < 4) {
        inputRefs.current[index + 1]?.focus();
      } else if (!value && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (!value && index === 0) {
        inputRefs.current[0]?.focus();
      }
    }
  };

  const onSubmit = () => { 
    if (verificationCode.length >= 5) {
      console.log(verificationCode);
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
            className="w-full max-w-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <form onSubmit={onSubmit}>
              <div className="w-full flex flex-col items-center justify-center gap-y-5 my-2 overflow-hidden">
                <div className="flex items-center justify-center gap-5">
                  {Array.from({ length: 5 }, (_, index) => (
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
                  <Link to={"/sign-in"} className="w-full overflow-hidden">
                    <motion.div
                      className="w-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <button
                        type="button"
                        className="w-full bg-gray-400 hover:bg-gray-300 text-black rounded-lg py-2 px-3 flex items-center justify-center"
                      >
                        <span className="text-center font-semibold">
                          Cancel
                        </span>
                      </button>
                    </motion.div>
                  </Link>
                  <motion.div
                    className="w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <button
                      type="submit"
                      className={`w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg py-2 px-3 flex items-center justify-center ${
                        verificationCode.length < 5 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={verificationCode.length < 5}
                    >
                      <span className="text-center font-semibold">
                        Verify code
                      </span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </article>
    </motion.section>
  );
};
