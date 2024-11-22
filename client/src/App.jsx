import { useState } from "react";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import AuthCheck from "./components/AuthCheck/AuthCheck";

function App() {
  const [user, setUser] = useState();

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <AuthCheck setUser={setUser} />,
      },
      {
        path: "/registration",
        element: (
          <RegistrationPage type="registration" user={user} setUser={setUser} />
        ),
      },
      {
        path: "/login",
        element: (
          <RegistrationPage type="login" user={user} setUser={setUser} />
        ),
      },
      {
        path: "/users",
        element:
          user && user.status === "active" ? (
            <UsersPage/>
          ) : (
            <Link to="/login" />
          ),
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
