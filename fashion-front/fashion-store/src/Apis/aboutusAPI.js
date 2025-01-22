import axios from 'axios';

// Base URL for the API (update it with your backend's URL)
const BASE_URL = 'http://127.0.0.1:5000/api/aboutus/about-us';

// Create a new About Us entry
export const createAboutUs = async (aboutUsData) => {
  try {
    const response = await axios.post(BASE_URL, aboutUsData);
    return response.data;
  } catch (error) {
    console.error('Error creating About Us entry:', error);
    throw error;
  }
};

// Get all About Us entries
export const getAllAboutUs = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching About Us entries:', error);
    throw error;
  }
};

// Get a single About Us entry by ID
export const getAboutUsById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching About Us entry by ID:', error);
    throw error;
  }
};

// Update an About Us entry
export const updateAboutUs = async (id, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating About Us entry:', error);
    throw error;
  }
};

// Delete an About Us entry
export const deleteAboutUs = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting About Us entry:', error);
    throw error;
  }
};
