# 🎪 Guía Detallada de Arquitectura Frontend - Cirquera

Esta guía define la funcionalidad, contenido y lógica de cada pieza de la aplicación, alineada con los modelos de la base de datos MongoDB.

---

## 📱 Pantallas (Screens)

### 1. Flujo de Autenticación
*   **LoginScreen**:
    *   **Propósito**: Identificación de usuarios.
    *   **Contenido**: Formulario de email/password, botón de login social (Google), link a registro.
    *   **Lógica**: Almacena el JWT en `SecureStore` y actualiza el `AuthContext`.
*   **RegisterScreen**:
    *   **Propósito**: Creación de nuevas cuentas.
    *   **Contenido**: Selector de Rol (¿Eres Talento o Empresa?), campos básicos (nombre, email, pass).
    *   **Lógica**: Manda el `role` al backend para inicializar el perfil correctamente.

### 2. Flujo Social (Feed)
*   **FeedScreen**:
    *   **Propósito**: Muro de noticias principal.
    *   **Contenido**: Lista de `PostCard` de usuarios seguidos.
    *   **Lógica**: Fetch periódico de posts. Pull-to-refresh.
*   **ExploreScreen**:
    *   **Propósito**: Descubrimiento de nuevo contenido y artistas.
    *   **Contenido**: Grid de imágenes/vídeos populares y buscador de usuarios/habilidades.
*   **CreatePostScreen**:
    *   **Propósito**: Publicar contenido multimedia.
    *   **Contenido**: Input de texto, selector de imágenes/vídeos, vista previa de media.

### 3. Flujo Laboral (Jobs)
*   **HomeScreen (Dashboard)**:
    *   **Propósito**: Vista rápida personalizada según el rol.
    *   **Contenido**:
        *   *Talent*: Próximas audiciones, sugerencias de empleo según `skills`.
        *   *Company*: Estadísticas de ofertas activas y nuevos candidatos.
*   **JobsListScreen**:
    *   **Propósito**: Buscador de empleo (tipo InfoJobs).
    *   **Contenido**: Lista de `JobCard`, barra de búsqueda y filtros (ubicación, tipo contrato).
*   **JobDetailScreen**:
    *   **Propósito**: Información exhaustiva de una oferta.
    *   **Contenido**: Descripción, requisitos (`skillsRequired`), botón de aplicar, información de la empresa.
*   **CreateJobScreen (Solo Empresa)**:
    *   **Propósito**: Publicar vacantes.
    *   **Contenido**: Formulario con campos del modelo `Job` (Título, ubicación, contrato, tags de habilidades).
*   **ApplicationsScreen**:
    *   **Propósito**: Gestión de candidaturas.
    *   **Contenido**:
        *   *Talent*: Lista de sus aplicaciones y su estado (Pendiente, Aceptado).
        *   *Company*: Lista de ofertas propias para ver quién ha aplicado a cada una.

### 4. Perfil y Comunidad
*   **ProfileScreen**:
    *   **Propósito**: CV Digital y portafolio artístico.
    *   **Contenido**: Header (Avatar, bio, stats), Grid de Portfolio, Timeline de Experiencia.
*   **EditProfileScreen**:
    *   **Propósito**: Actualizar datos profesionales.
    *   **Contenido**: Inputs para editar `skills`, `bio` y subir nuevas fotos al `portfolio`.
*   **NotificationsScreen**:
    *   **Propósito**: Centro de alertas.
    *   **Contenido**: Lista de `NotificationItem` (Nuevos seguidores, likes en posts, cambios en aplicaciones de empleo).

### 5. Mensajería
*   **ChatsScreen**:
    *   **Propósito**: Lista de conversaciones abiertas.
    *   **Contenido**: Lista de `ChatListItem` con último mensaje y avatar.
*   **ChatScreen**:
    *   **Propósito**: Conversación 1 a 1 en tiempo real.
    *   **Contenido**: Burbujas de mensajes, input de texto y envío de fotos.

---

## 🧱 Componentes (UI & Business)

### UI Atómica (Base)
*   **Button**: Reutilizable con variantes (Primary, Secondary, Outline, Loading state).
*   **Input**: Campo de texto con etiquetas y manejo de errores visuales.
*   **Avatar**: Imagen circular que gestiona el fallback si el usuario no tiene foto.
*   **Badge**: Pequeña etiqueta de color (ej: "Temporal", "Urgente", "Pendiente").
*   **SkillTag**: Chip con el nombre de la habilidad (ej: "Malabares").

### Componentes de Negocio
*   **PostCard**:
    *   Muestra autor, contenido, carrusel de imágenes y botones de Like/Comentar.
*   **JobCard**:
    *   Resumen de la oferta: Título, Empresa, Ubicación y `contractType`.
*   **JobApplication**:
    *   Ficha de un candidato para la empresa (Foto, nombre, link a perfil y botones "Aceptar/Rechazar").
*   **MessageBubble**:
    *   Diferencia visual entre mensajes enviados (derecha/color) y recibidos (izquierda/blanco).
*   **ChatListItem**:
    *   Fila con avatar, nombre, fragmento del último mensaje y badge de "no leído".
*   **PortfolioItem**:
    *   Miniatura de imagen/vídeo que al pulsar abre un modal de visualización a pantalla completa.
*   **ExperienceItem**:
    *   Fila con Nombre de empresa, fechas y descripción de las tareas realizadas.

---

## 🔗 Relación con Base de Datos (Mapping)

| Pantalla/Componente | Modelo Backend | Campos Clave Utilizados |
| :--- | :--- | :--- |
| **ProfileScreen** | `User` | `portfolio`, `experience`, `skills`, `followers.length` |
| **PostCard** | `Post` | `media` (url/type), `likes` (array de IDs), `comments` |
| **JobCard** | `Job` | `contractType` (enum), `location`, `skillsRequired` |
| **NotificationItem** | `Notification` | `type` (follow, like, job), `sender` |
| **ChatScreen** | `Message` | `content`, `sender`, `createdAt` |
| **ApplicationItem** | `Application` | `status` (pendiente/ok/no), `applicant` |

---

## 💡 Sugerencias de UX para Cirquera
1.  **Dinamismo**: Usa micro-animaciones cuando un usuario le da "Like" a un post (Tradició Digital).
2.  **Filtros**: El `JobsListScreen` debe poder filtrar por habilidades para que un trapecista no vea ofertas de payasos si no quiere.
3.  **Multimedia**: Dado el carácter visual del circo, la subida de vídeos en `CreatePostScreen` debe tener una barra de progreso real.
