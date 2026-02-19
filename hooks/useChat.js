import { useState } from "react";
import apiClient from "../api/apiClient";

export const useChat = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchChats = async (userId) => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/chats/${userId}`);
      setChats(response.data);
    } catch (err) {
      console.error("Error al cargar chats", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (chatId) => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/chats/messages/${chatId}`);
      setMessages(response.data);
    } catch (err) {
      console.error("Error al cargar mensajes", err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (chatId, senderId, content) => {
    try {
      const response = await apiClient.post("/chats/message", {
        chatId,
        sender: senderId,
        content,
      });
      setMessages((prev) => [...prev, response.data]);
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  };

  const accessChat = async (userId, targetId) => {
    try {
      const response = await apiClient.post("/chats", { userId, targetId });
      return { success: true, chat: response.data };
    } catch (err) {
      return { success: false };
    }
  };

  return {
    chats,
    messages,
    loading,
    fetchChats,
    fetchMessages,
    sendMessage,
    accessChat,
  };
};
