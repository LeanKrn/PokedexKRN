import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Keyboard,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { useFormik, validateYupSchema } from "formik";
import * as Yup from "yup";
import { user, userDetail } from "../../utils/userDB";
import useAuth from "../../hooks/useAuth";

export default function LoginForm() {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validateSchema()),
    validateOnChange: false,
    onSubmit: ({ username, password }) => {
      setError("");
      if (username !== user.username || password !== user.password) {
        // setError("usuario o contraseña incorrecta");
        ToastAndroid.show(
          "El usuario o contraseña son incorrectos",
          ToastAndroid.SHORT
        );
      } else {
        login(userDetail);
      }
    },
  });

  return (
    <View>
      <Text style={styles.title}> Iniciar sesion </Text>
      <TextInput
        placeholder="Nombre de usuario"
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.username}
        onChangeText={(text) => formik.setFieldValue("username", text)}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />
      <View style={styles.ButtonContent}>
        <Button title="Entrar" onPress={formik.handleSubmit} />
      </View>

      {/* <Text style={styles.error}>
        {ToastAndroid.showWithGravityAndOffset(
          "Mensaje de ejemplo",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
          { backgroundColor: "#f00" }
        )}
      </Text> */}
      {/* <Text style={styles.error}>{ToastAndroid.show(formik.errors.password, ToastAndroid.SHORT)}</Text> */}
      {/* estos 2 de aca arriba son las burbujitas flotantes de android, no las uso por q me rompe la app asi pero capaz para otra cosa sirve */}
      <Text style={styles.error}>{formik.errors.username}</Text>
      <Text style={styles.error}>{formik.errors.password}</Text>

      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

function initialValues() {
  return {
    username: "",
    password: "",
  };
}

function validateSchema() {
  return {
    username: Yup.string().required("El usuario es obligatorio"),
    password: Yup.string()
      .required("la contraseña es obligatoria")
      .min(6, "Minimo 6 caracteres"),
  };
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  error: {
    textAlign: "center",
    color: "#f00",
    marginTop: 20,
  },
  ButtonContent: {
    alignItems: "center",
  },
});
