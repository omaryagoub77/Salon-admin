import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Package,
  DollarSign,
  Tag
} from 'lucide-react';

const Shop = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Premium Hair Gel',
      description: 'Strong hold hair gel for all hair types',
      price: 18.99,
      stock: 25,
      category: 'Styling',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c450?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 2,
      name: 'Moisturizing Shampoo',
      description: 'Gentle cleansing for dry and damaged hair',
      price: 24.99,
      stock: 15,
      category: 'Hair Care',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c450?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 3,
      name: 'Beard Oil',
      description: 'Nourishing oil for soft and healthy beard',
      price: 22.50,
      stock: 30,
      category: 'Beard Care',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c450?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 4,
      name: 'Hair Serum',
      description: 'Repairing serum for frizzy and damaged hair',
      price: 29.99,
      stock: 12,
      category: 'Treatment',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c450?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Styling', 'Hair Care', 'Beard Care', 'Treatment'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const openModal = (product = null) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const updateStock = (id, newStock) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, stock: newStock } : product
    ));
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-800"
        >
          Shop Management
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 mt-2"
        >
          Manage your salon products and inventory
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
              placeholder="Search products..."
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
          onClick={() => openModal()}
          className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-gold to-yellow-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </motion.button>
      </motion.div>

      {/* Products Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                </div>
                <span className="px-2 py-1 bg-gold text-white text-xs font-medium rounded-full">
                  {product.category}
                </span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-lg font-bold text-gray-800">${product.price.toFixed(2)}</p>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Package className="w-4 h-4 mr-1" />
                    <span>Stock: {product.stock}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openModal(product)}
                    className="p-2 text-gray-600 hover:text-gold hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <Edit className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(product.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <button 
                    onClick={() => updateStock(product.id, Math.max(0, product.stock - 1))}
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded-l-lg"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={product.stock}
                    onChange={(e) => updateStock(product.id, parseInt(e.target.value) || 0)}
                    className="w-16 h-8 text-center border-y border-gray-300"
                  />
                  <button 
                    onClick={() => updateStock(product.id, product.stock + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded-r-lg"
                  >
                    +
                  </button>
                  <span className="ml-2 text-sm text-gray-600">Update stock</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Product Modal */}
      {isModalOpen && (
        <ProductModal 
          product={currentProduct} 
          onClose={closeModal} 
          onSave={(product) => {
            if (product.id) {
              // Update existing product
              setProducts(products.map(p => p.id === product.id ? product : p));
            } else {
              // Add new product
              setProducts([...products, { ...product, id: Date.now() }]);
            }
            closeModal();
          }}
        />
      )}
    </div>
  );
};

const ProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    stock: product?.stock || '',
    category: product?.category || 'Styling',
    image: product?.image || 'https://images.unsplash.com/photo-1560066984-138dadb4c450?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
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
    onSave({ ...product, ...formData });
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
            {product ? 'Edit Product' : 'Add New Product'}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
              >
                <option value="Styling">Styling</option>
                <option value="Hair Care">Hair Care</option>
                <option value="Beard Care">Beard Care</option>
                <option value="Treatment">Treatment</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
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
              {product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Shop;