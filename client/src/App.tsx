import { SiAuthelia } from "react-icons/si";
import { CardHome } from "./components/common/Cards";
import { GiPadlock } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

export const App = () => {
  return (
    <section className="w-full h-full mx-auto max-w-7xl">
      <article className="relative w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center justify-center">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <span className="bg-card-main rounded-2xl px-5 py-2 text-white font-medium w-auto text-lg">
            Open Source Project
          </span>
          <h1 className="text-5xl text-white font-bold w-full text-center mt-9 overflow-hidden">
            MERN with Authentication and Authorization
          </h1>
          <p className="font-normal text-2xl text-white w-[80%] text-center mt-10">
            Effortless User Authentication for Your MERN Stack Projects
          </p>
          <div className="w-full flex items-center justify-center gap-5 mt-16">
            <CardHome
              Icon={GiPadlock}
              className="text-white w-10 h-10"
              title="Implemented Strong Security Measures"
            />
            <CardHome
              Icon={SiAuthelia}
              className="text-white w-10 h-10"
              title="Forgot Password, SSO, & MFA Included"
            />
            <CardHome
              Icon={HiAdjustmentsHorizontal}
              className="text-white w-10 h-10"
              title="Customizable e-mail templates, cookies, & others."
            />
            <CardHome
              Icon={RxDashboard}
              className="text-white w-10 h-10"
              title="and more..."
            />
          </div>
        </div>
      </article>
    </section>
  );
};
