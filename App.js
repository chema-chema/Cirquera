import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import { AuthProvider } from "./context/AuthContext";

export default function App() {
  const [screens, setScreens] = useState("REGISTER");

  return (
    <AuthProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        {screens === "HOME" && <HomeScreen />}
        {screens === "LOGIN" && <LoginScreen />}
        {screens === "REGISTER" && <RegisterScreen />}
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
