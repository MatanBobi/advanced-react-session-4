import { Pokemon } from "./types";
import { memo, useTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMainImageUrl } from "./utils";
import { Spinner } from "./Spinner/Spinner";

export const PokemonItem = memo(function ({
  pokemon,
  onChange,
  isCaught,
}: {
  pokemon: Pokemon;
  onChange: (pokemon: Pokemon, caught: boolean) => void;
  isCaught: boolean;
}) {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      onClick={() => {
        startTransition(() => {
          navigate(`/pokemons/${pokemon.name}`);
        });
      }}
      className="px-4 py-5 border-t border-t-slate-300 hover:bg-slate-200 font-medium dark:border-t-gray-600 dark:text-white dark:hover:bg-gray-700 dark:bg-gray-800 flex items-center justify-between"
    >
      <div className="flex gap-2 items-center">
        <img
          className="w-10"
          src={getMainImageUrl(pokemon.name)}
          alt={pokemon.name}
        />
        <span className="capitalize">{pokemon.name}</span>
      </div>
      <div className="flex gap-2">
        {isPending ? (
          <Spinner />
        ) : (
          <input
            type="checkbox"
            checked={isCaught}
            onChange={() => {
              onChange(pokemon, !isCaught);
            }}
          />
        )}
      </div>
    </div>
  );
});
