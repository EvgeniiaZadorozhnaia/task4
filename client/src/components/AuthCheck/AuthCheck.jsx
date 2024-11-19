import axiosInstance, { setAccessToken } from "../../axiosInstance";
const { VITE_API, VITE_BASE_URL } = import.meta.env;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthCheck({ user, setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    const initialUser = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("user");

      if (accessToken && storedUser) {
        setAccessToken(accessToken);
        setUser(JSON.parse(storedUser));

        try {
          const res = await axiosInstance(
            `${VITE_BASE_URL}${VITE_API}/tokens/refresh`
          );
          setUser(res.data.user);
          setAccessToken(res.data.accessToken);
          localStorage.setItem("accessToken", res.data.accessToken);
          navigate(`/users`);
        } catch (error) {
          console.error("Error refreshing tokens", error);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          navigate(`/registration`);
        }
      } else {
        navigate(`/registration`);
      }
    };

    initialUser();
  }, []);
  return;
}

export default AuthCheck;
