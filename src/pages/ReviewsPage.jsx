import React, { useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import Button from '../components/ui/Button';
import { StarIcon, CheckCircleIcon, EyeSlashIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function ReviewsPage() {
  const { documents: reviews, updateDocument, deleteDocument, loading } = useFirestore('reviews');
  const [filter, setFilter] = useState('all');

  const handleApprove = async (reviewId) => {
    try {
      await updateDocument(reviewId, { approved: true, hidden: false });
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  const handleHide = async (reviewId) => {
    try {
      await updateDocument(reviewId, { hidden: true });
    } catch (error) {
      console.error('Error hiding review:', error);
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteDocument(reviewId);
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  const filteredReviews = reviews.filter(review => {
    if (filter === 'approved') return review.approved === true && !review.hidden;
    if (filter === 'pending') return !review.approved && !review.hidden;
    if (filter === 'hidden') return review.hidden === true;
    return true;
  });

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-4 w-4 ${i < rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
        <p className="mt-1 text-gray-600">Manage client reviews</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 text-xs rounded-full ${
            filter === 'all' 
              ? 'bg-amber-100 text-amber-800 font-medium' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          All Reviews
        </button>
        <button
          onClick={() => setFilter('approved')}
          className={`px-3 py-1.5 text-xs rounded-full ${
            filter === 'approved' 
              ? 'bg-green-100 text-green-800 font-medium' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          Approved
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
          onClick={() => setFilter('hidden')}
          className={`px-3 py-1.5 text-xs rounded-full ${
            filter === 'hidden' 
              ? 'bg-gray-100 text-gray-800 font-medium' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          Hidden
        </button>
      </div>

      {/* Reviews list */}
      {loading ? (
        <div className="flex justify-center items-center h-48 md:h-64">
          <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-amber-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredReviews.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No reviews found</p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div
                key={review.id}
                className={`bg-white rounded-xl shadow-sm border overflow-hidden ${
                  review.hidden ? 'border-gray-300' : 
                  review.approved ? 'border-green-200' : 'border-yellow-200'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">{review.clientName}</h3>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  
                  <p className="mt-4 text-xs text-gray-700">{review.comment}</p>
                  
                  <div className="mt-4 flex items-center">
                    <span className="text-xs text-gray-500">Service: {review.serviceName}</span>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-2">
                    {!review.approved && !review.hidden && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleApprove(review.id)}
                        icon={<CheckCircleIcon className="h-4 w-4" />}
                      >
                        Approve
                      </Button>
                    )}
                    
                    {!review.hidden && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleHide(review.id)}
                        icon={<EyeSlashIcon className="h-4 w-4" />}
                      >
                        Hide
                      </Button>
                    )}
                    
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(review.id)}
                      icon={<TrashIcon className="h-4 w-4" />}
                    >
                      Delete
                    </Button>
                  </div>
                  
                  {review.hidden && (
                    <div className="mt-4 p-2 bg-gray-100 rounded-lg">
                      <p className="text-xs text-gray-600">This review is hidden from public view</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}