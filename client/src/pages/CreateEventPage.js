import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import eventService from '../services/eventService';
import categoryService from '../services/categoryService';

const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
  });
  const [categories, setCategories] = useState([]);

  const { title, description, date, time, location, category } = formData;
  const navigate = useNavigate();
  const { user } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await eventService.createEvent(formData, user.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={onChange}
          required
        />
        <textarea
          placeholder="Description"
          name="description"
          value={description}
          onChange={onChange}
          required
        ></textarea>
        <input
          type="date"
          name="date"
          value={date}
          onChange={onChange}
          required
        />
        <input
          type="time"
          name="time"
          value={time}
          onChange={onChange}
          required
        />
        <input
          type="text"
          placeholder="Location"
          name="location"
          value={location}
          onChange={onChange}
          required
        />
        <select name="category" value={category} onChange={onChange} required>
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input type="submit" value="Create Event" />
      </form>
    </div>
  );
};

export default CreateEventPage;
