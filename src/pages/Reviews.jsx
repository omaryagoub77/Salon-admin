import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Eye, 
  EyeOff, 
  Search, 
  Filter,
  User
} from 'lucide-react';

const Reviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'John Smith',
      rating: 5,
      message: 'Amazing service! Michael did a fantastic job with my haircut. Will definitely be coming back.',
      date: '2023-10-15',
      approved: true
    },
    {
      id: 2,
      name: 'Emma Johnson',
      rating: 4,
      message: 'Great experience overall. The salon is clean and the staff is friendly. My color looks beautiful!',
      date: '2023-10-18',
      approved: true
    },
    {
      id: 3,
      name: 'Robert Davis',
      rating: 5,
      message: 'Best beard trim I\'ve ever had! James is a true professional. Highly recommend this salon.',
      date: '2023-10-20',
      approved: false
    },
    {
      id: 4,
      name: 'Sophia Wilson',
      rating: 3,
      message: 'Service was okay, but I had to wait longer than expected. The haircut is decent though.',
      date: '2023-10-22',
      approved: true
    },
    {
      id: 5,
      name: 'David Brown',
      rating: 5,
      message: 'Exceptional service as always! Lisa is the best colorist in town. My hair has never looked better.',
      date: '2023-10-25',
      approved: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('All');

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          review.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterOption === 'All' || 
                         (filterOption === 'Approved' && review.approved) || 
                         (filterOption === 'Pending' && !review.approved);
    return matchesSearch && matchesFilter;
  });

  const toggleApproval = (id) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, approved: !review.approved } : review
    ));
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-800"
        >
          Reviews & Testimonials
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 mt-2"
        >
          Manage client reviews and testimonials
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
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold w-full md:w-64"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold appearance-none bg-white w-full"
            >
              <option value="All">All Reviews</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Reviews Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gold bg-opacity-10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gold" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-bold text-gray-800">{review.name}</h3>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${review.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {review.approved ? 'Approved' : 'Pending'}
                </span>
              </div>
              
              <div className="mt-4">
                {renderStars(review.rating)}
              </div>
              
              <p className="mt-4 text-gray-600">
                "{review.message}"
              </p>
              
              <div className="mt-6 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleApproval(review.id)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                    review.approved 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {review.approved ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Approve
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Reviews;