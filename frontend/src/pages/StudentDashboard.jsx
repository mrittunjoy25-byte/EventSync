import { useEffect, useState } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [registrations, setRegistrations] = useState([]);
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const token = localStorage.getItem('token');

        const { data } = await axios.get(
          'https://eventsync-oqg7.onrender.com/api/registrations',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Registrations:", data.registrations);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRegistrations();
  }, []);
  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-700 text-white rounded-3xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold">
          Welcome, {user?.name} 👋
        </h1>

        <div className="mt-3 space-y-1 text-lg">
          <p>
            📧 Email: {user?.email || 'Not Available'}
          </p>

          <p>
            🏫 Department: {user?.department || 'Not Available'}
          </p>

          <p>
            📚 Semester: {user?.semester || 'Not Available'}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-slate-900/60
backdrop-blur-lg
border border-cyan-500/20 rounded-3xl shadow-lg p-6">
          <h2 className="text-xl font-bold">
            Registered Events
          </h2>

          <p className="text-5xl mt-4 text-blue-600">
            {registrations.length}
          </p>
        </div>

        <div
          className="
bg-slate-900/60
backdrop-blur-lg
border
border-cyan-500/20
rounded-3xl
shadow-lg
p-6
text-white
"
        >
          <h2 className="text-xl font-bold">
            Upcoming Events
          </h2>

          <p className="text-5xl mt-4 text-cyan-400">
            {registrations.length}
          </p>

          <p className="mt-3 text-slate-300">
            Upcoming registrations
          </p>
        </div>
      </div>

      {/* Registered Events */}
      <div
        className="
bg-slate-900/60
backdrop-blur-lg
border
border-cyan-500/20
rounded-3xl
shadow-lg
p-6
mt-8
text-white
"
      >
        <h2 className="text-2xl font-bold mb-4">
          My Registered Events
        </h2>

        {registrations.length === 0 ? (
          <p className="text-slate-300">
            No events registered yet.
          </p>
        ) : (
          registrations.map((reg) => (
            <div
              key={reg._id}
              className="
rounded-2xl
bg-slate-800/70
border
border-cyan-500/20
p-5
mb-4
hover:border-cyan-400
transition
"
            >
              <h3 className="font-bold text-lg">
                {reg.eventId?.title}
              </h3>

              <p>
                📍 {reg.eventId?.venue}
              </p>

              <p>
                📅 {new Date(reg.eventId?.date).toLocaleDateString()}
              </p>

              <p className="mt-2">
                Status :
                <span className="ml-2 text-green-400 font-semibold">
                  {reg.status}
                </span>
              </p>
            </div>
          ))
        )}
      </div>

      {/* Notifications */}
      <div
        className="
bg-slate-900/60
backdrop-blur-lg
border
border-cyan-500/20
rounded-3xl
shadow-lg
p-6
mt-8
text-white
"
      >
        <h2 className="text-2xl font-bold mb-4">
          Notifications
        </h2>

        <p className="text-slate-300">
          No notifications available.
        </p>
      </div>

    </div>
  );
};

export default StudentDashboard;