import { createContext, useContext, useEffect, useState } from "react";
import api from "../Services/axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // Store logged-in user
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      const res = await api.get("/me"); // Your GET /me API
      setUser(res.data);               // Store user globally
    } catch (err) {
      console.error("USER FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
