import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../context/AuthContext";

const HomeScreen = () => {
  const { logout, user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Benvingut, {user?.name || "Usuari"}!</Text>
        <Text style={styles.subtitle}>
          Aquesta es la teva pantalla principal (buid de moment).
        </Text>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Tancar Sessió</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3E0",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3E2723",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#5D4037",
    textAlign: "center",
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: "#E53935",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeScreen;
