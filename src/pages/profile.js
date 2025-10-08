import React, { useState, useRef, useEffect } from 'react';
import Details from '@/Components/Details';
import Footer from '@/Components/Footer';
import { Menu, Edit3, Save, ChevronDown } from 'lucide-react';

// --- Custom Dropdown Component (Remains the same as before) ---
const CustomDropdownField = ({ label, name, value, onChange, options }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } }); 
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="text-gray-700 font-medium text-sm block mb-1">{label}</label>
      
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="appearance-none w-full bg-white border border-blue-400 rounded-lg px-4 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition duration-150 ease-in-out hover:border-blue-500 flex justify-between items-center"
      >
        {value}
        <ChevronDown
          size={18}
          className={`text-blue-600 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-blue-400 rounded-lg shadow-xl max-h-48 overflow-y-auto">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className={`px-4 py-2 text-sm cursor-pointer transition duration-150 
                  ${option === value 
                    ? 'bg-blue-100 text-blue-700 font-semibold' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// --- Main Profile Page Component ---
const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Define the required prefix
  const PHONE_PREFIX = '+91 '; 

  const [profile, setProfile] = useState({
    name: 'RAJU VENKATA JAYA KRISHNA REDDY',
    id: '22BTA37100',
    department: 'CSE',
    year: 'III Year',
    email: 'raju37100@svce.ac.in',
    phone: PHONE_PREFIX + '9876543210' // Ensure initial state uses the prefix
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
        let newValue = value;

        // 1. Enforce numeric/prefix restriction
        // Clean non-numeric/non-plus/non-space characters
        newValue = newValue.replace(/[^\d+\s]/g, '');

        // 2. Enforce '+91 ' prefix
        if (!newValue.startsWith(PHONE_PREFIX)) {
            // If the user deletes the prefix, re-add it immediately
            // But only keep the numbers they've typed after the prefix
            const numbersOnly = newValue.replace(/[^\d]/g, '');
            newValue = PHONE_PREFIX + numbersOnly;
        }
        
        // Prevent the user from deleting the '+' sign if they manage to navigate before '91'
        if (newValue.length < PHONE_PREFIX.length) {
            newValue = PHONE_PREFIX;
        }

        setProfile({ ...profile, [name]: newValue });
    } else {
        setProfile({ ...profile, [name]: value });
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-blue-200 relative">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 shadow-md">
        <h1 className="text-white text-xl font-semibold">Profile</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="text-white hover:text-gray-200 focus:outline-none"
        >
          <Menu size={26} />
        </button>
      </header>

      {/* Sidebar */}
      <Details isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Profile Info */}
      <main className="flex-grow p-4 mt-2 sm:p-6 sm:mt-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm mx-auto text-center border-t-4 border-blue-600">
          <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold shadow-lg ring-4 ring-blue-300">
            Profile
          </div>

          {isEditing ? (
            <>
              {/* Name Input */}
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full text-center text-blue-900 text-lg font-bold border-b-2 border-blue-500 focus:border-blue-700 focus:outline-none mb-4 py-1"
              />
              <p className="text-blue-700 text-sm mb-4">ID: {profile.id}</p>

              <div className="text-left space-y-4">
                
                {/* Department Dropdown (CUSTOM) */}
                <CustomDropdownField
                  label="Department"
                  name="department"
                  value={profile.department}
                  onChange={handleChange}
                  options={["CSE", "ECE", "EEE", "Civil", "IT"]}
                />

                {/* Year Dropdown (CUSTOM) */}
                <CustomDropdownField
                  label="Year"
                  name="year"
                  value={profile.year}
                  onChange={handleChange}
                  options={["I Year", "II Year", "III Year", "IV Year"]}
                />

                {/* Email Input */}
                <div>
                  <label className="text-gray-700 font-medium text-sm block mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                  />
                </div>

                {/* Phone Input (Number Restricted & Prefix Enforced) */}
                <div>
                  <label className="text-gray-700 font-medium text-sm block mb-1">Phone</label>
                  <input
                    type="text" 
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    placeholder={PHONE_PREFIX + 'XXXXXXXXXX'} 
                    inputMode="tel" // Suggests numeric keyboard on mobile
                    minLength={PHONE_PREFIX.length + 10} // Minimum length for 10 digits + prefix
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                  />
                </div>
              </div>
            </>
          ) : (
            /* Read-Only View */
            <>
              <h2 className="text-2xl font-extrabold text-blue-900">{profile.name}</h2>
              <p className="text-blue-600 text-sm mt-1 mb-6">ID: {profile.id}</p>

              <div className="mt-6 text-left space-y-4 border-t pt-4">
                <p className="text-gray-700 text-base flex justify-between">
                  <strong className="text-blue-800">Department:</strong> <span>{profile.department}</span>
                </p>
                <p className="text-gray-700 text-base flex justify-between">
                  <strong className="text-blue-800">Year:</strong> <span>{profile.year}</span>
                </p>
                <p className="text-gray-700 text-base">
                  <strong className="text-blue-800 block mb-1">Email:</strong> {profile.email}
                </p>
                <p className="text-gray-700 text-base">
                  <strong className="text-blue-800 block mb-1">Phone:</strong> {profile.phone}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Edit / Save Button */}
        <div className="max-w-md mx-auto mt-8 flex justify-center">
          <button
            onClick={toggleEdit}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-900 transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 font-semibold text-lg"
          >
            {isEditing ? <Save size={20} /> : <Edit3 size={20} />}
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProfilePage;