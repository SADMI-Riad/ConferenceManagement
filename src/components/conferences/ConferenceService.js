import axios from "axios";

const API_URL = "http://localhost:3000/conferences";

export const conferenceService = {
  getAll: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des conférences", error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la conférence ${id}`, error);
      throw error;
    }
  },

  create: async (conference) => {
    try {
      const response = await axios.post(API_URL, {
        ...conference,
        createdAt: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création de la conférence", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Erreur lors de la suppression de la conférence ${id}`, error);
      throw error;
    }
  },

  update: async (id, conference) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        ...conference,
        updatedAt: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error(`Erreur de mise à jour de la conférence ${id}`, error);
      throw error;
    }
  }
};
