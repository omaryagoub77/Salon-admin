import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter,
  Calendar,
  Clock,
  User,
  Scissors,
  CheckCircle,
  XCircle,
  Edit3
} from 'lucide-react';

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      client: 'John Smith',
      service: 'Premium Haircut',
      stylist: 'Michael Johnson',
      date: '2023-10-26',
      time: '10:30 AM',
      status: 'Confirmed'
    },
    {
      id: 2,
      client: 'Emma Johnson',
      service: 'Hair Coloring',
      stylist: 'Sarah Williams',
      date: '2023-10-26',
      time: '11:45 AM',
      status: 'Pending'
    },
    {
      id: 3,
      client: 'Robert Davis',
      service: 'Beard Trim',
      stylist: 'James Brown',
      date: '2023-10-26',
      time: '1:15 PM',
      status: 'Cancelled'
    },
    {
      id: 4,
      client: 'Sophia Wilson',
      service: 'Hair Treatment',
      stylist: 'Lisa Davis',
      date: '2023-10-26',
      time: '2:30 PM',
      status: 'Confirmed'
    },
    {
      id: 5,
      client: 'David Brown',
      service: 'Haircut & Beard',
      stylist: 'Michael Johnson',
      date: '2023-10-26',
      time: '4:00 PM',
      status: 'Completed'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterStylist, setFilterStylist] = useState('All');

  const stylists = ['All', 'Michael Johnson', 'Sarah Williams', 'James Brown', 'Lisa Davis'];
  const statuses = ['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'];

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.client.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          appointment.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || appointment.status === filterStatus;
    const matchesStylist = filterStylist === 'All' || appointment.stylist === filterStylist;
    return matchesSearch && matchesStatus && matchesStylist;
  });

  const updateStatus = (id, newStatus) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status: newStatus } : appointment
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-800"
        >
          Manage Appointments
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 mt-2"
        >
          View and manage all salon appointments
        </motion.p>
      </div>

      {/* Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row md:items-center gap-4 mb-6"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold w-full"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold appearance-none bg-white w-full md:w-40"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filterStylist}
            onChange={(e) => setFilterStylist(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold appearance-none bg-white w-full md:w-40"
          >
            {stylists.map(stylist => (
              <option key={stylist} value={stylist}>{stylist}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Appointments Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Client</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Service</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Stylist</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Date & Time</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="py-4 px-6 text-right text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map((appointment, index) => (
                <motion.tr
                  key={appointment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gold bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{appointment.client}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <Scissors className="w-4 h-4 text-gray-500 mr-2" />
                      <div>
                        <div className="font-medium text-gray-800">{appointment.service}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-800">{appointment.stylist}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Clock className="w-4 h-4 mr-2" />
                      {appointment.time}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end space-x-2">
                      {appointment.status === 'Pending' && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateStatus(appointment.id, 'Confirmed')}
                            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-all"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateStatus(appointment.id, 'Cancelled')}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <XCircle className="w-5 h-5" />
                          </motion.button>
                        </>
                      )}
                      {appointment.status === 'Confirmed' && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateStatus(appointment.id, 'Completed')}
                          className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-all"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </motion.button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-600 hover:text-gold hover:bg-gray-100 rounded-lg transition-all"
                      >
                        <Edit3 className="w-5 h-5" />
                      </motion.button>
                    </div>
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

export default Appointments;