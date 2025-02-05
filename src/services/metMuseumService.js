import axios from 'axios';

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export const fetchDepartments = async () => {
  const response = await axios.get(`${API_BASE_URL}/departments`);

  if (!response.data || !response.data.data) {
    throw new Error('Failed to fetch departments. Invalid response format.');
  }
  return response.data.data;
};

export const searchArtworks = async (departmentId, query) => {
  const response = await axios.get(`${API_BASE_URL}/search`, {
    params: { q: query, departmentId },
  });
  if (!response.data || !response.data.data) {
    throw new Error('Failed to search artworks. Invalid response format.');
  }
  return response.data.data;
};
