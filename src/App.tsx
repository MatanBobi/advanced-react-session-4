import { Pokemons } from "./Pokemons";
import { Outlet } from "react-router-dom";
import { NetworkStatusProvider } from "./NetworkStatusProvider";
import "./App.css";

function App() {
  return (
    <div className="layout dark:bg-gray-900 dark:text-white text-slate-800 h-full">
      <NetworkStatusProvider>
        <Pokemons />
        <Outlet />
      </NetworkStatusProvider>
    </div>
  );
}

export default App;
