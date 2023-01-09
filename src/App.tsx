import { lazy, Suspense } from "react";
import { PokemonsContainer } from "./PokemonsContainer";
import { Route, Switch } from "react-router-dom";
import { NetworkStatusProvider } from "./NetworkStatusProvider";
import { Spinner } from "./Spinner/Spinner";
import "./App.css";
import { ErrorBoundary } from "./ErrorBoundary";

const PokemonPage = lazy(() => import("./PokemonPage"));

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <NetworkStatusProvider>
            <Switch>
              <Route path="/pokemon/:pokemonId" component={PokemonPage} />
              <Route path="/" component={PokemonsContainer} />
            </Switch>
          </NetworkStatusProvider>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
