import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import Contacts from "./pages/Contacts";
import AddContact from "./pages/AddContact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Contacts /> },
      { path: "/add", element: <AddContact /> },
      { path: "/edit/:id", element: <AddContact /> },
    ],
  },
]);