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
  return (
    <div className="flex flex-col gap-2 p-3">
      <aside>Uncaught Pokemons: {pokemonsLength - caughtPokemonsLength}</aside>
      <input
        className="dark:bg-gray-700"
        value={searchTerm}
        onChange={(e) => onChangeSearch(e.target.value)}
      />
    </div>
  );
}
