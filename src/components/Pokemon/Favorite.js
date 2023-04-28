import { View, Text, ToastAndroid } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  addPokemonFavorites,
  isPokemonsFavoriteApi,
  removePokemonFavoriteApi,
} from "../../API/favorite";

export default function Favorite({ id }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [reloadCheck, setReloadCheck] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await isPokemonsFavoriteApi(id);
        setIsFavorite(response || false);
      } catch (error) {
        setIsFavorite(false);
      }
    })();
  }, [id, reloadCheck]);

  const onReloadCheckFavorite = () => {
    setReloadCheck((prev) => !prev);
  };

  const addFavorite = async () => {
    try {
      await addPokemonFavorites(id);
      ToastAndroid.show("Agregado a favoritos", ToastAndroid.SHORT);
      onReloadCheckFavorite();
    } catch (error) {
      throw error;
    }
  };

  const removeFavorite = async () => {
    try {
      await removePokemonFavoriteApi(id);
      ToastAndroid.show("Eliminado de favoritos", ToastAndroid.SHORT);
      onReloadCheckFavorite();
    } catch (error) {
      throw error;
    }
  };
  return (
    <Icon
      name="heart"
      color="#fff"
      size={20}
      solid={isFavorite}
      onPress={isFavorite ? removeFavorite : addFavorite}
      style={{ marginRight: 20 }}
    />
  );
}
