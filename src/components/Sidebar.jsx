import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Scissors, 
  Users, 
  Calendar, 
  MessageSquare, 
  Image, 
  ShoppingBag, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Services', icon: Scissors, path: '/services' },
    { name: 'Stylists', icon: Users, path: '/stylists' },
    { name: 'Appointments', icon: Calendar, path: '/appointments' },
    { name: 'Clients', icon: Users, path: '/clients' },
    { name: 'Reviews', icon: MessageSquare, path: '/reviews' },
    { name: 'Gallery', icon: Image, path: '/gallery' },
    { name: 'Shop', icon: ShoppingBag, path: '/shop' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 20 }}
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-200 flex flex-col lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-gold to-yellow-600 rounded-lg flex items-center justify-center">
              <Scissors className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Hair Salon</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
          <button 
            onClick={toggleSidebar}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <motion.a
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.path);
                    }}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-gold to-yellow-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.name}</span>
                  </motion.a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-30 p-2 rounded-lg bg-white shadow-md text-gray-700"
      >
        <Menu className="w-6 h-6" />
      </button>
    </>
  );
};

export default Sidebar;