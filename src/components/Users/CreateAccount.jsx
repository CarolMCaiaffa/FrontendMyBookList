import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../general/RoutePaths";
import { useUser } from "../../context/UserContext";

const CreateAccount = () => {
  const { updateUser } = useUser(); 
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/register", user);
      updateUser(response.data.user); 
      setIsRegistered(true); 
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      
      setMessage(errorMessage || "Ocurrió un error al crear la cuenta.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-2 sm:px-6 lg:px-8">
      <div className="full-w flex items-center justify-center">
        <img className="h-auto w-1/3" src="/logo.png" alt="logo" />
        {!isRegistered && (
          <form
            onSubmit={handleSubmit}
            className="mb-4 mt-8 w-full sm:w-1/2 md:w-2/5 space-y-6 rounded border-4 border-cyan-700 bg-white px-8 pb-8 pt-6 shadow-md"
          >
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="username"
              >
                Nombre de usuaria/o
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="username"
                type="text"
                placeholder="Nombre"
                name="username"
                onChange={handleInputChange}
                required
              />
            </div>
            <br />
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Correo electrónico
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleInputChange}
                required
              />
            </div>
            <br />
            <div className="mb-6">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="password"
                type="password"
                placeholder="********"
                name="password"
                onChange={handleInputChange}
                required
              />
              <div className="text-xs text-gray-500 mt-1">
                Debe tener entre 6 y 12 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.
              </div>
            </div>
            {message && <p className="m-0 font-bold text-red-600">{message}</p>}
            <div className="flex items-center justify-between space-x-4">
              <button
                className={`focus:shadow-outline rounded bg-cyan-700 px-4 py-2 font-bold text-white hover:bg-cyan-800 focus:outline-none`}
                type="submit"
              >
                Crear Cuenta
              </button>
            </div>
          </form>
        )}
        {isRegistered && (
          <div className="mb-4 mt-8 w-full sm:w-1/2 md:w-2/5 space-y-6 rounded border-4 border-cyan-700 bg-white px-8 pb-8 pt-6 shadow-md">
            <p className="mb-4">
              Usuaria/o <strong>{user.username}</strong> registrada correctamente.
              <br />
              Ahora puedes acceder a tu cuenta.
            </p>
            <Link to={RoutePaths.LOGIN}>
              <button
                className={`rounded bg-cyan-800 px-4 py-2 font-bold text-white hover:bg-cyan-700 ${
                  isRegistered ? "" : "cursor-not-allowed"
                }`}
                disabled={!isRegistered}
              >
                Iniciar Sesión
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAccount;
