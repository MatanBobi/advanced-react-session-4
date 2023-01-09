import { Pokemon } from "./types";
import { memo, useTransition } from "react";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="pokemon-row">
      <div
        onClick={() => {
          startTransition(() => {
            history.push(`/pokemon/${pokemon.name}`);
          });
        }}
      >
        {pokemon.name}
      </div>
      <input
        type="checkbox"
        checked={isCaught}
        onChange={() => {
          onChange(pokemon, !isCaught);
        }}
      />
      {isPending ? <Spinner /> : null}
    </div>
  );
});
