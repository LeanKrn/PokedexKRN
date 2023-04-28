import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { capitalize, map } from "lodash";
import getColorByPokemonType from "../../utils/getColorByPokemonType";

export default function Type({ types }) {
  return (
    <View style={styles.content}>
      {map(types, (item, index) => (
        <View
          key={index}
          style={{
            ...styles.pill,
            backgroundColor: getColorByPokemonType(item.type.name),
          }}
        >
          <Text
            style={{
              color: getContrastColor(getColorByPokemonType(item.type.name)),
            }}
          >
            {capitalize(item.type.name)}
          </Text>
        </View>
      ))}
    </View>
  );
}

function getContrastColor(color) {
  // calcular el brillo relativo del color de fondo
  let r = parseInt(color.substr(1, 2), 16);
  let g = parseInt(color.substr(3, 2), 16);
  let b = parseInt(color.substr(5, 2), 16);
  let luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  // retornar el color de texto adecuado según el brillo relativo
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

const styles = StyleSheet.create({
  content: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pill: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 10,
  },
});
