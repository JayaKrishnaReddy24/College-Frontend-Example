import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import React, { useEffect, useState } from 'react';

const LocationPage = () => {
  const [status, setStatus] = useState('Getting your location...');
  const [distance, setDistance] = useState(null);

  // Fixed SVCE coordinates
  const svceLocation = { lat: 13.6583, lon: 79.4860 };

  // Haversine formula — distance in meters
  const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus('❌ Geolocation is not supported by your browser.');
      return;
    }

    // Watch user's live position and compare with fixed SVCE coordinates
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const dist = getDistanceFromLatLonInMeters(
          svceLocation.lat,
          svceLocation.lon,
          latitude,
          longitude
        );
        setDistance(dist.toFixed(2));

        if (dist <= 100) {
          setStatus('✅ You are within 100 meters of SVCE.');
        } else {
          setStatus('❌ You moved more than 100 meters away from SVCE.');
        }
      },
      (error) => {
        setStatus('⚠️ Unable to track your current position.');
        console.error(error);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Location Tracker</h1>
        <p className="text-gray-600 mb-4">
          This page checks if you are within 100 meters of SVCE.
        </p>
        <p className="text-lg font-semibold">{status}</p>
        {distance && (
          <p className="text-gray-500 mt-2">Distance from SVCE: {distance} meters</p>
        )}
        <p className="text-gray-400 mt-2 text-sm">
          SVCE Location → Lat: {svceLocation.lat.toFixed(6)}, Lon: {svceLocation.lon.toFixed(6)}
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default LocationPage;
