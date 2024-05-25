import { motion } from "framer-motion";

export const VerifyCodePage = () => {
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
                <div className="overflow-hidden w-full flex items-center justify-center gap-4">
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
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg py-2 px-3 flex items-center justify-center"
                    >
                      <span className="text-center font-semibold">Send</span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </article>
      {showAlert && (
        <Alert type={alertType} message={alertMessage} />
      )}
    </motion.section>
  )
}
