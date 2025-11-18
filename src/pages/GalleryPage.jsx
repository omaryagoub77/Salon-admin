import React, { useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

export default function GalleryPage() {
  const { documents: galleryItems, addDocument, updateDocument, deleteDocument, loading } = useFirestore('gallery');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);
  const [formData, setFormData] = useState({
    image: '',
    category: '',
    title: ''
  });

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        image: item.image || '',
        category: item.category || '',
        title: item.title || ''
      });
    } else {
      setEditingItem(null);
      setFormData({
        image: '',
        category: '',
        title: ''
      });
    }
    setIsModalOpen(true);
  };

  const handlePreview = (item) => {
    setPreviewItem(item);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleClosePreview = () => {
    setPreviewItem(null);
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
      if (editingItem) {
        await updateDocument(editingItem.id, formData);
      } else {
        await addDocument(formData);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving gallery item:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      try {
        await deleteDocument(id);
      } catch (error) {
        console.error('Error deleting gallery item:', error);
      }
    }
  };

  // Group items by category
  const groupedItems = galleryItems.reduce((acc, item) => {
    const category = item.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
          <p className="mt-1 text-gray-600">Manage your salon gallery</p>
        </div>
        <div>
          <Button
            icon={<PlusIcon className="h-5 w-5" />}
            onClick={() => handleOpenModal()}
            size="sm"
          >
            Add Image
          </Button>
        </div>
      </div>

      {/* Gallery items */}
      {loading ? (
        <div className="flex justify-center items-center h-48 md:h-64">
          <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-amber-600"></div>
        </div>
      ) : Object.keys(groupedItems).length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No gallery items found</p>
          <Button
            className="mt-4"
            onClick={() => handleOpenModal()}
            size="sm"
          >
            Add your first image
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="aspect-square bg-gray-200 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => handlePreview(item)}
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-900 truncate text-sm">{item.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={<PencilIcon className="h-4 w-4" />}
                          onClick={() => handleOpenModal(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          icon={<TrashIcon className="h-4 w-4" />}
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Gallery Item Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? 'Edit Gallery Item' : 'Add Gallery Item'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              placeholder="e.g., Haircuts, Coloring, Treatments"
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
              required
            />
          </div>

          {formData.image && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preview
              </label>
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
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
              {editingItem ? 'Update Item' : 'Add Item'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Image Preview Modal */}
      <Modal
        isOpen={!!previewItem}
        onClose={handleClosePreview}
        title={previewItem?.title || 'Gallery Image'}
        size="lg"
      >
        {previewItem && (
          <div className="space-y-4">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src={previewItem.image} 
                alt={previewItem.title} 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600">Category: {previewItem.category || 'Uncategorized'}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}