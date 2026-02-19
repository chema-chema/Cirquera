import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobs = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await apiClient.get("/jobs", { params: filters });
      setJobs(response.data);
      setError(null);
    } catch (err) {
      setError("Error al cargar las ofertas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const applyToJob = async (jobId, talentId, message) => {
    try {
      await apiClient.post("/applications", {
        job: jobId,
        talent: talentId,
        message,
      });
      return { success: true };
    } catch (err) {
      return { success: false, message: "Error al aplicar a la oferta" };
    }
  };

  return { jobs, loading, error, fetchJobs, applyToJob };
};
