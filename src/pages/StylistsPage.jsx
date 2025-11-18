import React, { useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { PlusIcon, PencilIcon, TrashIcon, UserIcon } from '@heroicons/react/24/outline';

export default function StylistsPage() {
  const { documents: stylists, addDocument, updateDocument, deleteDocument, loading } = useFirestore('stylists');
  const { documents: services } = useFirestore('services');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStylist, setEditingStylist] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    specialty: '',
    workingHours: '',
    image: '',
    services: []
  });

  const handleOpenModal = (stylist = null) => {
    if (stylist) {
      setEditingStylist(stylist);
      setFormData({
        name: stylist.name || '',
        role: stylist.role || '',
        specialty: stylist.specialty || '',
        workingHours: stylist.workingHours || '',
        image: stylist.image || '',
        services: stylist.services || []
      });
    } else {
      setEditingStylist(null);
      setFormData({
        name: '',
        role: '',
        specialty: '',
        workingHours: '',
        image: '',
        services: []
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStylist(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleServiceToggle = (serviceId) => {
    setFormData(prev => {
      const services = [...prev.services];
      const index = services.indexOf(serviceId);
      
      if (index >= 0) {
        services.splice(index, 1);
      } else {
        services.push(serviceId);
      }
      
      return { ...prev, services };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingStylist) {
        await updateDocument(editingStylist.id, formData);
      } else {
        await addDocument(formData);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving stylist:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this stylist?')) {
      try {
        await deleteDocument(id);
      } catch (error) {
        console.error('Error deleting stylist:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stylists</h1>
          <p className="mt-1 text-gray-600">Manage your salon stylists</p>
        </div>
        <div>
          <Button
            icon={<PlusIcon className="h-5 w-5" />}
            onClick={() => handleOpenModal()}
            size="sm"
          >
            Add Stylist
          </Button>
        </div>
      </div>

      {/* Stylists grid */}
      {loading ? (
        <div className="flex justify-center items-center h-48 md:h-64">
          <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-amber-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {stylists.map((stylist) => (
            <div
              key={stylist.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-4 md:p-6">
                <div className="flex items-center">
                  {stylist.image ? (
                    <img 
                      src={stylist.image} 
                      alt={stylist.name} 
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                      <UserIcon className="h-6 w-6 md:h-8 md:w-8 text-gray-400" />
                    </div>
                  )}
                  <div className="ml-3 md:ml-4">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">{stylist.name}</h3>
                    <p className="text-xs md:text-sm text-gray-600">{stylist.role}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-xs md:text-sm text-gray-600"><span className="font-medium">Specialty:</span> {stylist.specialty}</p>
                  <p className="mt-1 text-xs md:text-sm text-gray-600"><span className="font-medium">Working Hours:</span> {stylist.workingHours}</p>
                  
                  {stylist.services && stylist.services.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs md:text-sm font-medium text-gray-900">Services:</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {stylist.services.slice(0, 3).map((serviceId) => {
                          const service = services.find(s => s.id === serviceId);
                          return service ? (
                            <span key={serviceId} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              {service.name}
                            </span>
                          ) : null;
                        })}
                        {stylist.services.length > 3 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            +{stylist.services.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<PencilIcon className="h-4 w-4" />}
                    onClick={() => handleOpenModal(stylist)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={<TrashIcon className="h-4 w-4" />}
                    onClick={() => handleDelete(stylist.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Stylist Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingStylist ? 'Edit Stylist' : 'Add Stylist'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
              Specialty
            </label>
            <input
              type="text"
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label htmlFor="workingHours" className="block text-sm font-medium text-gray-700 mb-1">
              Working Hours
            </label>
            <input
              type="text"
              id="workingHours"
              name="workingHours"
              value={formData.workingHours}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              placeholder="e.g., Mon-Fri 9AM-6PM"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Services
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border border-gray-300 rounded-lg">
              {services.map((service) => (
                <div key={service.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`service-${service.id}`}
                    checked={formData.services.includes(service.id)}
                    onChange={() => handleServiceToggle(service.id)}
                    className="h-4 w-4 text-amber-600 rounded focus:ring-amber-500"
                  />
                  <label htmlFor={`service-${service.id}`} className="ml-2 text-sm text-gray-700">
                    {service.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="secondary"
              onClick={handleCloseModal}
              type="button"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
            >
              {editingStylist ? 'Update Stylist' : 'Add Stylist'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}