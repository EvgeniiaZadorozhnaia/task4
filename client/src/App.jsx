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
      // Проверяем наличие токена в localStorage
      const accessToken = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("user");

      if (accessToken && storedUser) {
        // Если токен и пользователь есть в localStorage, устанавливаем их в состояние
        setAccessToken(accessToken); // Устанавливаем токен
        setUser(JSON.parse(storedUser)); // Устанавливаем пользователя

        // Дополнительно можно попробовать обновить данные о пользователе
        try {
          const res = await axiosInstance(
            `${VITE_BASE_URL}${VITE_API}/tokens/refresh`
          );
          setUser(res.data.user); // Обновляем пользователя
          setAccessToken(res.data.accessToken); // Обновляем токен
          localStorage.setItem("accessToken", res.data.accessToken); // Сохраняем новый токен
        } catch (error) {
          console.error("Error refreshing tokens", error);
          // Если обновление токена не удалось, очищаем данные
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
        }
      }
    };

    initialUser(); // Вызываем функцию при загрузке компонента
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
