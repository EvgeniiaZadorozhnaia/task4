import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import UsersPage from "./pages/UsersPage";
import axiosInstance, { setAccessToken } from "./axiosInstance";
const { VITE_API, VITE_BASE_URL } = import.meta.env;

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const initialUser = async () => {
      const accesToken = localStorage.getItem("accessToken");
      if (accesToken) {
        setAccessToken(accesToken);
        try {
          const res = await axiosInstance(
            `${VITE_BASE_URL}${VITE_API}/tokens/refresh`
          );
          setUser(res.data.user);
          setAccessToken(res.data.accesToken);
          localStorage.setItem("accessToken", res.data.accesToken);
        } catch (error) {
          console.error("Error refreshing tokens", error);
        }
      }
    };

    initialUser();
  }, []);

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <RegistrationPage setUser={setUser} />,
      },
      {
        path: "/login",
        element: <LoginPage setUser={setUser} />,
      },
      {
        path: "/*",
        element: <Page404 />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
    ],
    {
      future: {
        v7_normalizeFormMethod: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
