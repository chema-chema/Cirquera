import { useState } from "react";
import apiClient from "../api/apiClient";

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (fileUri) => {
    setUploading(true);
    try {
      const formData = new FormData();

      // En React Native, el archivo se añade así al FormData
      formData.append("file", {
        uri: fileUri,
        name: fileUri.split("/").pop(),
        type: "image/jpeg", // O el tipo correcto según sea imagen o vídeo
      });

      const response = await apiClient.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return { success: true, url: response.data.url };
    } catch (err) {
      console.error("Error en la subida", err);
      return { success: false, message: "Error al subir archivo" };
    } finally {
      setUploading(false);
    }
  };

  return { uploadFile, uploading };
};
