import { PokemonsContainer } from "./PokemonsContainer";
import { Route, Switch } from "react-router-dom";
import { NetworkStatusProvider } from "./NetworkStatusProvider";
import "./App.css";
import { PokemonPage } from "./PokemonPage";

function App() {
  return (
    <div className="App">
      <NetworkStatusProvider>
        <Switch>
          <Route path="/pokemon/:pokemonId" component={PokemonPage} />
          <Route path="/" component={PokemonsContainer} />
        </Switch>
      </NetworkStatusProvider>
    </div>
  );
}

export default App;
