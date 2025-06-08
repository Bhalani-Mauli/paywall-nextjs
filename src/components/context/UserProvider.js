"use client";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const userResponse = await fetch("/api/user/profile");
      console.log("User response:", userResponse);
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData.user);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
