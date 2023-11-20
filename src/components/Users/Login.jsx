import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { RoutePaths } from "../../general/RoutePaths";

export default function Login() {
  const { updateUser } = useUser();
  const [user, setUser] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/login", user);
      console.log(response.data);
      const userId = response.data.userId;
      updateUser({ _id: userId, ...response.data.user });
      navigate(RoutePaths.BOOKLIST);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else if (error.request) {
        setMessage("No se recibió ninguna respuesta del servidor.");
      } else {
        setMessage("Ocurrió un error al iniciar sesión.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-2 sm:px-6 lg:px-8">
      <img
        className="h-auto w-1/3"
        src="/logo.png"
        alt="Logo de My Book List"
      />
      <form
        onSubmit={handleSubmit}
        className="mb-4 mt-8 w-full space-y-6 rounded border-4 border-cyan-700 bg-white px-8 pb-8 pt-6 shadow-md sm:w-1/2 md:w-2/5"
      >
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="usernameOrEmail"
          >
            Nombre o Correo electrónico
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="usernameOrEmail"
            name="usernameOrEmail"
            type="text"
            placeholder="Nombre o Email"
            onChange={handleChange}
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
            name="password"
            type="password"
            placeholder="**********"
            autoComplete="current-password"
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="flex items-center justify-between">
          <button
            className="focus:shadow-outline rounded bg-cyan-700 px-4 py-2 font-bold text-white hover:bg-cyan-800 focus:outline-none"
            type="submit"
          >
            Iniciar sesión
          </button>
        </div>
        {message && <p className="text-xs italic text-red-500">{message}</p>}
      </form>
    </div>
  );
}
