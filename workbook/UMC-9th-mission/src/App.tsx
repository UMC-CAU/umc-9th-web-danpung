import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import GoogleRedirectPage from "./pages/GoogleRedirectPage";
import UsermePage from "./pages/UsermePage";
import ProtectedRoute from "./components/ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
      {
        path: "v1/auth/google/callback",
        element: <GoogleRedirectPage />,
      },
      {
        path: "v1/users/me",
        element: (
          <ProtectedRoute>
            <UsermePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
