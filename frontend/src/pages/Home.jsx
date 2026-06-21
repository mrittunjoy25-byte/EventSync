import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    students: 0,
    events: 0,
    registrations: 0,
  });


  const [events, setEvents] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/stats'
        );
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');

        const { data } = await axios.get(
          'http://localhost:5000/api/events',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("EVENT DATA:", data);
        setEvents(data.events);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
    fetchEvents();
    console.log("EVENTS:", events);
  }, []);
  const deleteEvent = async (id) => {
    try {
      const token = localStorage.getItem('token');

      await axios.delete(
        `http://localhost:5000/api/events/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Event Deleted Successfully');

      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error(error);
      alert('Failed to delete event');
    }
  };
  return (
    <div className="space-y-12 text-white">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="
rounded-3xl
p-10
text-white
shadow-2xl
bg-cover
bg-center
border
border-cyan-500/20
backdrop-blur-lg
"
        style={{
          backgroundImage: "url('/space-bg.jpg')",
        }}
      >

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-bold"
            >
              Campus events, participation, and analytics in one place.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 text-slate-200"
            >
              Register for technical fests, cultural programs, workshops,
              and competitions with a modern student dashboard and admin
              management tools.
            </motion.p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/register"
                className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white"
              >
                Join as Student
              </a>

              <a
                href="/login"
                className="rounded-full border border-slate-200 px-6 py-3 text-sm text-white"
              >
                Admin Login
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-800 p-6 shadow-xl">
              Featured event: Hackathon 2026
            </div>

            <div className="rounded-3xl bg-slate-800 p-6 shadow-xl">
              Upcoming workshop on Cloud Computing
            </div>
          </div>
        </div>
      </motion.section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="
rounded-3xl
bg-slate-900/40
backdrop-blur-lg
border border-cyan-500/20
p-8
text-center
text-white
shadow-xl
">
          {stats.students} Students
        </div>

        <div className="
rounded-3xl
bg-slate-900/40
backdrop-blur-lg
border border-cyan-500/20
p-8
text-center
text-white
shadow-xl
">
          {stats.events} Events
        </div>

        <div className="
rounded-3xl
bg-slate-900/40
backdrop-blur-lg
border border-cyan-500/20
p-8
text-center
text-white
shadow-xl
">
          {stats.registrations} Registrations
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="
rounded-3xl
bg-slate-900/40
backdrop-blur-lg
border border-cyan-500/20
p-8
text-white
shadow-xl
">
          <h2 className="text-xl font-semibold">Student dashboard</h2>
          <p className="mt-3 text-slate-200">
            Browse events, register, view announcements, and manage your profile.
          </p>
        </div>

        <div className="
rounded-3xl
bg-slate-900/40
backdrop-blur-lg
border border-cyan-500/20
p-8
text-white
shadow-xl
">
          <h2 className="text-xl font-semibold">Admin controls</h2>
          <p className="mt-3 text-slate-200">
            Publish events, approve registrations, and review analytics.
          </p>
        </div>

        <div className="
rounded-3xl
bg-slate-900/40
backdrop-blur-lg
border border-cyan-500/20
p-8
text-white
shadow-xl
">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <p className="mt-3 text-slate-200">
            Receive real-time notifications for approvals and announcements.
          </p>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">
          Available Events
        </h2>

        {events.map((event) => (
          <div
            key={event._id}
            className="
  rounded-3xl
  bg-slate-900/40
  backdrop-blur-lg
  border
  border-cyan-500/20
  p-6
  shadow-xl
  hover:-translate-y-2
  hover:border-cyan-400/50
  hover:shadow-cyan-500/20
  transition-all
  duration-300
"
          >
            {event.banner && (
              <img
                src={`http://localhost:5000${event.banner}`}
                alt={event.title}
                className="w-full max-h-96 object-contain rounded-xl mb-4 bg-gray-100" />
            )}
            <h3 className="text-xl font-bold text-white">
              {event.title}
            </h3>

            <p className="mt-2">
              {event.description}
            </p>

            <p className="mt-2">
              📍 {event.venue}
            </p>

            <button
              onClick={async () => {
                try {
                  const token = localStorage.getItem('token');

                  await axios.post(
                    'http://localhost:5000/api/registrations',
                    {
                      eventId: event._id,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  alert('Registered Successfully!');
                } catch (error) {
                  alert(
                    error.response?.data?.message ||
                    'Registration Failed'
                  );
                }
              }}
              className="
mt-4
rounded-full
bg-gradient-to-r
from-blue-600
to-cyan-500
px-5 py-2
text-white
font-semibold
shadow-lg
hover:scale-105
hover:shadow-2xl
transition-all
duration-300
"
            >
              Register
            </button>
            {user?.role === 'admin' && (
              <button
                onClick={() => navigate(`/edit-event/${event._id}`)}
                className="mt-4 ml-3 rounded-full bg-yellow-500 px-5 py-2 text-white font-semibold"
              >
                Edit Event
              </button>
            )}

            {user?.role === 'admin' && (
              <button
                onClick={() => deleteEvent(event._id)}
                className="mt-4 ml-3 rounded-full bg-red-600 px-5 py-2 text-white font-semibold"
              >
                Delete Event
              </button>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};
export default Home;