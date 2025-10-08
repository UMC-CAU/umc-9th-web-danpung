import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/rootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
