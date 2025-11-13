import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Search, 
  Filter,
  Image as ImageIcon,
  X,
  Upload
} from 'lucide-react';

const Gallery = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1560066984-138dadb4c450?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      category: 'Haircuts',
      title: 'Modern Fade'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1560066984-138dadb4c450?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      category: 'Coloring',
      title: 'Balayage Highlights'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1560066984-138dadb4c450?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      category: 'Beard',
      title: 'Classic Beard Trim'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1560066984-138dadb4c450?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      category: 'Haircuts',
      title: 'Textured Crop'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1560066984-138dadb4c450?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      category: 'Treatment',
      title: 'Deep Conditioning'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1560066984-138dadb4c450?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      category: 'Coloring',
      title: 'Root Touch-Up'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [newImage, setNewImage] = useState({ url: '', category: 'Haircuts', title: '' });

  const categories = ['All', 'Haircuts', 'Coloring', 'Beard', 'Treatment'];

  const filteredImages = images.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          image.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || image.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const openUploadModal = () => {
    setIsModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsModalOpen(false);
    setNewImage({ url: '', category: 'Haircuts', title: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setImages(images.filter(image => image.id !== id));
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (newImage.url && newImage.title) {
      setImages([...images, { ...newImage, id: Date.now() }]);
      closeUploadModal();
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
          Gallery Management
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 mt-2"
        >
          Upload and manage your salon gallery images
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
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold w-full md:w-64"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold appearance-none bg-white w-full"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={openUploadModal}
          className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-gold to-yellow-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <Upload className="w-5 h-5 mr-2" />
          Upload Image
        </motion.button>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {filteredImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          >
            <div 
              className="h-48 overflow-hidden cursor-pointer"
              onClick={() => openImageModal(image)}
            >
              <img 
                src={image.url} 
                alt={image.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-800">{image.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{image.category}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(image.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
          onClick={closeImageModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.title} 
              className="w-full h-auto rounded-lg"
            />
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold text-white">{selectedImage.title}</h3>
              <p className="text-gray-300 mt-2">{selectedImage.category}</p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Upload Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={closeUploadModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Upload New Image</h2>
              <button 
                onClick={closeUploadModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image Title</label>
                  <input
                    type="text"
                    value={newImage.title}
                    onChange={(e) => setNewImage({...newImage, title: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={newImage.url}
                    onChange={(e) => setNewImage({...newImage, url: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newImage.category}
                    onChange={(e) => setNewImage({...newImage, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  >
                    <option value="Haircuts">Haircuts</option>
                    <option value="Coloring">Coloring</option>
                    <option value="Beard">Beard</option>
                    <option value="Treatment">Treatment</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto" />
                    <p className="mt-2 text-sm text-gray-600">Paste image URL above</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-8">
                <button
                  type="button"
                  onClick={closeUploadModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-gold to-yellow-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Upload Image
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;