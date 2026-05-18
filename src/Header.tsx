export function Header({
  pokemonsLength,
  caughtPokemonsLength,
  onChangeSearch,
  searchTerm,
}: {
  pokemonsLength: number;
  caughtPokemonsLength: number;
  onChangeSearch: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
}) {
  const uncaught = pokemonsLength - caughtPokemonsLength;
  const progress = pokemonsLength
    ? Math.round((caughtPokemonsLength / pokemonsLength) * 100)
    : 0;

  return (
    <div className="sticky top-0 z-10 flex flex-col gap-4 p-5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-slate-200 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <div className="relative w-7 h-7 rounded-full bg-gradient-to-b from-red-500 to-red-600 shadow-md ring-2 ring-white dark:ring-gray-800">
          <div className="absolute inset-x-0 top-1/2 h-[2px] bg-gray-900 dark:bg-black" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white border-2 border-gray-900" />
        </div>
        <h1 className="text-lg font-bold tracking-tight text-slate-800 dark:text-white">
          Pokédex
        </h1>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-red-500 to-rose-600 p-4 text-white shadow-md">
        <div className="flex items-baseline justify-between">
          <span className="text-xs uppercase tracking-wider opacity-80">
            Uncaught
          </span>
          <span className="text-xs opacity-80">{progress}%</span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-3xl font-bold tabular-nums">{uncaught}</span>
          <span className="text-sm opacity-80">/ {pokemonsLength}</span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" strokeLinecap="round" />
        </svg>
        <input
          placeholder="Search Pokémon..."
          className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-500"
          value={searchTerm}
          onChange={(e) => onChangeSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
