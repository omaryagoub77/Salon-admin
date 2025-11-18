import React, { useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import Button from '../components/ui/Button';
import { CalendarIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function AppointmentsPage() {
  const { documents: appointments, updateDocument, loading } = useFirestore('appointments');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
          Confirmed
        </span>;
      case 'pending':
        return <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
          Pending
        </span>;
      case 'completed':
        return <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
          Completed
        </span>;
      case 'cancelled':
        return <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
          Cancelled
        </span>;
      default:
        return <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
          {status}
        </span>;
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await updateDocument(appointmentId, { status: newStatus });
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesFilter = filter === 'all' || appointment.status === filter;
    const matchesSearch = searchTerm === '' || 
      appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.stylistName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="mt-1 text-gray-600">Manage client appointments</p>
        </div>
        <div>
          <Button size="sm">
            <CalendarIcon className="h-5 w-5 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs rounded-full ${
              filter === 'all' 
                ? 'bg-amber-100 text-amber-800 font-medium' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 text-xs rounded-full ${
              filter === 'pending' 
                ? 'bg-yellow-100 text-yellow-800 font-medium' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-3 py-1.5 text-xs rounded-full ${
              filter === 'confirmed' 
                ? 'bg-green-100 text-green-800 font-medium' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Confirmed
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 text-xs rounded-full ${
              filter === 'completed' 
                ? 'bg-blue-100 text-blue-800 font-medium' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-3 py-1.5 text-xs rounded-full ${
              filter === 'cancelled' 
                ? 'bg-red-100 text-red-800 font-medium' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Cancelled
          </button>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Appointments table */}
      {loading ? (
        <div className="flex justify-center items-center h-48 md:h-64">
          <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-amber-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th scope="col" className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th scope="col" className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stylist</th>
                  <th scope="col" className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th scope="col" className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-3 md:px-6 md:py-4 text-center text-gray-500">
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <tr 
                      key={appointment.id}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{appointment.clientName}</div>
                        <div className="text-xs text-gray-500">{appointment.clientPhone}</div>
                      </td>
                      <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.serviceName}</div>
                      </td>
                      <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.stylistName}</div>
                      </td>
                      <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.date}</div>
                        <div className="text-xs text-gray-500">{appointment.time}</div>
                      </td>
                      <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                        {getStatusBadge(appointment.status)}
                      </td>
                      <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-wrap gap-2">
                          {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                            <>
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                                icon={<CheckCircleIcon className="h-4 w-4" />}
                              >
                                Confirm
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                                icon={<XCircleIcon className="h-4 w-4" />}
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                          {appointment.status === 'confirmed' && (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleStatusChange(appointment.id, 'completed')}
                              icon={<ClockIcon className="h-4 w-4" />}
                            >
                              Complete
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}