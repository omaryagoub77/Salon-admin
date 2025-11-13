import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  Clock, 
  TrendingUp, 
  BarChart3,
  ChevronUp,
  MoreVertical
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data for metrics
  const metrics = [
    { title: 'Today\'s Appointments', value: '12', change: '+2', icon: Calendar, color: 'from-blue-500 to-blue-600' },
    { title: 'Weekly Revenue', value: '$2,450', change: '+12%', icon: DollarSign, color: 'from-green-500 to-green-600' },
    { title: 'Total Clients', value: '142', change: '+5', icon: Users, color: 'from-purple-500 to-purple-600' },
    { title: 'Pending Bookings', value: '8', change: '-1', icon: Clock, color: 'from-orange-500 to-orange-600' },
  ];

  // Mock data for charts
  const revenueData = [
    { name: 'Mon', revenue: 400 },
    { name: 'Tue', revenue: 650 },
    { name: 'Wed', revenue: 500 },
    { name: 'Thu', revenue: 780 },
    { name: 'Fri', revenue: 900 },
    { name: 'Sat', revenue: 1200 },
    { name: 'Sun', revenue: 850 },
  ];

  const appointmentData = [
    { name: 'Haircut', value: 45 },
    { name: 'Coloring', value: 30 },
    { name: 'Beard Trim', value: 15 },
    { name: 'Treatment', value: 10 },
  ];

  const COLORS = ['#D4AF37', '#F5F5DC', '#000000', '#8B4513'];

  const recentBookings = [
    { id: 1, client: 'John Smith', service: 'Premium Haircut', time: '10:30 AM', stylist: 'Michael' },
    { id: 2, client: 'Emma Johnson', service: 'Hair Coloring', time: '11:45 AM', stylist: 'Sarah' },
    { id: 3, client: 'Robert Davis', service: 'Beard Trim', time: '1:15 PM', stylist: 'James' },
    { id: 4, client: 'Sophia Wilson', service: 'Hair Treatment', time: '2:30 PM', stylist: 'Lisa' },
    { id: 5, client: 'David Brown', service: 'Haircut & Beard', time: '4:00 PM', stylist: 'Michael' },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-800"
        >
          Dashboard Overview
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 mt-2"
        >
          Welcome back! Here's what's happening today.
        </motion.p>
      </div>

      {/* Metrics Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{metric.title}</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{metric.value}</h3>
                  <div className="flex items-center mt-2">
                    <ChevronUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 text-sm font-medium">{metric.change}</span>
                    <span className="text-gray-500 text-sm ml-1">from yesterday</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center`}>
                  <Icon className="text-white w-6 h-6" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">Weekly Revenue</h2>
            <button className="text-gray-500 hover:text-gray-700">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px',
                    border: '1px solid #eee',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#D4AF37" 
                  strokeWidth={3}
                  dot={{ stroke: '#D4AF37', strokeWidth: 2, r: 4, fill: '#fff' }}
                  activeDot={{ r: 6, fill: '#D4AF37' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appointments Chart */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">Service Distribution</h2>
            <button className="text-gray-500 hover:text-gray-700">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={appointmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {appointmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px',
                    border: '1px solid #eee',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Recent Bookings */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">Recent Bookings</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-3 text-left text-gray-600 font-medium">Client</th>
                <th className="pb-3 text-left text-gray-600 font-medium">Service</th>
                <th className="pb-3 text-left text-gray-600 font-medium">Time</th>
                <th className="pb-3 text-left text-gray-600 font-medium">Stylist</th>
                <th className="pb-3 text-left text-gray-600 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking, index) => (
                <motion.tr 
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="py-4 text-gray-800 font-medium">{booking.client}</td>
                  <td className="py-4 text-gray-600">{booking.service}</td>
                  <td className="py-4 text-gray-600">{booking.time}</td>
                  <td className="py-4 text-gray-600">{booking.stylist}</td>
                  <td className="py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Confirmed
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;