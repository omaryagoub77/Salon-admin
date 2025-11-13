import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import Stylists from './pages/Stylists';
import Clients from './pages/Clients';
import Reviews from './pages/Reviews';
import Gallery from './pages/Gallery';
import Shop from './pages/Shop';
import Settings from './pages/Settings';
import Appointments from './pages/Appointments';
import Sidebar from './components/Sidebar';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {currentUser ? (
          <>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="lg:ml-64">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/services" element={<Services />} />
                <Route path="/stylists" element={<Stylists />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;