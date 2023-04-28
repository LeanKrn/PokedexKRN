import { View, Text, StyleSheet, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { getPokemonsFavoriteApi } from "../../API/favorite";

export default function UserData() {
  const { auth, logout } = useAuth();
  const [total, setTotal] = useState(0);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await getPokemonsFavoriteApi();
          setTotal(response?.length || 0);
        } catch (error) {
          setTotal(0);
        }
      })();
    }, [])
  );

  return (
    <View style={styles.content}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Bienvenido,</Text>
        <Text style={styles.title}>{` ${auth.username}`}</Text>
      </View>
      <View style={styles.dataContent}>
        <ItemMenu title="nombre" text={` ${auth.firtsName} ${auth.lastName}`} />
        <ItemMenu title="User Name" text={` ${auth.username}`} />
        <ItemMenu title="Email" text={` ${auth.email}`} />
        <ItemMenu title="Total de favoritos" text={`${total} Pokemons`} />
      </View>
      <Button title="Cerrar sesion" onPress={logout} />
    </View>
  );
}

function ItemMenu({ title, text }) {
  return (
    <View style={styles.itemMenu}>
      <Text style={styles.titleItem}>{title}: </Text>
      <Text style={styles.textItem}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleBlock: {
    marginBottom: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  dataContent: {
    marginBottom: 20,
  },
  itemMenu: {
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#cfcfcf",
  },
  titleItem: {
    fontWeight: "bold",
    paddingRight: 10,
    width: 120,
  },
});
