import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ title, value, icon, color = 'amber' }) {
  const colorClasses = {
    amber: 'bg-amber-100 text-amber-800',
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    red: 'bg-red-100 text-red-800'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
    >
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <span className="text-xl">{icon}</span>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <motion.p 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-2xl font-bold text-gray-900"
          >
            {value}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}