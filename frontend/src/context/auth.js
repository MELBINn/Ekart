import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
    userId: "",
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;
 //check blogapp createpost page
  // const handleCreate=async (e)=>{
  //   e.preventDefault()
  //   const post={
  //     title,
  //     desc,
  //     username:user.username,
  //     userId:user._id,
  //     categories:cats
  //   }

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
        userId: parseData._userId,
      });
    }
    //eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };