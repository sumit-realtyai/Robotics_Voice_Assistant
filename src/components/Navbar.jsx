import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMicrophoneAlt } from 'react-icons/fa';
import { MdDashboard, MdMonitor } from 'react-icons/md';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <FaMicrophoneAlt className="text-2xl text-blue-600" />
              <span className="text-xl font-bold text-gray-800">Talkypies</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <MdDashboard className="text-xl" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/sessions"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <MdMonitor className="text-xl" />
              <span>Monitor Sessions</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;