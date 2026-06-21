import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <header className="
sticky
top-0
z-50
bg-slate-900/50
backdrop-blur-xl
border-b
border-cyan-500/20
shadow-xl
">      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link
          to="/"
          className="text-2xl font-bold text-cyan-300 drop-shadow-lg"
        >
          🌌 EventSync
        </Link>

        <nav className="flex items-center gap-4 text-sm text-slate-600">
          <Link
            to="/"
            className="
rounded-full
bg-gradient-to-r
from-cyan-500
via-sky-500
to-blue-700
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
            Home
          </Link>

          {!token ? (
            <>
              <Link
                to="/login"
                className="
rounded-full
bg-gradient-to-r
from-cyan-500
via-sky-500
to-blue-700
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
                Login
              </Link>

              <Link
                to="/register"
                className="
rounded-full
bg-gradient-to-r
from-cyan-500
via-sky-500
to-blue-700
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
              </Link>
            </>
          ) : (
            <>
              <Link
                to={user?.role === 'admin' ? '/admin' : '/student'}
                className="
rounded-full
bg-gradient-to-r
from-emerald-500
to-green-700
px-5 py-2
text-white
font-semibold
shadow-lg
hover:scale-105
transition-all
duration-300
"
              >
                Dashboard
              </Link>

              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  window.location.href = '/';
                }}
className="
rounded-full
bg-gradient-to-r
from-red-500
to-rose-700
px-5 py-2
text-white
font-semibold
shadow-lg
hover:scale-105
transition-all
duration-300
"              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;