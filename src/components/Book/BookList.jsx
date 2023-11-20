import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { RoutePaths } from "../../general/RoutePaths.jsx";
import { useUser } from "../../context/UserContext";

const BookList = ({ showOnlyUserBooks }) => {
  const { user } = useUser();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        if (showOnlyUserBooks) {
          const response = await axios.get("/user/myBooks");
          setBooks(response.data);
        } else {
          const response = await axios.get("/books");
          setBooks(response.data);
        }
      } catch (error) {
        console.error("Error al obtener los libros:", error);
      }
    };

    getBooks();
  }, []);

  return (
    <div className="p-5">
      {!showOnlyUserBooks && (
        <h2 className="mb-5 text-3xl">Biblioteca General</h2>
      )}
      {showOnlyUserBooks && <h2 className="mb-5 text-2xl">Mis Libros</h2>}
      {books
        .slice()
        .reverse()
        .map((book) => (
          <div key={book._id} className="mb-5 rounded-lg bg-cyan-800 p-5">
            <h3 className="mb-2 text-2xl font-semibold text-cyan-100 md:text-cyan-100">
              {book.title}
            </h3>
            <div className="text-yellow-500">
              <p>
                <span className="font-semibold text-white">Autor:</span>{" "}
                {book.author}
              </p>
              <p>
                <span className="font-semibold text-white">Género:</span>{" "}
                {book.genre}
              </p>
              <p>
                <span className="font-semibold text-white">Año:</span>{" "}
                {book.year}
              </p>
              <p>
                <span className="font-semibold text-white">Valoración:</span>{" "}
                {book.rating}
              </p>
              <p>
                <span className="font-semibold text-white">Resumen:</span>{" "}
                {book.summary}
              </p>
            </div>
            {book.user === user._id && (
              <div className="controls flex gap-2 pt-4">
                <Link
                  className="btn rounded bg-cyan-600 px-4 py-2 font-bold text-white"
                  to={RoutePaths.EDITBOOK.replace(":id", book._id)}
                >
                  <FontAwesomeIcon icon={faPencil} /> Editar
                </Link>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default BookList;
