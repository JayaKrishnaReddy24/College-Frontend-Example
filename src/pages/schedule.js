import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Sample data to mimic an API response for any date
const scheduleData = {
  '2025-09-22': [
    { id: 1, title: 'AIR POLLUTION AND QUALITY CONTROL', time: '9:15 AM - 10:15 AM' },
    { id: 2, title: 'MANAGEMENT SCIENCE', time: '10:15 AM - 11:15 AM' },
    { id: 3, title: 'INTRODUCTION TO IMAGE PROCESSING', time: '12:30 PM - 1:30 PM' },
    { id: 4, title: 'INTERNET OF THINGS', time: '2:20 PM - 3:20 PM' },
    { id: 5, title: 'BLOCK CHAIN TECHNOLOGY', time: '3:20 PM - 4:20 PM' },
  ],
};

// Helper function to format the date as YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Get weekday name
const getDayName = (date) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
};

// Get current week's dates (Monday to Friday)
const getWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday ...
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7)); // Go to Monday
  const week = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    week.push(date);
  }
  return week;
};

const SchedulePage = () => {
  const router = useRouter();
  const [activeDate, setActiveDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState(getWeekDates());

  useEffect(() => {
    setWeekDates(getWeekDates()); // Update week dynamically on page load
  }, []);

  const currentDaySchedule = scheduleData[formatDate(activeDate)] || [];

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="max-w-md mx-auto bg-white shadow-lg">
        {/* Header Section */}
        <header className="flex items-center justify-between bg-purple-700 text-white p-4">
          <span className="text-2xl cursor-pointer" onClick={handleGoBack}>
            ←
          </span>
          <h1 className="text-lg font-semibold">Schedule</h1>
          <div className="flex items-center text-sm">
            <span>{activeDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            <span className="ml-2">📅</span>
          </div>
        </header>

        {/* Date Bar */}
        <div className="flex justify-around bg-purple-800 text-white p-2">
          {weekDates.map((date) => (
            <div
              key={date.toISOString()}
              className={`text-center p-1 rounded-lg cursor-pointer ${
                formatDate(date) === formatDate(activeDate) ? 'bg-white text-purple-800 font-bold' : ''
              }`}
              onClick={() => setActiveDate(date)}
            >
              <div>{getDayName(date)}</div>
              <div>{date.getDate()}</div>
            </div>
          ))}
        </div>

        {/* Class List */}
        <div className="p-4 min-h-[300px]">
          {currentDaySchedule.length > 0 ? (
            currentDaySchedule.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-100 rounded-lg p-4 mb-2 shadow-md"
              >
                <div className="flex-grow">
                  <div className="font-bold text-base text-gray-800">{item.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{item.time}</div>
                </div>
                <div className="bg-blue-400 text-white px-3 py-1 text-xs font-semibold rounded-full transform rotate-90 relative right-[-10px]">
                  Class
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">No classes scheduled for this day.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SchedulePage;
