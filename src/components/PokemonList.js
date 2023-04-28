import { FlatList, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import PokemonCard from "./PokemonCard";

export default function PokemonList({ pokemons, loadPokemons, isNext }) {
  const loadMore = () => {
    loadPokemons(true);
  };

  return (
    <FlatList
      data={pokemons}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(pokemon, index) => String(index)}
      renderItem={({ item }) => <PokemonCard pokemon={item} />}
      contentContainerStyle={styles.flatListContent}
      onEndReached={isNext && loadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        isNext && <ActivityIndicator size="large" style={styles.spinner} />
      }
    />
  );
}

const styles = StyleSheet.create({
  flatListContent: {
    paddingHorizontal: 5,
    alignItems: "center",
    paddingTop: 40,
  },
  spinner: {
    marginTop: 20,
    marginBottom: 60,
  },
});

// con plataform de react native podemos seleccionar que cambios se agregan a android o ios
