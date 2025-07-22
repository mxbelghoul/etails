import React, { useState, useEffect } from 'react';
import adminService from '../services/adminService';

const AdminPage = () => {
  const [unapprovedEvents, setUnapprovedEvents] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const { user } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchUnapprovedEvents = async () => {
      try {
        const data = await adminService.getUnapprovedEvents(user.token);
        setUnapprovedEvents(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUnapprovedEvents();
  }, [user.token]);

  const handleApprove = async (eventId) => {
    try {
      await adminService.approveEvent(eventId, user.token);
      setUnapprovedEvents(
        unapprovedEvents.filter((event) => event._id !== eventId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      await adminService.createCategory({ name: categoryName }, user.token);
      setCategoryName('');
      // You might want to refresh the categories list here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>Approve Events</h2>
      {unapprovedEvents.map((event) => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <button onClick={() => handleApprove(event._id)}>Approve</button>
        </div>
      ))}
      <h2>Create Category</h2>
      <form onSubmit={handleCreateCategory}>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
        <input type="submit" value="Create Category" />
      </form>
    </div>
  );
};

export default AdminPage;
