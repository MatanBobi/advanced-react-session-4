import React, { use, useEffect, useState } from "react";
import { matchSorter } from "match-sorter";
import { Header } from "./Header";
import { PokemonItem } from "./PokemonItem";
import { Pokemon } from "./types";
import { useNetworkStatus } from "./useNetworkStatus";
import { fetchData } from "./helpers/data";

export function Pokemons() {
  const data = use<{ results: Pokemon[] }>(
    fetchData("https://pokeapi.co/api/v2/pokemon?limit=151")
  );
  const pokemons = data.results;
  const [caughtPokemons, setCaughtPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isOnline } = useNetworkStatus();

  const visiblePokemons = React.useMemo(() => {
    return pokemons.length
      ? matchSorter(pokemons, searchTerm, { keys: ["name"] })
      : [];
  }, [pokemons, searchTerm]);

  const handlePokemonCaught = React.useCallback(
    (pokemon: Pokemon, caught: boolean) => {
      setCaughtPokemons((prev) => {
        if (caught) {
          if (prev.includes(pokemon)) {
            return prev;
          }

          return [...prev, pokemon];
        } else {
          return prev.filter((item) => item !== pokemon);
        }
      });
    },
    [pokemons]
  );

  return (
    <div className="max-h-screen flex flex-col border-r border-r-slate-200 dark:border-r-gray-700 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm overflow-auto pretty-scroll">
      <Header
        caughtPokemonsLength={caughtPokemons.length}
        pokemonsLength={pokemons.length}
        searchTerm={searchTerm}
        onChangeSearch={setSearchTerm}
      />
      <div className="flex flex-col py-2">
        {visiblePokemons.map((pokemon) => {
          return (
            <PokemonItem
              key={pokemon.name}
              pokemon={pokemon}
              onChange={handlePokemonCaught}
              isCaught={caughtPokemons.includes(pokemon)}
            />
          );
        })}
        {pokemons.length > 0 && visiblePokemons.length === 0 && (
          <div className="px-6 py-10 text-center text-sm text-slate-500 dark:text-gray-400">
            No Pokémon match your search.
          </div>
        )}
        {pokemons.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-10 text-slate-400 dark:text-gray-500">
            <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-red-500 animate-spin dark:border-gray-700 dark:border-t-red-500" />
            <span className="text-sm">Loading Pokémon...</span>
          </div>
        )}
      </div>
      {!isOnline ? (
        <div
          className="network-status-message"
          role="status"
          aria-live="polite"
        >
          You're offline
        </div>
      ) : null}
    </div>
  );
}
