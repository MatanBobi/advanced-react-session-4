import { rest } from "msw";

export const handlers = [
  rest.get("*/api/v2/pokemon", (req, res, ctx) => {
    return res(
      ctx.json({
        count: 1154,
        next: "https://pokeapi.co/api/v2/pokemon?offset=10&limit=10",
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
          { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
          { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
          { name: "charmeleon", url: "https://pokeapi.co/api/v2/pokemon/5/" },
          { name: "charizard", url: "https://pokeapi.co/api/v2/pokemon/6/" },
          { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
          { name: "wartortle", url: "https://pokeapi.co/api/v2/pokemon/8/" },
          { name: "blastoise", url: "https://pokeapi.co/api/v2/pokemon/9/" },
          { name: "caterpie", url: "https://pokeapi.co/api/v2/pokemon/10/" },
        ],
      })
    );
  }),
  rest.get("*/api/v2/pokemon/bulbasaur", (req, res, ctx) => {
    return res(
      ctx.json({
        height: 7,
        name: "bulbasaur",
        sprites: {
          back_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
          back_female: null,
          back_shiny:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
          back_shiny_female: null,
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          front_female: null,
          front_shiny:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
          front_shiny_female: null,
        },
        weight: 69,
      })
    );
  }),
];
