import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: '📊' },
    { name: 'Services', href: '/services', icon: '✂️' },
    { name: 'Stylists', href: '/stylists', icon: '👩‍🦱' },
    { name: 'Appointments', href: '/appointments', icon: '📅' },
    { name: 'Clients', href: '/clients', icon: '👥' },
    { name: 'Reviews', href: '/reviews', icon: '⭐' },
    { name: 'Gallery', href: '/gallery', icon: '🖼️' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:shadow-none"
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-amber-600 to-amber-800 text-white">
            <div className="flex items-center space-x-2">
              <div className="bg-white text-amber-800 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                H
              </div>
              <span className="text-lg sm:text-xl font-bold">Hair Salon</span>
            </div>
            <button
              className="lg:hidden text-white"
              onClick={() => setSidebarOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || 
                  (item.href !== '/' && location.pathname.startsWith(item.href));
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-amber-100 text-amber-800 shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="mr-2 sm:mr-3 text-base sm:text-lg">{item.icon}</span>
                      <span className="truncate">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <span className="mr-2 sm:mr-3 text-base sm:text-lg">🚪</span>
              <span className="truncate">Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}