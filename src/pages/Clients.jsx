import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';

const Clients = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      bookings: 12,
      notes: 'Prefers morning appointments',
      lastVisit: '2023-10-15'
    },
    {
      id: 2,
      name: 'Emma Johnson',
      email: 'emma.johnson@email.com',
      phone: '(555) 987-6543',
      bookings: 8,
      notes: 'Allergic to certain hair products',
      lastVisit: '2023-10-18'
    },
    {
      id: 3,
      name: 'Robert Davis',
      email: 'robert.davis@email.com',
      phone: '(555) 456-7890',
      bookings: 15,
      notes: 'Regular client, prefers Michael',
      lastVisit: '2023-10-20'
    },
    {
      id: 4,
      name: 'Sophia Wilson',
      email: 'sophia.wilson@email.com',
      phone: '(555) 234-5678',
      bookings: 5,
      notes: 'First-time client',
      lastVisit: '2023-10-22'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@email.com',
      phone: '(555) 876-5432',
      bookings: 22,
      notes: 'VIP client, flexible with pricing',
      lastVisit: '2023-10-25'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('All');

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.phone.includes(searchTerm);
    return matchesSearch;
  });

  const openModal = (client = null) => {
    setCurrentClient(client);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentClient(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(client => client.id !== id));
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
          Client Management
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 mt-2"
        >
          Manage your salon clients and their information
        </motion.p>
      </div>

      {/* Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold w-full md:w-64"
            />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => openModal()}
          className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-gold to-yellow-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Client
        </motion.button>
      </motion.div>

      {/* Clients Table */}
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
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Contact</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Bookings</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Last Visit</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Notes</th>
                <th className="py-4 px-6 text-right text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClients.map((client, index) => (
                <motion.tr
                  key={client.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                >
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-800">{client.name}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        {client.email}
                      </div>
                      <div className="flex items-center mt-1">
                        <Phone className="w-4 h-4 mr-2" />
                        {client.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-gold bg-opacity-10 text-gold rounded-full text-sm font-medium">
                      {client.bookings} bookings
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {client.lastVisit}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600 max-w-xs">
                    {client.notes}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => openModal(client)}
                        className="p-2 text-gray-600 hover:text-gold hover:bg-gray-100 rounded-lg transition-all"
                      >
                        <Edit className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(client.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Client Modal */}
      {isModalOpen && (
        <ClientModal 
          client={currentClient} 
          onClose={closeModal} 
          onSave={(client) => {
            if (client.id) {
              // Update existing client
              setClients(clients.map(c => c.id === client.id ? client : c));
            } else {
              // Add new client
              setClients([...clients, { ...client, id: Date.now(), bookings: 0, lastVisit: new Date().toISOString().split('T')[0] }]);
            }
            closeModal();
          }}
        />
      )}
    </div>
  );
};

const ClientModal = ({ client, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: client?.name || '',
    email: client?.email || '',
    phone: client?.phone || '',
    notes: client?.notes || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...client, ...formData });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            {client ? 'Edit Client' : 'Add New Client'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-gold to-yellow-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              {client ? 'Update Client' : 'Add Client'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Clients;