import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/posts");
      setPosts(response.data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async (content, media) => {
    try {
      const response = await apiClient.post("/posts", { content, media });
      setPosts([response.data, ...posts]);
      return { success: true };
    } catch (err) {
      return { success: false, message: "Error al publicar" };
    }
  };

  const likePost = async (postId, userId) => {
    try {
      await apiClient.put(`/posts/${postId}/like`, { userId });
      // Refrescar localmente para feedback inmediato opcionalmente
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  };

  return { posts, loading, error, fetchPosts, createPost, likePost };
};
