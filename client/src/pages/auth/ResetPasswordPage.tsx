import { motion } from "framer-motion";
import { InputComponent } from "../../components/common/InputComponent";
import { SlLock } from "react-icons/sl";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { useForm } from "react-hook-form";

interface ResetPasswordFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<ResetPasswordFormData>();

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      // await dispatch(signUp(data));
      console.log(data)
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
            className="w-full text-white font-medium text-lg text-center my-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Enter your new password and confirm it
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
              <motion.div
                className="w-full my-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg py-2 px-3 flex items-center justify-center"
                >
                  <span className="text-center">Save Password</span>
                </button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </article>
    </motion.section>
  );
};
