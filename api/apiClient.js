import axios from "axios";
import * as SecureStore from "expo-secure-store";

// IMPORTANTE: Cambia 'LOCALHOST' por tu dirección IP real (ej. 192.168.1.XX)
// para que el móvil (físico o emulador) pueda conectar con el servidor.
const BASE_URL = "http://192.168.1.XX:5000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para inyectar el token en cada petición automáticamente
apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
