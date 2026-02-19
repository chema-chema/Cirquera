import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";

export const useUser = (userId) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await apiClient.get(`/users/profile/${userId}`);
      setProfile(response.data);
      setError(null);
    } catch (err) {
      setError("Error al cargar el perfil");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const updateProfile = async (updateData) => {
    try {
      const response = await apiClient.put(
        `/users/profile/${userId}`,
        updateData,
      );
      setProfile(response.data);
      return { success: true };
    } catch (err) {
      return { success: false, message: "Error al actualizar perfil" };
    }
  };

  return { profile, loading, error, fetchProfile, updateProfile };
};
