import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function PokemonPage() {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const [pokemonDetails, setPokemonDetails] = useState<any>();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemonDetails(data);
      });
  }, [pokemonName]);

  if (!pokemonName) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-gray-500">
        <div className="text-6xl mb-4 opacity-40">?</div>
        <p className="text-sm">Select a Pokémon to view details</p>
      </div>
    );
  }

  const types: string[] =
    pokemonDetails?.types?.map((t: any) => t.type?.name).filter(Boolean) ?? [];

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-gray-800 shadow-xl border border-slate-200 dark:border-gray-700 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-red-500 via-rose-500 to-orange-400" />
        <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-white/10 blur-2xl" />

        <div className="relative flex flex-col items-center pt-8 pb-6 px-6">
          <div className="relative w-44 h-44 rounded-full bg-white/90 dark:bg-gray-700 shadow-lg ring-4 ring-white/40 flex items-center justify-center">
            {pokemonDetails && pokemonDetails.sprites ? (
              <img
                className="w-40 h-40 object-contain drop-shadow-lg"
                src={pokemonDetails.sprites.front_default}
                alt={pokemonDetails.name}
              />
            ) : (
              <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-red-500 animate-spin" />
            )}
          </div>

          <h1 className="capitalize text-3xl font-bold mt-5 text-slate-800 dark:text-white tracking-tight">
            {pokemonDetails?.name ?? "Loading..."}
          </h1>

          {pokemonDetails?.id && (
            <span className="mt-1 text-sm font-mono text-slate-400 dark:text-gray-500">
              #{String(pokemonDetails.id).padStart(3, "0")}
            </span>
          )}

          {types.length > 0 && (
            <div className="flex gap-2 mt-3">
              {types.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-slate-100 text-slate-700 dark:bg-gray-700 dark:text-gray-200"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {pokemonDetails && (
            <div className="grid grid-cols-2 gap-3 w-full mt-6">
              <div className="rounded-xl bg-slate-50 dark:bg-gray-700/50 p-4 text-center">
                <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-gray-400">
                  Height
                </div>
                <div className="mt-1 text-xl font-bold text-slate-800 dark:text-white">
                  {(pokemonDetails.height / 10).toFixed(1)}
                  <span className="text-sm font-medium text-slate-400 ml-1">
                    m
                  </span>
                </div>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-gray-700/50 p-4 text-center">
                <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-gray-400">
                  Weight
                </div>
                <div className="mt-1 text-xl font-bold text-slate-800 dark:text-white">
                  {(pokemonDetails.weight / 10).toFixed(1)}
                  <span className="text-sm font-medium text-slate-400 ml-1">
                    kg
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
