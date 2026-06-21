import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    venue: '',
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');

        const { data } = await axios.get(
          `http://localhost:5000/api/events/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFormData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      await axios.put(
        `http://localhost:5000/api/events/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Event Updated Successfully');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Failed to update event');
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
     <h1 className="text-3xl font-bold text-cyan-300">
        Edit Event
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
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

        <input
          type="text"
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
placeholder-slate-400
p-3
"
        />

        <input
          type="text"
          name="venue"
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

        <button
          type="submit"
   className="
bg-gradient-to-r
from-cyan-500
via-blue-600
to-purple-600
text-white
font-semibold
px-6
py-3
rounded-xl
shadow-lg
hover:scale-105
transition-all
duration-300
"
        >
          Save Changes
        </button>

      </form>
    </div>
  );
};

export default EditEvent;