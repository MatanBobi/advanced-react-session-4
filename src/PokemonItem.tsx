import { Pokemon } from "./types";
import { memo, useTransition } from "react";
import { useNavigate } from "react-router-dom";
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
      className={`group relative mx-3 my-1.5 px-3 py-2.5 rounded-xl flex items-center justify-between transition-all duration-200 float-on-hover cursor-pointer
        ${
          isCaught
            ? "bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800"
            : "bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700 hover:shadow-md"
        }`}
    >
      <div className="flex gap-3 items-center min-w-0">
        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center shrink-0 ring-1 ring-slate-200 dark:ring-gray-600">
          <img
            className="w-10 h-10 object-contain drop-shadow"
            src={getMainImageUrl(pokemon.name)}
            alt={pokemon.name}
          />
        </div>
        <span className="capitalize font-semibold text-slate-800 dark:text-white truncate">
          {pokemon.name}
        </span>
      </div>
      {isPending ? (
        <Spinner />
      ) : (
        <label
          className="flex items-center justify-center shrink-0 ml-2"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            className="peer sr-only"
            checked={isCaught}
            onChange={() => {
              onChange(pokemon, !isCaught);
            }}
          />
          <span
            className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all
              ${
                isCaught
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "border-slate-300 dark:border-gray-600 group-hover:border-red-400"
              }`}
          >
            {isCaught && (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </span>
        </label>
      )}
    </div>
  );
});
