import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import router from "./routes/routes.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
    <ErrorBoundary>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </ErrorBoundary>
);
