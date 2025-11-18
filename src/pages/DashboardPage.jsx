import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatCard from '../components/ui/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function DashboardPage() {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  // Mock data for demonstration
  const stats = [
    { title: 'Today\'s Appointments', value: '12', icon: '📅', color: 'amber' },
    { title: 'Weekly Revenue', value: '$2,450', icon: '💰', color: 'green' },
    { title: 'Total Clients', value: '142', icon: '👥', color: 'blue' },
    { title: 'Pending Bookings', value: '8', icon: '⏳', color: 'purple' }
  ];

  const recentAppointments = [
    { id: 1, client: 'Sarah Johnson', service: 'Haircut & Styling', stylist: 'Emma Wilson', time: '10:30 AM', status: 'Completed' },
    { id: 2, client: 'Michael Chen', service: 'Beard Trim', stylist: 'James Brown', time: '11:15 AM', status: 'In Progress' },
    { id: 3, client: 'Jessica Miller', service: 'Hair Coloring', stylist: 'Sophia Davis', time: '1:45 PM', status: 'Pending' },
    { id: 4, client: 'Robert Garcia', service: 'Hair Treatment', stylist: 'Emma Wilson', time: '3:30 PM', status: 'Confirmed' }
  ];

  // Mock chart data
  const appointmentsChartData = [
    { name: 'Mon', appointments: 12 },
    { name: 'Tue', appointments: 19 },
    { name: 'Wed', appointments: 15 },
    { name: 'Thu', appointments: 18 },
    { name: 'Fri', appointments: 22 },
    { name: 'Sat', appointments: 30 },
    { name: 'Sun', appointments: 14 }
  ];

  const revenueChartData = [
    { name: 'Services', value: 75 },
    { name: 'Products', value: 15 },
    { name: 'Tips', value: 10 }
  ];

  const COLORS = ['#F59E0B', '#10B981', '#8B5CF6'];

  useEffect(() => {
    // In a real app, this would fetch data from Firebase
    setAppointmentsData(appointmentsChartData);
    setRevenueData(revenueChartData);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-800 text-white rounded-lg font-medium hover:from-amber-700 hover:to-amber-900 transition-all duration-300">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          </motion.div>
        ))}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Appointments</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointmentsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }} 
                />
                <Bar dataKey="appointments" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Revenue chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Sources</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Appointments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stylist</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentAppointments.map((appointment) => (
                <motion.tr 
                  key={appointment.id}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  transition={{ duration: 0.2 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{appointment.client}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.stylist}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${appointment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        appointment.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                        appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-purple-100 text-purple-800'}`}>
                      {appointment.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}