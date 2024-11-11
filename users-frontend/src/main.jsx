import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Main } from "./components/Main/Main.jsx";
import { Article } from "./components/Article/Article.jsx";
import { SignIn } from "./components/SignIn/SignIn.jsx";
import { SignUp } from "./components/SignUp/SignUp.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Main /> },
      { path: "post/:id", element: <Article /> },
      { path: "signIn", element: <SignIn /> },
      { path: "SignUp", element: <SignUp /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
