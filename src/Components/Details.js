import React from 'react';

const Details = ({ isOpen, onClose }) => {
  const MenuItem = ({ children, onClick }) => (
    <button
      className="w-full text-left text-white text-lg font-medium py-3 px-2 hover:bg-blue-700 rounded-lg transition-all duration-200"
      onClick={onClick}
    >
      {children}
    </button>
  );

  return (
    <>
      {/* Dimmed transparent overlay (click to close) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar menu */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-blue-600 to-blue-800 shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="p-6 pt-16">
          <h2 className="text-white text-2xl font-semibold mb-8">Menu</h2>

          {/* Profile Section */}
          <div className="flex items-center mb-8">
            <div className="w-20 h-20 rounded-2xl overflow-hidden mr-4 bg-blue-400 flex items-center justify-center">
              <span className="text-gray-100 text-sm font-semibold">Profile</span>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold leading-tight">
                RAJU VENKATA JAYA<br />KRISHNA REDDY
              </h3>
              <p className="text-blue-200 text-sm mt-1">ID : 22BTA37100</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-6 space-y-1">
          <MenuItem>About SVCE Tirupati</MenuItem>
          <MenuItem>Active Devices</MenuItem>
          <MenuItem>Share SVCE Student</MenuItem>
          <MenuItem>Reset Password</MenuItem>
          <MenuItem>Help desk</MenuItem>
          <MenuItem>Contact us</MenuItem>
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-8 left-6 right-6">
          <button
            className="w-full text-left text-white text-lg font-medium py-3 px-2 hover:bg-blue-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onClose}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Details;
