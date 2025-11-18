import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFirestore, useFirestoreQuery } from '../hooks/useFirestore';
import Button from '../components/ui/Button';
import { UserIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function ClientsPage() {
  const { documents: clients, loading } = useFirestore('clients');
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get appointments for selected client
  const { documents: clientAppointments, loading: appointmentsLoading } = useFirestoreQuery(
    'appointments', 
    selectedClient ? 'clientId' : null, 
    selectedClient ? selectedClient.id : null
  );

  const filteredClients = clients.filter(client => {
    return searchTerm === '' || 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm);
  });

  const handleViewHistory = (client) => {
    setSelectedClient(client);
  };

  const handleCloseHistory = () => {
    setSelectedClient(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
        <p className="mt-1 text-gray-600">Manage your salon clients</p>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search clients by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
      </div>

      {/* Content */}
      {selectedClient ? (
        /* Client History View */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={handleCloseHistory}
                className="mr-4 text-gray-500 hover:text-gray-700"
              >
                ← Back to clients
              </button>
              <h2 className="text-xl font-semibold text-gray-900">
                Booking History for {selectedClient.name}
              </h2>
            </div>
          </div>
          
          {appointmentsLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stylist</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clientAppointments.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                        No booking history found
                      </td>
                    </tr>
                  ) : (
                    clientAppointments.map((appointment) => (
                      <tr key={appointment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{appointment.serviceName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{appointment.stylistName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{appointment.date}</div>
                          <div className="text-sm text-gray-500">{appointment.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${appointment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              appointment.status === 'confirmed' ? 'bg-blue-100 text-blue-800' : 
                              appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'}`}>
                            {appointment.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      ) : (
        /* Clients List View */
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredClients.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                        No clients found
                      </td>
                    </tr>
                  ) : (
                    filteredClients.map((client) => (
                      <motion.tr 
                        key={client.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full flex items-center justify-center">
                              <UserIcon className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{client.name}</div>
                              <div className="text-sm text-gray-500">Client since {client.createdAt?.toDate().toLocaleDateString()}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-900">
                            <EnvelopeIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {client.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-900 mt-1">
                            <PhoneIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {client.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {client.notes || 'No notes'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button
                            onClick={() => handleViewHistory(client)}
                          >
                            View History
                          </Button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}