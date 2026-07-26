import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "https://eventsync-oqg7.onrender.com/api";

const Home = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    students: 0,
    events: 0,
    registrations: 0,
  });

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchEvents();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await axios.get(`${API}/stats`);
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEvents = async () => {
    try {
      const config = token
        ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        : {};

      const { data } = await axios.get(`${API}/events`, config);

      setEvents(data.events || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const registerEvent = async (id) => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `${API}/registrations`,
        {
          eventId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Successfully Registered!");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await axios.delete(`${API}/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents(events.filter((event) => event._id !== id));

      alert("Event Deleted Successfully");
    } catch (err) {
      alert("Unable to Delete Event");
    }
  };

  const featuredEvent = events[0];
  const upcomingEvent = events[1];

  return (
    <div className="space-y-14 text-white">

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-purple-500/20
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-purple-950
        p-10
        shadow-2xl
        "
      >
        <div className="absolute inset-0 opacity-20 bg-[url('/space-bg.jpg')] bg-cover bg-center"></div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">

          <div>

            <h1 className="text-5xl font-extrabold leading-tight">
              Welcome to
              <span className="text-cyan-400"> EventSync</span>
            </h1>

            <p className="mt-6 text-lg text-slate-300 leading-8">
              Discover exciting technical events, workshops,
              hackathons, seminars and cultural festivals happening
              across your campus.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              {!user ? (
                <>
                  <button
                    onClick={() => navigate("/register")}
                    className="
                    rounded-full
                    bg-cyan-500
                    px-8
                    py-3
                    font-semibold
                    hover:scale-105
                    transition
                    "
                  >
                    Join Now
                  </button>

                  <button
                    onClick={() => navigate("/login")}
                    className="
                    rounded-full
                    border
                    border-white
                    px-8
                    py-3
                    hover:bg-white
                    hover:text-black
                    transition
                    "
                  >
                    Login
                  </button>
                </>
              ) : (
                <button
                  onClick={() =>
                    navigate(
                      user.role === "admin"
                        ? "/admin-dashboard"
                        : "/student-dashboard"
                    )
                  }
                  className="
                  rounded-full
                  bg-purple-600
                  px-8
                  py-3
                  font-semibold
                  hover:scale-105
                  transition
                  "
                >
                  Go to Dashboard
                </button>
              )}

            </div>

          </div>

          <div className="grid gap-5">

            <div className="rounded-3xl bg-white/10 backdrop-blur-xl p-6 border border-cyan-400/20">

              <p className="text-cyan-400 text-sm uppercase">
                Featured Event
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                {featuredEvent
                  ? featuredEvent.title
                  : "No Featured Event"}
              </h2>

              <p className="mt-2 text-slate-300">
                {featuredEvent
                  ? featuredEvent.category
                  : "Stay tuned for upcoming events"}
              </p>

            </div>

            <div className="rounded-3xl bg-white/10 backdrop-blur-xl p-6 border border-purple-500/20">

              <p className="text-purple-400 text-sm uppercase">
                Upcoming Event
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                {upcomingEvent
                  ? upcomingEvent.title
                  : "Coming Soon"}
              </h2>

              <p className="mt-2 text-slate-300">
                {upcomingEvent
                  ? new Date(upcomingEvent.date).toLocaleDateString()
                  : "More events will appear here."}
              </p>

            </div>

          </div>

        </div>

      </motion.section>

      {/* Statistics */}

      <section className="grid gap-6 md:grid-cols-3">

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-700 p-8 shadow-xl"
        >
          <h2 className="text-5xl font-bold">{stats.students}</h2>
          <p className="mt-3 text-lg">Registered Students</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 p-8 shadow-xl"
        >
          <h2 className="text-5xl font-bold">{stats.events}</h2>
          <p className="mt-3 text-lg">Published Events</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-3xl bg-gradient-to-br from-pink-600 to-red-600 p-8 shadow-xl"
        >
          <h2 className="text-5xl font-bold">{stats.registrations}</h2>
          <p className="mt-3 text-lg">Event Registrations</p>
        </motion.div>

      </section>

      {/* Features */}

      <section className="grid lg:grid-cols-3 gap-6">

        <div className="rounded-3xl bg-slate-900/70 border border-cyan-500/20 p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-cyan-400">
            Student Dashboard
          </h2>

          <p className="mt-4 text-slate-300 leading-7">
            Register for campus events, manage your profile,
            track registrations and receive notifications.
          </p>
        </div>

        <div className="rounded-3xl bg-slate-900/70 border border-purple-500/20 p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-purple-400">
            Admin Panel
          </h2>

          <p className="mt-4 text-slate-300 leading-7">
            Create events, approve registrations,
            publish announcements and monitor analytics.
          </p>
        </div>

        <div className="rounded-3xl bg-slate-900/70 border border-pink-500/20 p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-pink-400">
            Real-time Updates
          </h2>

          <p className="mt-4 text-slate-300 leading-7">
            Stay informed about approvals,
            announcements and upcoming activities.
          </p>
        </div>

      </section>

      {/* Events */}

      <section>

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-4xl font-bold">
            Explore Events
          </h2>

          <span className="text-slate-400">
            {events.length} Events Available
          </span>

        </div>

        {loading ? (

          <div className="text-center py-20">

            <div className="w-14 h-14 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>

            <p className="mt-6 text-slate-300">
              Loading Events...
            </p>

          </div>

        ) : events.length === 0 ? (

          <div className="rounded-3xl bg-slate-900 p-12 text-center">

            <h2 className="text-3xl font-bold">
              No Events Available
            </h2>

            <p className="mt-4 text-slate-400">
              Admin hasn't published any events yet.
            </p>

          </div>

        ) : (

          <div className="grid lg:grid-cols-2 gap-8">

            {events.map((event) => (

              <motion.div
                whileHover={{ y: -8 }}
                key={event._id}
                className="
                overflow-hidden
                rounded-3xl
                bg-slate-900/70
                border
                border-cyan-500/20
                shadow-2xl
                "
              >

                {event.banner && (

                  <img
                    src={`https://eventsync-oqg7.onrender.com${event.banner}`}
                    alt={event.title}
                    className="w-full h-64 object-cover"
                  />

                )}

                <div className="p-7">

                  <div className="flex justify-between items-start">

                    <h2 className="text-2xl font-bold">
                      {event.title}
                    </h2>

                    <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-300">
                      {event.category}
                    </span>

                  </div>

                  <p className="mt-4 text-slate-300 leading-7">
                    {event.description}
                  </p>

                  <div className="mt-6 space-y-2 text-slate-300">

                    <p>📅 {new Date(event.date).toLocaleDateString()}</p>

                    <p>⏰ {event.time}</p>

                    <p>📍 {event.venue}</p>

                    <p>👤 {event.organizer}</p>

                    <p>👥 Max Participants : {event.maxParticipants}</p>

                    <p>📞 {event.contact}</p>

                    <p>
                      Status :
                      <span className="ml-2 text-green-400 font-semibold">
                        {event.status}
                      </span>
                    </p>

                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">

                    {user ? (
                      <button
                        onClick={() => registerEvent(event._id)}
                        className="
                        rounded-full
                        bg-gradient-to-r
                        from-cyan-500
                        to-blue-600
                        px-6
                        py-3
                        font-semibold
                        shadow-lg
                        hover:scale-105
                        transition
                        "
                      >
                        Register Now
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate("/login")}
                        className="
                        rounded-full
                        bg-slate-700
                        px-6
                        py-3
                        font-semibold
                        hover:bg-slate-600
                        transition
                        "
                      >
                        Login to Register
                      </button>
                    )}

                    {user?.role === "admin" && (
                      <>
                        <button
                          onClick={() =>
                            navigate(`/edit-event/${event._id}`)
                          }
                          className="
                          rounded-full
                          bg-yellow-500
                          px-6
                          py-3
                          font-semibold
                          hover:bg-yellow-600
                          transition
                          "
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteEvent(event._id)}
                          className="
                          rounded-full
                          bg-red-600
                          px-6
                          py-3
                          font-semibold
                          hover:bg-red-700
                          transition
                          "
                        >
                          Delete
                        </button>
                      </>
                    )}

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        )}

      </section>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="
        rounded-3xl
        bg-gradient-to-r
        from-slate-950
        to-purple-950
        border
        border-purple-500/20
        p-10
        text-center
        "
      >
        <h2 className="text-3xl font-bold">
          EventSync
        </h2>

        <p className="mt-4 text-slate-400">
          A Modern College Event Management System
        </p>

        <p className="mt-2 text-slate-500">
          Developed using MERN Stack • React • Node.js • Express • MongoDB
        </p>

        <div className="mt-6 text-slate-500 text-sm">
          © {new Date().getFullYear()} EventSync. All Rights Reserved.
        </div>
      </motion.footer>

    </div>
  );
};

export default Home;