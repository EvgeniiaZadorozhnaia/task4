import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import Page404 from "./pages/Page404";
import UsersPage from "./pages/UsersPage/UsersPage";
import AuthCheck from "./components/AuthCheck/AuthCheck";

function App() {
  const [user, setUser] = useState();

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <AuthCheck user={user} setUser={setUser} />,
      },
      {
        path: "/registration",
        element: <RegistrationPage type="registration" setUser={setUser} />,
      },
      {
        path: "/login",
        element: <RegistrationPage type='login' setUser={setUser} />,
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
