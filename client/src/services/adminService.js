import axios from 'axios';

const API_URL = '/api/';

// Get all unapproved events
const getUnapprovedEvents = async (token) => {
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };

  const response = await axios.get(API_URL + 'events/unapproved', config);

  return response.data;
};

// Approve an event
const approveEvent = async (eventId, token) => {
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };

  const response = await axios.put(
    API_URL + `events/approve/${eventId}`,
    null,
    config
  );

  return response.data;
};

// Create a category
const createCategory = async (categoryData, token) => {
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };

  const response = await axios.post(API_URL + 'categories', categoryData, config);

  return response.data;
};

const adminService = {
  getUnapprovedEvents,
  approveEvent,
  createCategory,
};

export default adminService;
