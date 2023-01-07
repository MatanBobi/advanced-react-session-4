import { Pokemon } from "./types";
import { memo } from "react";
import { Link } from "react-router-dom";

export const PokemonItem = memo(function ({
  pokemon,
  onChange,
  isCaught,
}: {
  pokemon: Pokemon;
  onChange: (pokemon: Pokemon, caught: boolean) => void;
  isCaught: boolean;
}) {
  return (
    <div className="pokemon-row">
      <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
      <input
        type="checkbox"
        checked={isCaught}
        onChange={() => {
          onChange(pokemon, !isCaught);
        }}
      />
    </div>
  );
});
