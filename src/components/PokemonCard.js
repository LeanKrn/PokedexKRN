import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import React from "react";
import getColorByPokemonType from "../utils/getColorByPokemonType";
import { capitalize } from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function PokemonCard({ pokemon }) {
  const pokemonColor = getColorByPokemonType(pokemon.type);
  const bgStyles = { backgroundColor: pokemonColor, ...styles.bgStyles };
  const navigation = useNavigation();

  const goToPokemon = () => {
    navigation.navigate("PokemonNavigation", { id: pokemon.id });
  };

  return (
    <Pressable onPress={goToPokemon}>
      <View style={styles.card}>
        <View style={styles.spacing}>
          <View style={bgStyles}>
            <Text style={styles.number}>
              #{`${pokemon.order}`.padStart(3, 0)}
            </Text>
            <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
            <Image source={{ uri: pokemon.image }} style={styles.image} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 200,
  },
  spacing: {
    flex: 1,
    paddingHorizontal: 10,
    // paddingTop: 120,
  },
  bgStyles: {
    borderRadius: 15,
    width: 180,
    padding: 20,
    paddingTop: 140,
  },
  number: {
    position: "absolute",
    right: 10,
    top: 13,
    color: "#fff",
    fontSize: 11,
  },
  name: {
    position: "absolute",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    top: 10,
    left: 10,
  },
  image: {
    position: "absolute",
    bottom: 3,
    right: 10,
    width: 130,
    height: 120,
  },
});
