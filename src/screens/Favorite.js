import { Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { getPokemonsFavoriteApi } from "../API/favorite";
import useAuth from "../hooks/useAuth";
import { getPokemonDetailsApi } from "../API/pokemon";
import PokemonList from "../components/PokemonList";
import NotLogged from "../components/NotLogged";

export default function Favorite() {
  const [pokemons, setPokemons] = useState([]);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      if (auth) {
        (async () => {
          const response = await getPokemonsFavoriteApi();
          const pokemonsArray = [];
          for await (const id of response) {
            const pokemonDetail = await getPokemonDetailsApi(id);
            pokemonsArray.push({
              id: pokemonDetail.id,
              name: pokemonDetail.name,
              type: pokemonDetail.types[0].type.name,
              order: pokemonDetail.order,
              image:
                pokemonDetail.sprites.other["official-artwork"].front_default,
            });
          }
          setPokemons(pokemonsArray);
        })();
      }
    }, [auth])
  );

  return !auth ? <NotLogged /> : <PokemonList pokemons={pokemons} />;
}
