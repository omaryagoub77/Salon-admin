import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  UserCheck,
  Clock
} from 'lucide-react';

const Stylists = () => {
  const [stylists, setStylists] = useState([
    {
      id: 1,
      name: 'Michael Johnson',
      role: 'Senior Stylist',
      specialty: 'Hair Coloring',
      workingHours: '9:00 AM - 6:00 PM',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      status: 'online'
    },
    {
      id: 2,
      name: 'Sarah Williams',
      role: 'Master Stylist',
      specialty: 'Haircuts & Styling',
      workingHours: '10:00 AM - 7:00 PM',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      status: 'online'
    },
    {
      id: 3,
      name: 'James Brown',
      role: 'Beard Specialist',
      specialty: 'Beard Trimming',
      workingHours: '8:00 AM - 5:00 PM',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      status: 'offline'
    },
    {
      id: 4,
      name: 'Lisa Davis',
      role: 'Color Specialist',
      specialty: 'Hair Coloring',
      workingHours: '11:00 AM - 8:00 PM',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      status: 'online'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStylist, setCurrentStylist] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStylists = stylists.filter(stylist => 
    stylist.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    stylist.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (stylist = null) => {
    setCurrentStylist(stylist);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStylist(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this stylist?')) {
      setStylists(stylists.filter(stylist => stylist.id !== id));
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
          Manage Stylists
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 mt-2"
        >
          Create, edit, and manage your salon stylists
        </motion.p>
      </div>

      {/* Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
      >
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search stylists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold w-full"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => openModal()}
          className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-gold to-yellow-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Stylist
        </motion.button>
      </motion.div>

      {/* Stylists Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredStylists.map((stylist, index) => (
          <motion.div
            key={stylist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          >
            <div className="relative">
              <div className="h-48 overflow-hidden">
                <img 
                  src={stylist.image} 
                  alt={stylist.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`absolute top-4 right-4 w-4 h-4 rounded-full ${stylist.status === 'online' ? 'bg-green-500' : 'bg-gray-400'} border-2 border-white`}></div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{stylist.name}</h3>
                  <p className="text-gold font-medium">{stylist.role}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-600">
                  <UserCheck className="w-4 h-4 mr-2" />
                  <span className="text-sm">{stylist.specialty}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{stylist.workingHours}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${stylist.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {stylist.status === 'online' ? 'Online' : 'Offline'}
                </span>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openModal(stylist)}
                    className="p-2 text-gray-600 hover:text-gold hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <Edit className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(stylist.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Stylist Modal */}
      {isModalOpen && (
        <StylistModal 
          stylist={currentStylist} 
          onClose={closeModal} 
          onSave={(stylist) => {
            if (stylist.id) {
              // Update existing stylist
              setStylists(stylists.map(s => s.id === stylist.id ? stylist : s));
            } else {
              // Add new stylist
              setStylists([...stylists, { ...stylist, id: Date.now(), status: 'offline' }]);
            }
            closeModal();
          }}
        />
      )}
    </div>
  );
};

const StylistModal = ({ stylist, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: stylist?.name || '',
    role: stylist?.role || '',
    specialty: stylist?.specialty || '',
    workingHours: stylist?.workingHours || '',
    image: stylist?.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
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
    onSave({ ...stylist, ...formData });
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
            {stylist ? 'Edit Stylist' : 'Add New Stylist'}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
              <input
                type="text"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours</label>
              <input
                type="text"
                name="workingHours"
                value={formData.workingHours}
                onChange={handleChange}
                required
                placeholder="e.g., 9:00 AM - 6:00 PM"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
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
              {stylist ? 'Update Stylist' : 'Add Stylist'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Stylists;