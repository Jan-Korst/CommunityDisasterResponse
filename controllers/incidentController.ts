import axios from 'axios';

interface Incident {
  id?: number;
  title: string;
  description: string;
  status: 'open' | 'closed';
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

const createIncident = async (incident: Incident) => {
  try {
    const response = await axiosInstance.post('/incidents', incident);
    return response.data;
  } catch (error) {
    throw new Error('Error creating the incident');
  }
};

const getAllIncidents = async () => {
  try {
    const response = await axiosInstance.get('/incidents');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching incidents');
  }
};

const getIncidentById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/incidents/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching the incident');
  }
};

const updateIncident = async (id: number, incident: Partial<Incident>) => {
  try {
    const response = await axiosInstance.put(`/incidents/${id}`, incident);
    return response.data;
  } catch (error) {
    throw new Error('Error updating the incident');
  }
};

const deleteIncident = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/incidents/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting the incident');
  }
};

export { createIncident, getAllIncidents, getIncidentById, updateIncident, deleteIncident };