import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Spinner } from "./Spinner/Spinner";
import { ErrorBoundary } from "./ErrorBoundary";

const PokemonPage = React.lazy(() => import("./PokemonPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "pokemons/:pokemonName",
        element: (
          <Suspense fallback={<Spinner />}>
            <PokemonPage />
          </Suspense>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
