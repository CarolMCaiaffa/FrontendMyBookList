import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../components/ErrorFallback.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { useUser } from "../context/UserContext";

export const AppLayout = ({ children }) => {
  const { user } = useUser();

  if (!user?._id) {
    return (
      <div className="bg-grey-300 flex h-full w-full items-center justify-center">
        <h1 className="font-bold text-red-500">No Autorizado...</h1>
      </div>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Navbar />
      {children}
    </ErrorBoundary>
  );
};
