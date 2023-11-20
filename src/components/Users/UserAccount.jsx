import { useUser } from "../../context/UserContext";
import BookList from "../Book/BookList";

export const UserAccount = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-cyan-700 text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform opacity-25">
        <img src="/logo_transparent.png" alt="Logo" className="h-auto w-96" />
      </div>

      <div className="px-10 py-5">
        <h1 className="pb-3 text-4xl">Biblioteca Personal</h1>
        {user && (
          <div>
            <p className="py-1">Bienvenida/o, {user.username}</p>
            <p className="py-1">email: {user.email}</p>
          </div>
        )}
      </div>

      <div className="p-5">
        <BookList showOnlyUserBooks={true} />
      </div>
    </div>
  );
};
