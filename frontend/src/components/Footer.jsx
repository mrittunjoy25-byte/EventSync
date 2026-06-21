
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold">EventSync.in</h2>

            <p className="mt-4 text-slate-300 leading-relaxed">
              A smart college event management platform that simplifies
              event registration, participation tracking, notifications,
              and administrative operations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>

            <ul className="mt-4 space-y-2 text-slate-300">
              <li>
                <Link to="/" className="hover:text-sky-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/login" className="hover:text-sky-400 transition">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register" className="hover:text-sky-400 transition">
                  Register
                </Link>
              </li>

              <li>
                <a href="#" className="hover:text-sky-400 transition">
                  Events
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Project Info */}
          <div>
            <h3 className="text-lg font-semibold">Contact & Project Info</h3>

            <div className="mt-4 space-y-3 text-slate-300">
              <p>📧 admin@eventsync.in</p>
              <p>📞 +91 9064083159 </p>
              <p>🎓 MCA Academic Project</p>
              <p>👨‍💻 Developed by Mrittunjoy Saha</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-slate-700 pt-6 text-center text-sm text-slate-400">
          © 2026 EventSync.in • College Event Management System • All Rights Reserved
        </div>

      </div>
    </footer>
  );
};

export default Footer;

