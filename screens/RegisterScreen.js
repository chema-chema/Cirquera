import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

const { width } = Dimensions.get("window");

const RegisterScreen = ({ navigation }) => {
  const [step, setStep] = useState(0); // 0: Role Selection, 1: Form
  const [role, setRole] = useState(null);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useAuth();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(1);
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Por favor, rellena todos los campos");
      return;
    }
    const result = await register(name, email, password, role);
    if (!result.success) {
      alert(result.message);
    }
  };

  // Render Step 0: Role Selection (First Image)
  if (step === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.content}>
          <View style={styles.headerSection}>
            <Text style={styles.subtitle}>Abans d'iniciar...</Text>
            <Text style={styles.title}>Tria el teu rol</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.roleButton}
              activeOpacity={0.8}
              onPress={() => handleRoleSelect("talent")}
            >
              <View style={styles.buttonInner}>
                <MaterialCommunityIcons
                  name="hat-fedora"
                  size={28}
                  color="white"
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>ARTISTA</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.roleButton}
              activeOpacity={0.8}
              onPress={() => handleRoleSelect("company")}
            >
              <View style={styles.buttonInner}>
                <MaterialCommunityIcons
                  name="office-building"
                  size={28}
                  color="white"
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>EMPRESA</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footerSimple}>
          <Text style={styles.footerTextSimple}>Cirquera</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Render Step 1: Registration Form (Second Image Design)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View style={styles.contentForm}>
            <TouchableOpacity
              onPress={() => setStep(0)}
              style={styles.backButton}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={28}
                color="#3E2723"
              />
            </TouchableOpacity>

            <View style={styles.headerForm}>
              <Text style={styles.titleForm}>Crea el teu compte</Text>
              <Text style={styles.subtitleForm}>
                Registra't com a {role === "talent" ? "Artista" : "Empresa"} i
                comença la teva aventura.
              </Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nom Complet</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Joan Carles"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Correu</Text>
                <TextInput
                  style={styles.input}
                  placeholder="cirquera@gmail.com"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Contrasenya</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      { flex: 1, shadowOpacity: 0, elevation: 0 },
                    ]}
                    placeholder="**********"
                    placeholderTextColor="#999"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    <MaterialCommunityIcons
                      name={showPassword ? "eye-off" : "eye"}
                      size={24}
                      color="#999"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.mainButton}
                activeOpacity={0.8}
                onPress={handleRegister}
              >
                <Text style={styles.mainButtonText}>REGISTRAR-SE</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
                <View style={styles.googleButtonInner}>
                  <MaterialCommunityIcons
                    name="google"
                    size={24}
                    color="white"
                    style={styles.googleIcon}
                  />
                  <Text style={styles.googleButtonText}>
                    REGISTRE AMB GOOGLE
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={styles.footerLinkContainer}>
                <Text style={styles.footerLinkText}>Ja tens compte? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.registerLink}>Inicia sessió</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3E0",
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentForm: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  headerForm: {
    alignItems: "center",
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    color: "#3E2723",
    opacity: 0.7,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#3E2723",
  },
  titleForm: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#3E2723",
    marginBottom: 10,
  },
  subtitleForm: {
    fontSize: 14,
    color: "#5D4037",
    textAlign: "center",
    lineHeight: 20,
    opacity: 0.8,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: width * 0.1,
    gap: 15,
  },
  roleButton: {
    backgroundColor: "#E53935",
    paddingVertical: 18,
    borderRadius: 12,
    width: "100%",
    marginVertical: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
  },
  icon: {
    width: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 2,
    flex: 1,
    textAlign: "center",
    marginRight: 40,
  },
  form: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#3E2723",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "white",
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#3E2723",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
  },
  eyeIcon: {
    paddingRight: 15,
  },
  mainButton: {
    backgroundColor: "#E53935",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
  },
  mainButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },
  googleButton: {
    backgroundColor: "#2D1A1A",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  googleButtonInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  googleIcon: {
    marginRight: 10,
  },
  googleButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  footerSimple: {
    paddingBottom: 30,
    alignItems: "center",
  },
  footerTextSimple: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3E2723",
    opacity: 0.8,
  },
  footerLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerLinkText: {
    color: "#3E2723",
    fontSize: 14,
  },
  registerLink: {
    color: "#E53935",
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;
