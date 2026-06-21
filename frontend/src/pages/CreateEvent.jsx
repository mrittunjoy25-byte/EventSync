import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technical',
    date: '',
    time: '',
    venue: '',
    registrationDeadline: '',
    maxParticipants: '',
    organizer: '',
    contact: '',
    banner: null,
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      await api.post('/events', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Event Created Successfully');
      navigate('/admin');
      setFormData({
        title: '',
        description: '',
        category: 'Technical',
        date: '',
        time: '',
        venue: '',
        registrationDeadline: '',
        maxParticipants: '',
        organizer: '',
        contact: '',
        banner: null,
      });
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        'Failed to create event'
      );
    }
  };

  return (
    <div className="
mx-auto
max-w-4xl
rounded-3xl
bg-slate-900/60
backdrop-blur-lg
border
border-cyan-500/20
p-10
shadow-xl
">
      <h1 className="text-3xl font-bold mb-6 text-cyan-300">
        Create New Event
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          className="
w-full
rounded-xl
border
border-cyan-500/20
bg-slate-800/60
text-white
placeholder-slate-400
p-3
"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="
w-full
rounded-xl
border
border-cyan-500/20
bg-slate-800/60
text-white
placeholder-slate-400
p-3
"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="
w-full
rounded-xl
border
border-cyan-500/20
bg-slate-800/60
text-white
p-3
"
        >
          <option>Technical</option>
          <option>Cultural</option>
          <option>Sports</option>
          <option>Workshop</option>
          <option>Seminar</option>
          <option>Hackathon</option>
          <option>Debate</option>
          <option>Other</option>
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="
w-full
rounded-xl
border
border-cyan-500/20
bg-slate-800/60
text-white
placeholder-slate-400
p-3
"
        />

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="
w-full
rounded-xl
border
border-cyan-500/20
bg-slate-800/60
text-white
placeholder-slate-400
p-3
"
        />

        <input
          type="text"
          name="venue"
          placeholder="Venue"
          value={formData.venue}
          onChange={handleChange}
          className="
w-full
rounded-xl
border
border-cyan-500/20
bg-slate-800/60
text-white
placeholder-slate-400
p-3
"
        />

        <input
          type="date"
          name="registrationDeadline"
          value={formData.registrationDeadline}
          onChange={handleChange}
          className="
w-full
rounded-xl
border
border-cyan-500/20
bg-slate-800/60
text-white
placeholder-slate-400
p-3
"
        />

        <input
          type="number"
          name="maxParticipants"
          placeholder="Max Participants"
          value={formData.maxParticipants}
          onChange={handleChange}
          className="
w-full
rounded-xl
border
border-cyan-500/20
bg-slate-800/60
text-white
placeholder-slate-400
p-3
"
        />

        <input
          type="text"
          name="organizer"
          placeholder="Organizer"
          value={formData.organizer}
          onChange={handleChange}
          className="
w-full
rounded-xl
border
border-cyan-500/20
bg-slate-800/60
text-white
placeholder-slate-400
p-3
"
        />

        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={formData.contact}
          onChange={handleChange}
          className="
w-full
rounded-xl
border
border-cyan-500/20
bg-slate-800/60
text-white
placeholder-slate-400
p-3
"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFormData({
              ...formData,
              banner: e.target.files[0],
            })
          }
          className="
w-full
rounded-xl
border
border-cyan-500/20
bg-slate-800/60
text-white
placeholder-slate-400
p-3
"
        />

        <button
          type="submit"
          className="
w-full
rounded-xl
bg-gradient-to-r
from-cyan-500
via-blue-600
to-purple-600
text-white
font-semibold
px-6
py-3
shadow-lg
hover:scale-105
transition-all
duration-300
"
        >
          Create Event
        </button>

      </form>
    </div>
  );
};

export default CreateEvent;