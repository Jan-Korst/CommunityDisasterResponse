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

const handleAxiosError = (error: any) => {
  console.error(error.message || 'An unknown error occurred');
  throw new Error('A problem occurred with the request');
};

const createIncident = async (incident: Incident) => {
  return processRequest(() => axiosInstance.post('/incidents', incident));
};

const getAllIncidents = async () => {
  return processRequest(() => axiosInstance.get('/incidents'));
};

const getIncidentsByStatus = async (status: 'open' | 'closed') => {
  return processRequest(() => axiosInstance.get(`/incidents?status=${status}`));
}

const getIncidentById = async (id: number) => {
  return processRequest(() => axiosInstance.get(`/incidents/${id}`));
};

const updateIncident = async (id: number, incident: Partial<Incident>) => {
  return processRequest(() => axiosInstance.put(`/incidents/${id}`, incident));
};

const deleteIncident = async (id: number) => {
  return processRequest(() => axiosInstance.delete(`/incidents/${id}`));
};

const processRequest = async (requestFunction: () => Promise<any>) => {
  try {
    const response = await requestFunction();
    return response.data;
  } catch (error) {
  handleAxiosError(error);
  }
};

export { createIncident, getAllIncidents, getIncidentById, updateIncident, deleteIncident, getIncidentsByStatus };