import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { getPokemons, getPokemonsDetailsByUrlApi } from "../API/pokemon";
import PokemonList from "../components/PokemonList";

export default function PokedexScreen() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
  );
  useEffect(() => {
    (async () => {
      await loadPokemons(1);
    })();
  }, []);

  const loadPokemons = async (isForNext) => {
    try {
      const response = await getPokemons(nextUrl);
      console.log("next", isForNext, "peticion", nextUrl);
      typeof isForNext !== Number && setNextUrl(response.next);
      const pokemonsArray = [];
      for await (const pokemon of response.results) {
        const pokemonDetail = await getPokemonsDetailsByUrlApi(pokemon.url);
        pokemonsArray.push({
          id: pokemonDetail.id,
          name: pokemonDetail.name,
          type: pokemonDetail.types[0].type.name,
          order: pokemonDetail.order,
          image: pokemonDetail.sprites.other["official-artwork"].front_default,
        });
      }

      setPokemons([...pokemons, ...pokemonsArray]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <PokemonList
        pokemons={pokemons}
        loadPokemons={loadPokemons}
        isNext={nextUrl}
      />
    </View>
  );
}
