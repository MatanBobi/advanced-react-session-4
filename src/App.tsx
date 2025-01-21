import { Pokemons } from "./Pokemons";
import { Outlet } from "react-router-dom";
import { NetworkStatusProvider } from "./NetworkStatusProvider";
import "./App.css";
import { PokemonPage } from "./PokemonPage";

function App() {
  return (
    <div className="layout dark:bg-gray-800  dark:text-white h-full">
      <NetworkStatusProvider>
        <Pokemons />
        <Outlet />
      </NetworkStatusProvider>
    </div>
  );
}

export default App;
