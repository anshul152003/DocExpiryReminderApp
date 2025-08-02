// src/components/Navbar.jsx
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onUploadClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b px-6 py-3 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div
        className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition duration-200"
        onClick={() => navigate('/dashboard')}
      >
        <span className="px-3 py-1 border border-blue-500 rounded-lg font-mono italic">
          DocExpiry
        </span>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition"
        >
          📁 Docs
        </button>

        <button
          onClick={onUploadClick}
          className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          ⬆️ Upload
        </button>

        {/* Profile Dropdown */}
        <div className="relative group">
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-bold cursor-pointer hover:bg-blue-200 transition">
            {user?.name?.charAt(0).toUpperCase() || 'P'}
          </div>

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 hidden group-hover:block bg-white border border-gray-200 rounded-md shadow-lg z-20 min-w-[120px] animate-fade-in">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
