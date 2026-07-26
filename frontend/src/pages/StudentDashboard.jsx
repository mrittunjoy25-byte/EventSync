import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API = "https://eventsync-oqg7.onrender.com/api";

const StudentDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const { data } = await axios.get(`${API}/registrations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Registration API:", data);

      setRegistrations(data.registrations || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const upcoming = registrations.filter(
    (reg) => reg.status === "Pending"
  );

  return (
    <div className="max-w-7xl mx-auto p-6 text-white space-y-8">

      {/* Welcome */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="
        rounded-3xl
        bg-gradient-to-r
        from-cyan-600
        via-blue-700
        to-purple-700
        p-8
        shadow-2xl
        "
      >
        <h1 className="text-4xl font-bold">
          Welcome, {user?.name} 👋
        </h1>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div>
            <p className="text-cyan-100">Email</p>
            <h3 className="font-semibold">
              {user?.email}
            </h3>
          </div>

          <div>
            <p className="text-cyan-100">Department</p>
            <h3 className="font-semibold">
              {user?.department}
            </h3>
          </div>

          <div>
            <p className="text-cyan-100">Semester</p>
            <h3 className="font-semibold">
              {user?.semester}
            </h3>
          </div>

        </div>

      </motion.div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 gap-6">

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="
          rounded-3xl
          bg-slate-900/70
          backdrop-blur-xl
          border
          border-cyan-500/20
          p-8
          shadow-xl
          "
        >
          <h2 className="text-xl font-semibold">
            Registered Events
          </h2>

          <h1 className="text-5xl font-bold mt-4 text-cyan-400">
            {registrations.length}
          </h1>

          <p className="mt-3 text-slate-400">
            Total registrations
          </p>

        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="
          rounded-3xl
          bg-slate-900/70
          backdrop-blur-xl
          border
          border-purple-500/20
          p-8
          shadow-xl
          "
        >
          <h2 className="text-xl font-semibold">
            Pending Registrations
          </h2>

          <h1 className="text-5xl font-bold mt-4 text-purple-400">
            {upcoming.length}
          </h1>

          <p className="mt-3 text-slate-400">
            Waiting for approval
          </p>

        </motion.div>

      </div>

      {/* My Events */}

      <div
        className="
        rounded-3xl
        bg-slate-900/70
        backdrop-blur-xl
        border
        border-cyan-500/20
        p-8
        shadow-xl
        "
      >

        <h2 className="text-3xl font-bold mb-6">
          My Registered Events
        </h2>

        {loading ? (

          <div className="text-center py-10">

            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>

            <p className="mt-5 text-slate-300">
              Loading registrations...
            </p>

          </div>

        ) : registrations.length === 0 ? (

          <div className="text-center py-10">

            <h2 className="text-2xl font-bold">
              No Events Registered
            </h2>

            <p className="text-slate-400 mt-3">
              Register for an event from the Home page.
            </p>

          </div>

        ) : (
                    <div className="space-y-5">
            {registrations.map((reg) => (
              <motion.div
                key={reg._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                className="
                rounded-2xl
                bg-slate-800/70
                border
                border-cyan-500/20
                p-6
                transition
                "
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-5">

                  <div className="space-y-2">

                    <h3 className="text-2xl font-bold text-cyan-400">
                      {reg.eventId?.title || "Unknown Event"}
                    </h3>

                    <p className="text-slate-300">
                      🎭 Category :
                      <span className="ml-2 text-white">
                        {reg.eventId?.category || "N/A"}
                      </span>
                    </p>

                    <p className="text-slate-300">
                      📍 Venue :
                      <span className="ml-2 text-white">
                        {reg.eventId?.venue || "N/A"}
                      </span>
                    </p>

                    <p className="text-slate-300">
                      📅 Date :
                      <span className="ml-2 text-white">
                        {reg.eventId?.date
                          ? new Date(
                              reg.eventId.date
                            ).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </p>

                    <p className="text-slate-300">
                      📝 Registered :
                      <span className="ml-2 text-white">
                        {new Date(
                          reg.registeredAt
                        ).toLocaleDateString()}
                      </span>
                    </p>

                  </div>

                  <div>

                    <span
                      className={`px-4 py-2 rounded-full font-semibold ${
                        reg.status === "Approved"
                          ? "bg-green-500/20 text-green-400"
                          : reg.status === "Rejected"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {reg.status}
                    </span>

                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Notifications */}

      <div
        className="
        rounded-3xl
        bg-slate-900/70
        backdrop-blur-xl
        border
        border-purple-500/20
        p-8
        shadow-xl
        "
      >
        <h2 className="text-3xl font-bold mb-5">
          Notifications
        </h2>

        <div className="rounded-2xl bg-slate-800/70 p-5 border border-slate-700">

          <p className="text-slate-300">
            🔔 You will receive notifications here whenever
            your event registration is approved or rejected.
          </p>

        </div>

      </div>

    </div>
  );
};

export default StudentDashboard;