import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
  },
  {
    path: "/auth",
    element: <AdminLayout />,
    children: [
      {
        path: `login`,
        element: <div>Login</div>,
      },
      {
        path: `register`,
        element: <div>Register</div>,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
