import React, { Suspense, useEffect, useState } from "react";
import { matchSorter } from "match-sorter";
import { Header } from "./Header";
import { PokemonItem } from "./PokemonItem";
import { Pokemon } from "./types";
import { useNetworkStatus } from "./useNetworkStatus";
import { use } from "./hooks/use";
import { fetchData } from "./helpers/data";
import { Spinner } from "./Spinner/Spinner";

export function PokemonsContainer() {
  const [caughtPokemons, setCaughtPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isOnline } = useNetworkStatus();

  const data = use(fetchData("https://pokeapi.co/api/v2/pokemon?limit=151"));
  const pokemons: Pokemon[] = data.results;

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
    <div>
      <Header
        caughtPokemonsLength={caughtPokemons.length}
        pokemonsLength={pokemons.length}
        searchTerm={searchTerm}
        onChangeSearch={setSearchTerm}
      />
      <>
        {visiblePokemons.map((pokemon) => {
          return (
            <Suspense key={pokemon.name} fallback={<Spinner />}>
              <PokemonItem
                pokemon={pokemon}
                onChange={handlePokemonCaught}
                isCaught={caughtPokemons.includes(pokemon)}
              />
            </Suspense>
          );
        })}
      </>
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
