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

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div>
        {pokemonDetails && pokemonDetails.sprites && (
          <img
            src={pokemonDetails.sprites.front_default}
            alt={pokemonDetails.name}
          />
        )}
      </div>
      <div>
        <h1 className="capitalize">{pokemonDetails?.name}</h1>
        <p>Height: {pokemonDetails?.height}</p>
        <p>Weight: {pokemonDetails?.weight}</p>
      </div>
    </div>
  );
}
