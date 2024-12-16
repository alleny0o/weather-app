import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthMiddleware = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const currentTime = Math.floor(Date.now() / 1000);
      const decoded = jwtDecode(token);

      if (decoded.exp < currentTime) {
        // Token expired
        localStorage.removeItem("token");
        navigate("/login"); // Redirect to login page
      }
    }
  }, [navigate]);

  return children;
};

export default AuthMiddleware;
