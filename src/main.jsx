import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import TabPage from "./TabPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Page2 from "./Page2";
import { UnsavedChangesProvider } from "./UnsavedChangesContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "page1", element: <TabPage title="Page 1" /> },
      { path: "page2", element: <Page2 /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UnsavedChangesProvider>
    <RouterProvider router={router} />
  </UnsavedChangesProvider>
);
