import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFirestore } from '../hooks/useFirestore';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

export default function ServicesPage() {
  const { documents: services, addDocument, updateDocument, deleteDocument, loading } = useFirestore('services');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: '',
    image: ''
  });

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name || '',
        description: service.description || '',
        price: service.price || '',
        duration: service.duration || '',
        category: service.category || '',
        image: service.image || ''
      });
    } else {
      setEditingService(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        duration: '',
        category: '',
        image: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingService) {
        await updateDocument(editingService.id, formData);
      } else {
        await addDocument(formData);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteDocument(id);
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="mt-1 text-gray-600">Manage your salon services</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            icon={<PlusIcon className="h-5 w-5" />}
            onClick={() => handleOpenModal()}
          >
            Add Service
          </Button>
        </div>
      </div>

      {/* Services grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              {service.image && (
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                    <p className="mt-1 text-sm text-gray-600">{service.category}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    ${service.price}
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-600 line-clamp-2">{service.description}</p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <span>{service.duration} mins</span>
                </div>
                <div className="mt-6 flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<EyeIcon className="h-4 w-4" />}
                    onClick={() => handleOpenModal(service)}
                  >
                    View
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<PencilIcon className="h-4 w-4" />}
                    onClick={() => handleOpenModal(service)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={<TrashIcon className="h-4 w-4" />}
                    onClick={() => handleDelete(service.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Service Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingService ? 'Edit Service' : 'Add Service'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Service Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                Duration (mins)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="secondary"
              onClick={handleCloseModal}
              type="button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
            >
              {editingService ? 'Update Service' : 'Add Service'}
            </Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}