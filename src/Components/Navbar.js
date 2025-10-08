import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Details from './Details';
import Sgroup from './Sgroup';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState({
    greeting: '',
    dayName: '',
    date: '',
    day: 0,
    month: ''
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to get greeting based on time
  const getGreeting = (hour) => {
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Function to get day name
  const getDayName = (dayIndex) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
  };

  // Function to get month name
  const getMonthName = (monthIndex) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hour = now.getHours();
      const dayIndex = now.getDay();
      const day = now.getDate();
      const monthIndex = now.getMonth();

      setCurrentDateTime({
        greeting: getGreeting(hour),
        dayName: getDayName(dayIndex),
        date: `${day} ${getMonthName(monthIndex)}`,
        day: day,
        month: getMonthName(monthIndex)
      });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Top Navigation Bar (Sticky) */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white shadow-sm">
        {/* Hamburger Menu */}
        <button className="p-2" onClick={toggleMenu}>
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex-1 flex justify-center">
          <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">LOGO</span>
          </div>
        </div>

        {/* Right Icon */}
        <button className="p-2">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Header Card */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          {/* Greeting Section */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Hi Raju Venkata Jaya Krishna Reddy,
              </h2>
              <p className="text-gray-600 text-sm">
                {currentDateTime.greeting}, {currentDateTime.dayName}, {currentDateTime.date}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end mb-1">
                <span className="text-2xl font-light text-gray-900">32°C</span>
              </div>
              <p className="text-xs text-gray-500">Partly Cloudy</p>
            </div>
          </div>

          {/* View Schedule Button */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mt-4">
            <span className="text-gray-900 font-medium">View Schedule</span>
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Service Group Component */}
      <Sgroup />

      {/* Sidebar Menu Component */}
      <Details isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default Navbar;
