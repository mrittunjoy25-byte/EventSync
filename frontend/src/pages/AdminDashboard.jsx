import { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState({
    students: 0,
    events: 0,
    pendingRegistrations: 0,
  });
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const token = localStorage.getItem('token');

        const { data } = await axios.get(
          'http://localhost:5000/api/registrations',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRegistrations(data.registrations);
      } catch (error) {
        console.error(error);
      }
    };

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

    fetchRegistrations();
    fetchStats();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/registrations/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Registration ${status}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Failed to update registration');
    }


  };

  const doughnutData = {
    labels: ['Technical', 'Cultural', 'Sports', 'Workshop'],
    datasets: [
      {
        data: [12, 8, 6, 4],
        backgroundColor: ['#1d4ed8', '#2563eb', '#38bdf8', '#0f766e'],
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Registrations',
        data: [20, 35, 45, 38, 52],
        borderColor: '#1d4ed8',
        backgroundColor: 'rgba(59,130,246,0.2)',
      },
    ],
  };

  return (
    <div className="space-y-8">

      <div className="
      rounded-3xl
      bg-slate-900/60
      backdrop-blur-lg
      border
      border-cyan-500/20
      p-8
    ">
        <h1 className="text-4xl font-bold text-cyan-300">
          🚀 Admin Control Center
        </h1>

        <p className="text-slate-300 mt-2">
          Manage events, registrations and analytics.
        </p>
      </div>

      <div className="flex justify-end">
        <a
          href="/create-event"
          className="
bg-gradient-to-r
from-cyan-500
via-blue-600
to-purple-600
text-white
px-5 py-3
rounded-xl
font-semibold
shadow-lg
hover:scale-105
transition-all
duration-300
"
        >
          + Create Event </a> </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="
rounded-3xl
bg-slate-900/60
backdrop-blur-lg
border border-cyan-500/20
p-6
shadow-xl
hover:shadow-2xl
transition-all
duration-300
">
          <h3 className="text-sm uppercase tracking-wider text-slate-300">
            Total Students
          </h3>
          <h3 className="text-5xl font-bold text-white">
            {stats.students}
          </h3>
        </div>

        <div className="
rounded-3xl
bg-slate-900/60
backdrop-blur-lg
border border-cyan-500/20
p-6
shadow-xl
hover:shadow-2xl
transition-all
duration-300
">
          <h3 className="text-sm uppercase tracking-wider text-slate-300">
            Total Events
          </h3>

          <p className="mt-4 text-5xl font-bold text-white">
            {stats.events}
          </p>
        </div>

        <div className="
rounded-3xl
bg-slate-900/60
backdrop-blur-lg
border border-cyan-500/20
p-6
shadow-xl
hover:shadow-2xl
transition-all
duration-300
">
          <h3 className="text-sm uppercase tracking-wider text-slate-300">
            Pending Registrations
          </h3>

          <h3 className="text-5xl font-bold text-white">
            {stats.pendingRegistrations}
          </h3>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="
rounded-3xl
bg-slate-900/60
backdrop-blur-lg
border border-cyan-500/20
p-6
shadow-xl
hover:shadow-2xl
transition-all
duration-300
">
          <h2 className="text-xl font-semibold text-cyan-300">
            Category Distribution
          </h2>

          <Doughnut data={doughnutData} />
        </div>

        <div className="
rounded-3xl
bg-slate-900/60
backdrop-blur-lg
border border-cyan-500/20
p-6
shadow-xl
hover:shadow-2xl
transition-all
duration-300
">
          <h2 className="text-xl font-semibold text-cyan-300">
            Monthly Registrations
          </h2>

          <Line data={lineData} />
        </div>
      </div>

      <div className="
rounded-3xl
bg-slate-900/60
backdrop-blur-lg
border border-cyan-500/20
p-6
shadow-xl
hover:shadow-2xl
transition-all
duration-300
">
        <h2 className="text-2xl font-bold mb-4 text-cyan-300">
          Event Registrations
        </h2>

        {registrations.map((reg) => (
          <div
            key={reg._id}
            className="
    bg-slate-800/60
    border
    border-cyan-500/20
    rounded-xl
    p-4
    mb-4
    backdrop-blur-lg
  "
          >
            <h3 className="font-bold">
              {reg.studentId?.name}
            </h3>
            <p>{reg.studentId?.email}</p>

            <p>
              Event: {reg.eventId?.title}
            </p>

            <p>
              Status: {reg.status}
            </p>

            {reg.status === 'Pending' ? (
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => updateStatus(reg._id, 'Approved')}
                  className="
bg-gradient-to-r
from-emerald-500
to-green-700
text-white
px-4 py-2
rounded-lg
font-semibold
hover:scale-105
transition-all
duration-300
"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(reg._id, 'Rejected')}
                  className="
bg-gradient-to-r
from-red-500
to-rose-700
text-white
px-4 py-2
rounded-lg
font-semibold
hover:scale-105
transition-all
duration-300
"
                >
                  Reject
                </button>
              </div>
            ) : (
              <p className="mt-3 font-semibold">
                Status: {reg.status}
                {reg.status === 'Approved' && ' ✅'}
                {reg.status === 'Rejected' && ' ❌'}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>

  );
};

export default AdminDashboard;
