import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RoutePaths } from "../general/RoutePaths.jsx";
import {
  faBook,
  faLock,
  faPlusCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../context/UserContext.jsx";

export const Navbar = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await axios.get(`/users/logout`);
      updateUser(null);
      navigate(RoutePaths.HOME);
    } catch (error) {
      console.error("Error al logearse:", error);
    }
  };

  return (
    <header className="sticky top-0 w-full">
      <nav className="border-gray-200 bg-gray-900">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <h1 className="text-white flex items-center">
            <img
              src="./logo_transparent2.png"
              alt="Logo de My Book List"
              className="mr-2 w-10 h-10"
            />
            My Book List
          </h1>
          <div className="w-full md:block md:w-auto" id="navbar-default">
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-700 bg-gray-800 p-4 font-medium rtl:space-x-reverse md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0">
              
              <li className="align-center flex justify-center">
                <Link
                  className="block rounded px-3 text-cyan-100"
                  to={RoutePaths.BOOKLIST}
                >
                  <FontAwesomeIcon icon={faBook} /> Libros
                </Link>
              </li>

              <li className="align-center flex justify-center">
                <Link
                  className="block rounded px-3 text-white"
                  to={RoutePaths.CREATEEDITBOOK}
                >
                  <FontAwesomeIcon icon={faPlusCircle} /> Nuevo libro
                </Link>
              </li>

              <li className="align-center flex justify-center">
                <Link
                  className="block rounded px-3 text-white"
                  to={RoutePaths.USERACCOUNT.replace(":id", user._id)}
                >
                  <FontAwesomeIcon icon={faUser} /> Mis Libros
                </Link>
              </li>

              <li className="align-center flex justify-center">
                <button
                  className="block rounded px-3 text-white"
                  onClick={() => logOut()}
                >
                  <FontAwesomeIcon icon={faLock} /> Cerrar Sesión
                </button>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
