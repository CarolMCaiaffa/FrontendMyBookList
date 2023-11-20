import { Link } from "react-router-dom";
import { RoutePaths } from "../general/RoutePaths";

import Footer from "./Footer";

export const Home = () => (
  <div
    className="flex h-full w-full flex-col justify-center bg-cover bg-center align-middle"
    style={{ backgroundImage: "url('/background.jpg')" }}
  >
    <div className="flex w-full flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
      <h2 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl md:text-3xl">
        <span className="block">My Book List</span>
      </h2>
    </div>
    <br />
    <div className="w-full">
      <img
        className="mx-auto w-full sm:w-1/2 md:w-1/3"
        src="./logo_transparent.png"
        alt="Logo de My Book List"
      />

      <div className="mt-4 flex justify-center">
        <Link to={RoutePaths.CREATEACCOUNT}>
          <button className="m-2 rounded bg-cyan-800 px-4 py-2 font-bold text-white hover:bg-cyan-700">
            Crear Cuenta
          </button>
        </Link>

        <Link to={RoutePaths.LOGIN}>
          <button className="m-2 rounded bg-cyan-800 px-4 py-2 font-bold text-white hover:bg-cyan-700">
            Iniciar Sesión
          </button>
        </Link>
      </div>
    </div>

    <Footer />
  </div>
);
