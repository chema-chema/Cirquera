import { useState } from "react";
import apiClient from "../api/apiClient";

export const useApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApplications = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await apiClient.get("/applications", {
        params: filters,
      });
      setApplications(response.data);
    } catch (err) {
      console.error("Error al cargar aplicaciones", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      const response = await apiClient.put(`/applications/${applicationId}`, {
        status,
      });
      setApplications(
        applications.map((app) =>
          app._id === applicationId
            ? { ...app, status: response.data.status }
            : app,
        ),
      );
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  };

  const deleteApplication = async (applicationId) => {
    try {
      await apiClient.delete(`/applications/${applicationId}`);
      setApplications(applications.filter((app) => app._id !== applicationId));
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  };

  return {
    applications,
    loading,
    fetchApplications,
    updateStatus,
    deleteApplication,
  };
};
