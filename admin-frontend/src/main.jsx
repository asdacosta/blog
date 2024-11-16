import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Main } from "./components/Main/Main.jsx";
import { PostForm } from "./components/PostForm/PostForm.jsx";
import { Comments } from "./components/Comments/Comments.jsx";
import { Published } from "./components/Published/Published.jsx";
import { Unpublished } from "./components/Unpublished/Unpublished.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Main /> },
      { path: "new-post", element: <PostForm /> },
      { path: "comments", element: <Comments /> },
      { path: "published", element: <Published /> },
      { path: "unpublished", element: <Unpublished /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
