# 🎪 Guía de Implementación Frontend - Cirquera

Esta guía detalla los pasos para construir la aplicación móvil de **Cirquera** utilizando React Native (Expo) y conectarla con nuestro Backend.

---

## Paso 1: Configuración Inicial e Instalación
Primero, asegúrate de tener las dependencias necesarias para la navegación, conexión y almacenamiento.

```bash
# Navegación y UI
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context

# Conexión y Estado
npx expo install axios expo-secure-store

# Multimedia y Fuentes
npx expo install expo-image-picker expo-font @expo-google-fonts/inter
```

---

## Paso 2: Configuración de la API (Axios)
Para evitar escribir la IP en cada archivo, crea un archivo `src/api/client.js`. 
**Nota:** Usa tu IP local (ej. `192.168.1.XX`), no `localhost`.

```javascript
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const apiClient = axios.create({
  baseURL: 'http://TU_IP_LOCAL:5000/api',
});

// Interceptor para añadir el token automáticamente
apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

---

## Paso 3: Identidad Visual y Tema (Tradició Digital)
Según el manual, debemos usar la tipografía **Aquavit** y colores cálidos.
1.  **Fuentes:** Coloca el archivo `.ttf` de Aquavit en `assets/fonts/`.
2.  **Colores Sugeridos:**
    *   `Primario (Rojo Circo):` #D32F2F
    *   `Cálido (Crema/Papel):` #F5F5DC
    *   `Acento (Dorado):` #FFC107
    *   `Fondo (Flat con textura):` Usa un patrón suave de rombos.

---

## Paso 4: Estructura de Navegación
Configura un `NavigationContainer` con dos flujos:

1.  **AuthStack (No logueado):**
    *   Welcome / Slide introductorio (Eslogan: "Todo el circo en un solo lugar").
    *   Login (Con opción "Inici amb Google").
    *   Registro (Selector de rol: Talent o Company).
2.  **AppStack (Logueado - Bottom Tabs):**
    *   `Feed`: Publicaciones sociales y multimedia.
    *   `Jobs`: Listado de empleo tipo "InfoJobs".
    *   `Chat`: Conversaciones 1 a 1.
    *   `Perfil`: CV Digital (Bio, Experiencia, Habilidades, Portafolio).

---

## Paso 5: Implementación del Perfil (El Eje Central)
El perfil debe ser visualmente potente:
*   **Header:** Foto circular, nombre y medidores de Seguidores/Seguidos.
*   **Habilidades:** Usa `Tags` o chips con bordes redondeados.
*   **Experiencia:** Una línea de tiempo (Timeline) con los cargos ocupados.
*   **Portafolio:** Un grid de imágenes/vídeos que se puedan ampliar.

---

## Paso 6: Flujo Laboral
*   **Para Talent:** Pantalla de "Buscar Jobs" con filtros por ubicación y habilidad (ej. Malabarista). Botón grande de "Aplicar".
*   **Para Company:** Botón flotante (+) para "Publicar Job" y una sección de "Candidatos" para revisar aplicaciones.

---

## Paso 7: Multimedia y Gestión de Archivos
Para subir fotos al portafolio:
1. Usa `ImagePicker` de Expo para seleccionar el archivo.
2. Envía el archivo a `/api/upload` usando un objeto `FormData`.
3. Guarda la URL devuelta en el perfil del usuario mediante `PUT /api/users/profile/:id`.

---

## ✅ Checklist de "Tradició Digital"
- [ ] ¿La letra "e" de los títulos tiene el dinamismo del circo?
- [ ] ¿Los botones e interacciones se sienten humanos y no "fríos"?
- [ ] ¿Se usa el rombe (rombo) como elemento decorativo de red?
- [ ] ¿Las fotos de talento muestran la preparación y el oficio?
