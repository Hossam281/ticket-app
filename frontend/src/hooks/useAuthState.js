import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuthState = () => {
  const { user } = useSelector((state) => state.auth);

  // Initialize loggedIn state based on whether user is initially available
  const [loggedIn, setLoggedIn] = useState(!!user);

  // Update loggedIn state when user changes
  useEffect(() => {
    setLoggedIn(!!user);
  }, [user]);

  return loggedIn;
};
