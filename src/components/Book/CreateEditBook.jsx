import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CreateEditBook = () => {
  const params = useParams();
  const { user } = useUser();
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    summary: "",
    year: "",
    rating: "",
    user: user._id,
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getEditingBook = async () => {
      try {
        const response = await axios.get(`/books/${params.id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Hubo un error al obtener los libros:", error);
      }
    };

    if (params.id) getEditingBook();
  }, []);

  const handleNumericChange = (e) => {
    const value = Number(e.target.value);
    setBook({
      ...book,
      [e.target.name]: value,
    });
  };

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user || !user._id) {
      toast.error("Usuario no encontrado o sin ID");
      return;
    }

    const data = {
      ...book,
      user: user._id,
    };
    const request = params.id
      ? axios.put(`/books/${params.id}`, data)
      : axios.post("/books", data);

    request
      .then(() => {
        if (params.id) {
          toast.success("Libro guardado correctamente");
        } else {
          toast.success("Nuevo Libro creado correctamente");
        }
        handleGoBack();
      })
      .catch((error) => {
        const message = error?.response?.data?.message;
        if (params.id) {
          setMessage(message || "Hubo un error al guardar cambios");
        } else {
          setMessage(message || "Hubo un error al crear el libro");
        }
      });
  };

  const handleDeleteBook = async () => {
    try {
      await axios.delete(`/books/${params.id}`);
      toast.success("Libro borrado correctamente");
    } catch (error) {
      console.error("Hubo un error al eliminar el libro:", error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center"
      style={{ background: `url(/BackgroundBook.jpg) center/cover fixed` }}
    >
      <div className="flex min-h-screen  w-full items-center justify-center bg-transparent py-2 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-4 w-4/5 rounded border-4 border-cyan-700 bg-white p-8 shadow-md sm:w-2/3 md:w-1/2 lg:w-1/2"
        >
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="title"
            >
              Título
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="title"
              name="title"
              type="text"
              placeholder="Título"
              value={book.title}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="author"
            >
              Autor
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="author"
              name="author"
              type="text"
              placeholder="Autor"
              value={book.author}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="genre"
            >
              Género
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="genre"
              name="genre"
              type="text"
              placeholder="Género"
              value={book.genre}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="summary"
            >
              Descripción
            </label>
            <textarea
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="summary"
              name="summary"
              type="text"
              placeholder="Descripción"
              value={book.summary}
              onChange={handleChange}
              required
              style={{ textAlign: "justify" }}
            />
          </div>
          <br />
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="year"
            >
              Año
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="year"
              name="year"
              type="number"
              placeholder="Año"
              value={book.year}
              onChange={handleNumericChange}
              required
            />
          </div>
          <br />
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="rating"
            >
              Calificación min: 0, máx: 5
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="rating"
              name="rating"
              type="number"
              placeholder="Calificación"
              value={book.rating}
              onChange={handleNumericChange}
              required
            />
          </div>
          {message && (
            <div className="mt-4 font-bold text-red-600">{message}</div>
          )}
          <br />
          <div className="mt-4 flex items-center justify-center space-x-4">
            {params.id && (
              <button
                className="btn rounded bg-red-500 px-4 py-2 font-bold text-white"
                onClick={() => handleDeleteBook()}
              >
                <FontAwesomeIcon icon={faTrash} /> Eliminar
              </button>
            )}
            {!params.id && <span>&nbsp;</span>}
            <button
              className="focus:shadow-outline rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-cyan-800 focus:outline-none"
              type="button"
              onClick={handleGoBack}
            >
              Cancelar
            </button>
            <button
              className="focus:shadow-outline rounded bg-cyan-600 px-4 py-2 font-bold text-white hover:bg-cyan-900 focus:outline-none"
              type="submit"
            >
              {params.id ? "Guardar Cambios" : "Añadir libro"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditBook;
