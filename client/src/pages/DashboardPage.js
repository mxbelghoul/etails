import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import eventService from '../services/eventService';

const DashboardPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getEvents();
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/create-event">Create Event</Link>
      <h2>My Events</h2>
      {events.map((event) => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
