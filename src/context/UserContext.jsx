import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const userFromLocal = JSON.parse(localStorage.getItem("MyUser") || "{}");
  const [user, setUser] = useState(userFromLocal?._id ? userFromLocal : null);

  const updateUser = (userData) => {
    if (userData) localStorage.setItem("MyUser", JSON.stringify(userData));
    else localStorage.removeItem("MyUser");
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser utilizado dentro de un UserProvider");
  }
  return context;
};
