import React, { useState, useEffect } from 'rseact';
import eventService from '../services/eventService';

const HomePage = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    const fetchFeaturedEvents = async () => {
      try {
        const data = await eventService.getFeaturedEvents();
        setFeaturedEvents(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRecentEvents = async () => {
      try {
        // This should be implemented in the backend
        const data = await eventService.getEvents();
        setRecentEvents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFeaturedEvents();
    fetchRecentEvents();
  }, []);

  return (
    <div>
      <h1>Welcome to the Event Management Platform</h1>
      <div className="search-bar">
        <input type="text" placeholder="Search by category, city, or date" />
        <button>Search</button>
      </div>
      <h2>Featured Events</h2>
      <div className="event-list">
        {featuredEvents.map((event) => (
          <div key={event._id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
      <h2>Recent Events</h2>
      <div className="event-list">
        {recentEvents.map((event) => (
          <div key={event._id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
