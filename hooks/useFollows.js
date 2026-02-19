import { useState } from "react";
import apiClient from "../api/apiClient";

export const useFollows = () => {
  const [follows, setFollows] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFollows = async (userId, type) => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/follows/${userId}`, {
        params: { type },
      });
      setFollows(response.data);
    } catch (err) {
      console.error("Error al cargar seguidores/seguidos", err);
    } finally {
      setLoading(false);
    }
  };

  const followUser = async (followerId, followingId) => {
    try {
      const response = await apiClient.post("/follows", {
        follower: followerId,
        following: followingId,
      });
      return { success: true, data: response.data };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Error al seguir",
      };
    }
  };

  const unfollowUser = async (followId) => {
    try {
      await apiClient.delete(`/follows/${followId}`);
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  };

  const acceptFollow = async (followId) => {
    try {
      await apiClient.put(`/follows/${followId}/accept`);
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  };

  return {
    follows,
    loading,
    fetchFollows,
    followUser,
    unfollowUser,
    acceptFollow,
  };
};
