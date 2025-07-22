import axios from 'axios';

const API_URL = '/api/events/';

// Create new event
const createEvent = async (eventData, token) => {
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };

  const response = await axios.post(API_URL, eventData, config);

  return response.data;
};

// Get all events
const getEvents = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// Get featured events
const getFeaturedEvents = async () => {
  const response = await axios.get(API_URL + 'featured');

  return response.data;
};

const eventService = {
  createEvent,
  getEvents,
  getFeaturedEvents,
};

export default eventService;
