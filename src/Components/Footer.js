import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Footer = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(router.pathname);

  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
    },
    {
      id: 'schedule',
      label: 'Schedule',
      path: '/schedule',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
          <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
          <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
          <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: 'library',
      label: 'Library',
      path: '/library',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: 'location',
      label: 'Location',
      path: '/location',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth="2" />
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: 'profile',
      label: 'Profile',
      path: '/profile',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  const handleTabClick = (path) => {
    router.push(path);
    if (navigator.vibrate) navigator.vibrate(50);
  };

  return (
    <footer 
      className="fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl z-50"
      role="tablist"
    >
      <div className="flex justify-around items-center py-3 px-2 max-w-md mx-auto">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.path)}
            className={`
              relative flex flex-col items-center justify-center p-3 rounded-xl min-w-0 flex-1
              transition-all duration-300 ease-in-out transform active:scale-95
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${activeTab === item.path 
                ? 'text-blue-600 bg-blue-50 scale-110 -translate-y-1 shadow-lg' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:scale-105'
              }
            `}
            aria-label={item.label}
            role="tab"
            aria-selected={activeTab === item.path}
          >
            <div className={`
              relative z-10 mb-1 transition-all duration-300
              ${activeTab === item.path ? 'rotate-3 scale-110' : 'rotate-0 scale-100'}
            `}>
              {item.icon}
            </div>

            <span className={`
              relative z-10 text-xs font-medium transition-all duration-300
              ${activeTab === item.path 
                ? 'opacity-100 translate-y-0 font-semibold' 
                : 'opacity-70 translate-y-1'
              }
            `}>
              {item.label}
            </span>

            {activeTab === item.path && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full animate-pulse z-20"></div>
            )}
            <div className={`
              absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-blue-600 rounded-t-full
              transition-all duration-300 ease-out
              ${activeTab === item.path ? 'w-8 opacity-100' : 'w-0 opacity-0'}
            `}></div>
          </button>
        ))}
      </div>
    </footer>
  );
};

export default Footer;